import * as passwordless from './passwordless.js'

 const app = new Vue({
    el: '#app',
    data: {
      username: null,
      isRegistered: false,
      isAuthenticated: false,
      isExternal: false
    },
    methods: {
      async checkIsRegistered() {
        console.log(this.username + ' => ' + !!window.localStorage.getItem(this.username))
        this.isRegistered = !!window.localStorage.getItem(this.username)
      },
      async register() {
        let res = await passwordless.register(this.username, {isExternal: this.isExternal})
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
        let res = await passwordless.login(this.username, [credentialId], {isExternal: this.isExternal})
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