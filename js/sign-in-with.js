import connect from 'https://unpkg.com/@passwordless-id/connect'

// The scope indicates what should be read form the profile and must be granted by the user
const scope = 'openid email avatar'

async function login() {
  // This will perform a redirect and return back here
  // once the user is signed in and has granted scope
  connect.auth({scope})
}

async function init() {

  // Fetch user profile and `id_token`
  const user = await connect.request({scope})

  if (user.signedIn && user.scopeGranted) {
    // User is signed in and has granted scope
    showUserInfo(user.profile)
  } else {
    // User must first sign in or grant scope
    showLoginButton()  
  }
}

document.getElementById('login-btn').addEventListener('click', login)
init()


function showLoginButton() {
  document.getElementById('login').className = 'visible'
  document.getElementById('userinfo').className = 'hidden'
}

function showUserInfo(userinfo) {
  document.getElementById('login').className = 'hidden'
  document.getElementById('userinfo').className = 'visible'
  
  document.querySelector('#userinfo img').src = userinfo.picture
  document.querySelector('#userinfo h3').textContent = userinfo.nickname ?? 'Error: username missing?!'
  document.querySelector('#userinfo pre').textContent = JSON.stringify(userinfo, null, 2)
}

