import passwordless from 'https://unpkg.com/@passwordless-id/connect@1.2.0/dist/connect.min.js'

async function init() {
  // retrieves the user profile and `id_token` if available
  const user = await passwordless.id({ scope: 'openid avatar' })
  if (user.signedIn && user.scopeGranted) {
    console.log(user)
    document.getElementById('portrait').src = user.profile.picture
    document.getElementById('nickname').textContent = user.profile.nickname
    document.getElementById('sign-in').hidden = true
    document.getElementById('profile').hidden = false
  }
}

init()