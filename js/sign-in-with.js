import passwordless from 'https://unpkg.com/@passwordless-id/connect'

// the information requested from the profile
const scope = 'openid avatar email'

window.onClickSignIn = () => {
  // performs a redirect to let the user authenticate and/or authorize this app
  passwordless.auth({ scope })
}

window.onClickSignOut = async () => {
  // performs a redirect to let the user sign out
  passwordless.logout()
}

async function init() {
  // retrieves the user profile and `id_token` if available
  const user = await passwordless.id({ scope })
  if (user.signedIn && user.scopeGranted) {
    console.log(user)
    showUser(user)
  }
  else {
    showSignIn()
  }
}

init()

function showUser(user) {
  document.getElementById('picture').src = user.profile.picture
  document.getElementById('nickname').textContent = user.profile.nickname
  document.querySelector('#output code').textContent = JSON.stringify(user, null, ' ')

  document.getElementById('spinner').hidden = true
  document.getElementById('profile').hidden = false
  document.getElementById('output').hidden = false
  document.getElementById('sign-out').hidden = false

}

function showSignIn() {
  document.getElementById('spinner').hidden = true
  document.getElementById('sign-in').hidden = false
}