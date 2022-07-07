Login
=====

Minimal example
---------------

	let publicKey = {
		challenge: Uint8Array.from("randomStringFromServer", c => c.charCodeAt(0)),
		allowCredentials: [],
	}

	let auth = await navigator.credentials.get({
		publicKey
	});
