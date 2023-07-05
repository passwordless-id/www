import { client } from 'https://unpkg.com/@passwordless-id/webauthn@1.2.4/dist/webauthn.min.js'

 const app = new Vue({
    el: '#app',
    data: {
      username: null,
      isRegistered: false,
      isAuthenticated: false,
      isRoaming: false
    },
    methods: {
      async checkIsRegistered() {
        console.log(this.username + ' => ' + !!window.localStorage.getItem(this.username))
        this.isRegistered = !!window.localStorage.getItem(this.username)
      },
      async register() {
        let res = await client.register(this.username, window.crypto.randomUUID(), {authenticatorType: this.isRoaming ? 'roaming' : 'auto'})
        this.$buefy.toast.open({
            message: 'Registered!',
            type: 'is-success'
        })

        console.log(res)

        this.isAuthenticated = true;
        window.localStorage.setItem(this.username, res.credential.id)
        await this.checkIsRegistered()
      },
      async login() {
        let credentialId = window.localStorage.getItem(this.username)
        let res = await client.authenticate([credentialId], window.crypto.randomUUID(), {authenticatorType: this.isRoaming ? 'roaming' : 'auto'})
        console.log(res)

        this.isAuthenticated = true;
        this.$buefy.toast.open({
            message: 'Signed in!',
            type: 'is-success'
        })
      },
      async logout() {
        this.isAuthenticated = false;
        this.$buefy.toast.open({
            message: 'Signed out!',
            type: 'is-success'
        })

      }
    }
 })
