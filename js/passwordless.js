import authenticatorMetadata from "./authenticatorMetadata.json" assert { type: "json" }

console.debug(authenticatorMetadata)
/**
 * Returns whether passwordless authentication is available on this browser/platform or not.
 */
export function isAvailable() {
    return !!window.PublicKeyCredential
}

/**
 * Returns whether the device itself can be used as authenticator.
 */
export async function isLocal() {
    return await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable()
}


/********************************
     Encoding/Decoding Utils
********************************/
function randomString() {
    return "fake-id-" + Math.random().toString(36).substr(2)
}

function toBuffer(txt) {
    return Uint8Array.from(txt, c => c.charCodeAt(0)).buffer
}

function parseBuffer(buffer) {
    return String.fromCharCode(...new Uint8Array(buffer))
}

function toBase64(buffer) {
    return btoa(parseBuffer(buffer))
}

function parseBase64(txt) {
    return toBuffer(atob(txt))
}

function parseBase64url(txt) {
    return parseBase64(txt.replaceAll('-', '+').replaceAll('_', '/'))
}

async function sha256(buffer) {
    return window.crypto.subtle.digest('SHA-256', buffer)
}

function bufferToHex (buffer) {
    return [...new Uint8Array (buffer)]
        .map (b => b.toString (16).padStart (2, "0"))
        .join ("");
}

/********************************
       Attestation Decoder
********************************/
function parseAttestation(attestationObject) {
    if(!window.cbor)
        return null

    console.debug("Decoding attestation")

    // https://w3c.github.io/webauthn/#sctn-attestation
    let att = cbor.decode(attestationObject)
    /*
     * attestation: {
     *   fmt: // vendor specific format of `attStmt`
     *   attStmt: // ...
     *   authData: https://w3c.github.io/webauthn/#authenticator-data
     *
     *
     *
     */


    console.debug(att)

    // Base64 example of attestationObject.authData
    // authData = parseBase64('SZYN5YgOjGh0NBcPZHZgW4/krrmihjLHmVzzuoMdl2NFAAAAAAAAAAAAAAAAAAAAAAAAAAAAIP+nd26ubd84m5vaSMMyqwbFQbt9Inz/nChP5TrlOiOdpAEDAzkBACBZAQCmYB3osd3rcOrmOKGbit3WfvpBGGsTQqtZOTSh9OFBLMtFrNHwS24qnwUH+sAJTYQlgNcLOAwW+43cxMVOki4sxulyPeJcCSRXMFd5WH7umiqnbjyCTOxmxcwXHYOoGLteWHe4Z83eUiaJpMv1nHew0qESTAvEKKPRBPZuSVotxaeVVU7wDYsm2GIDQsMv8EvHeskb9dEyzvpk85yxsKuXQfOPoHx5Ue+VfcE3yTz0k8Nxrs5yTCPNY7WL4rgOoINzJ31jcpqpBVdcfPZ8yNwDD4b0FbUxzjhWiFRHAt/3v1dP9LSkXfh7qlHB/5Ws/w6xppuBKLn3+Arl/aiRALqrIUMBAAE=')

    return {
        fmt: att.fmt,
        attStmt: att.attStmt,
        authData: parseAuthenticatorData(att.authData)
    }
}

export function parseAuthenticatorDataBase64(authData) {
    return parseAuthenticatorData(parseBase64(authData))
}

function parseAuthenticatorData(authData) {
    console.debug(authData)
    let flags = new DataView(authData.slice(32,33)).getUint8(0, false)
    console.debug(flags)

    // https://w3c.github.io/webauthn/#sctn-authenticator-data
    let parsed = {
        rpIdHash: toBase64(authData.slice(0,32)),
            flags: {
                 userPresent: !!(flags & 1),
                 //reserved1: !!(flags & 2),
                 userVerified: !!(flags &  4),
                 backupEligibility: !!(flags & 8),
                 backupState: !!(flags & 16),
                 //reserved2: !!(flags & 32),
                 attestedData: !!(flags & 64),
                 extensionsIncluded: !!(flags & 128)
            },
            counter: new DataView(authData.slice(33,37)).getUint32(0, false),  // Big-Endian!
    }

    if(authData.length > 37) {
        // https://w3c.github.io/webauthn/#attested-credential-data
        let credentialLength = new DataView(authData.slice(53,55)).getUint16(0, false) // Big-Endian!
        parsed = {
            ...parsed,
            aaguid: extractAaguid(authData),
            credentialId: toBase64(authData.slice(55, 55+credentialLength)),
            publicKey: toBase64(authData.slice(55+credentialLength, authData.length)) // probably breaks if extensions are invoked
        }
    }

    return parsed
}

function extractAaguid(authData) {
    return formatAaguid(authData.slice(37, 53))
}

function formatAaguid(buffer) {
    let aaguid = bufferToHex(buffer)
    aaguid = aaguid.substr(0,8) + '-' + aaguid.substr(8,4) + '-' + aaguid.substr(12,4) + '-' + aaguid.substr(16,4) + '-' + aaguid.substr(20)
    return aaguid // example: "d41f5a69-b817-4144-a13c-9ebd6d9254d6"
}

async function resolveAuthenticatorName(authData) {
    const aaguid = extractAaguid(authData)
    const aaguidMetadata = authenticatorMetadata //await getAaguidMetadata()
    return aaguidMetadata[aaguid]?.name
}


// List of AAGUIDs are encoded as JWT here: https://mds.fidoalliance.org/
async function getAaguidMetadata() {
    // this function is rather resource intensive and time consuming
    // therefore, the result is cached in local storage
    const res = await axios.get("https://mds.fidoalliance.org")

    // the response is a JWT including all AAGUIDs and their metadata
    console.debug(res.data)

    // let us ignore the JWT verification, since this is solely for descriptive purposes, not signed data
    const payload = res.data.split('.')[1].replaceAll('-', '+').replaceAll('_', '/')
    const json = JSON.parse(atob(payload))
    console.debug(json)

    let aaguidMetadata = {}
    for(const e of json.entries) {
        if(!e.aaguid || !e.metadataStatement)
            continue

        aaguidMetadata[e.aaguid] = {name: e.metadataStatement.description}
    }

    console.debug(aaguidMetadata)
    return aaguidMetadata
}

async function getAuthAttachment(authType) {
    if(authType === "local")
        return "platform";
    if(authType === "extern")
        return "cross-platform";
    if(authType === "both")
        return null;

    // the default case: "auto", depending on device capabilities
    try {
        if(await isLocal())
            return "platform"
        else
            return "cross-platform"
    } catch(e) {
        // might happen due to some security policies
        // see https://w3c.github.io/webauthn/#sctn-isUserVerifyingPlatformAuthenticatorAvailable
        return null
    }
}


function getAlgoName(num) {
    switch(num) {
        case -7: return "ES256"
        case -257: return "RS256"
        default: return "unknown"
    }
}

/**
 * Creates a cryptographic key pair, in order to register the public key for later passwordless authentication.
 *
 * @param {string} username
 * @param {string} challenge A server-side randomly generated string.
 * @param {Object} [options] Optional parameters.
 * @param {number} [options.timeout=60000] Number of milliseconds the user has to respond to the biometric/PIN check.
 * @param {'required'|'preferred'|'discouraged'} [options.userVerification='required'] Whether to prompt for biometric/PIN check or not.
 * @param {'auto'|'local'|'extern'|'both'}       [options.authenticatorType='auto'] Which device to use as authenticator.
 *          'auto': if the local device can be used as authenticator it will be preferred. Otherwise it will prompt for an external device.
 *          'local': use the local device (using TouchID, FaceID, Windows Hello or PIN)
 *          'extern': use an external device (security key or connected phone)
 *          'both': prompt the user to choose between local or external device. The UI and user interaction in this case is platform specific.
 * @param {boolean} [attestation=false] If enabled, the device attestation and clientData will be provided as base64 encoded binary data.
 *                                Note that this is not available on some platforms.
 */
//
export async function register(username, challenge, options) {
    if(!options)
        options = {}

    const creationOptions = {
        challenge: parseBase64url(challenge),
        rp: {
            id: window.location.hostname,
            name: window.location.hostname
        },
        user: {
            id: await sha256(new TextEncoder("utf-8").encode(username)),
            name: username,
            displayName: username,
        },
        pubKeyCredParams: [
            {alg: -7, type: "public-key"},   // ES256 (Webauthn's default algorithm)
            {alg: -257, type: "public-key"}, // RS256 (for Windows Hello and others)
        ],
        timeout: options.timeout ?? 60000,
        authenticatorSelection: {
            userVerification: options.userVerification ?? "required",
            authenticatorAttachment: await getAuthAttachment(options.authenticatorType ?? "auto"),
        },
        attestation: "direct" // options.attestation ? "direct" : "none"
    }

    if(creationOptions?.authenticatorSelection?.authenticatorAttachment === null)
        delete creationOptions.authenticatorSelection.authenticatorAttachment

    console.debug(creationOptions)
    const credential = await navigator.credentials.create({publicKey: creationOptions});
    console.debug(credential)

    return {
        username: username,
        challenge: challenge,
        credential: {
            id: credential.id,
            publicKey: toBase64(credential.response.getPublicKey()),
            algorithm: getAlgoName(credential.response.getPublicKeyAlgorithm())
        },
        authenticator: {
            isLocal: (credential.authenticatorAttachment === "platform"),
            transport: credential.response.getTransports()[0],
            aaguid: extractAaguid(credential.response.getAuthenticatorData()),
            name: await resolveAuthenticatorName(credential.response.getAuthenticatorData()),
            attestation: options.attestation ? toBase64(credential.response.attestationObject) : null,
            clientData: options.attestation ? toBase64(credential.response.clientDataJSON) : null,
        }
    }
}


/**
 * Signs a challenge using one of the provided credentials IDs in order to authenticate the user.
 *
 * @param {string[]} credentialIds The list of credential IDs that can be used for signing.
 * @param {string} challenge A server-side randomly generated string, the base64 encoded version will be signed.
 * @param {Object} [options] Optional parameters.
 * @param {number} [options.timeout=60000] Number of milliseconds the user has to respond to the biometric/PIN check.
 * @param {'required'|'preferred'|'discouraged'} [options.userVerification='required'] Whether to prompt for biometric/PIN check or not.
 */
export async function login(credentialIds, challenge, options) {
    if(!options)
        options = {}

    let authOptions = {
        challenge: parseBase64url(challenge),
        rpId: window.location.hostname,
        allowCredentials: credentialIds.map(id => { return {
            id: parseBase64url(id),
            type: 'public-key',
            //transports: ['internal', 'usb', 'ble', 'nfc'],
        }}),
        userVerification: options.userVerification ?? "required",
        timeout: options.timeout ?? 60000,
    }

    console.debug(authOptions)
    let auth = await navigator.credentials.get({
        publicKey: authOptions
    })
    console.debug(auth)

    return {
        credentialId: auth.id,
        userHash: toBase64(auth.response.userHandle),
        clientJson: JSON.parse(parseBuffer(auth.response.clientDataJSON)),
        clientData: toBase64(auth.response.clientDataJSON),
        signature: toBase64(auth.response.signature),
        authenticatorJson: parseAuthenticatorData(auth.response.authenticatorData),
        authenticatorData: toBase64(auth.response.authenticatorData)
    }
}



function concatenateBuffers(buffer1, buffer2) {
  var tmp = new Uint8Array(buffer1.byteLength + buffer2.byteLength);
  tmp.set(new Uint8Array(buffer1), 0);
  tmp.set(new Uint8Array(buffer2), buffer1.byteLength);
  return tmp;
};


// https://w3c.github.io/webauthn/#sctn-verifying-assertion
export async function verify({algorithm, publicKey, authenticatorData, clientData, signature}) {
    let cryptoKey = await window.crypto.subtle.importKey(
        'spki', parseBase64(publicKey), {name:'RSASSA-PKCS1-v1_5', hash:'SHA-256'}, false, ['verify'])
    console.debug(cryptoKey)

    let clientHash = await sha256( parseBase64(clientData) );
    console.debug(clientHash)


    //let comboBuffer = concatenateBuffers(parseBase64(authenticatorData), parseBase64(clientData)) // clientHash)
    let comboBuffer = concatenateBuffers(parseBase64(authenticatorData), clientHash)
    console.debug(comboBuffer)

    console.debug(parseBase64(signature))

    // https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/verify
    let validity = await window.crypto.subtle.verify({name:'RSASSA-PKCS1-v1_5', hash:'SHA-256'}, cryptoKey, parseBase64(signature), comboBuffer)

    return validity
}