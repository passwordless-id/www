async function init() {
  // The API call to fetch the user
  const res = await fetch('https://api.passwordless.id/openid/userinfo', {
    mode: 'cors',
    credentials: 'include'
  })

  if (res.ok) {
    // Display it
    const userinfo = await res.json()
    showUser(userinfo)
  } else if (res.status === 401) {
    // User must first sign in (or create account)
    // It will be redirected back here once done
    document.getElementById('login').className = 'visible'
  }
  else {
    console.warn(res)
    alert(`Unexpected Error: ${res.status} ${await res.text()}`)
  }
}

function showUser(userinfo) {
  document.querySelector('#userinfo img').src = userinfo.picture
  document.querySelector('#userinfo h3').textContent = userinfo.nickname ?? 'Error: username missing?!'
  document.querySelector('#userinfo pre').textContent = JSON.stringify(userinfo, null, 2)
  document.getElementById('userinfo').className = 'visible'
}

init()
