require('./bootstrap')

window.Vue = require('vue')
window.axios = require('axios')

// import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App.vue'

const app = new Vue({
    el: '#app',
    components: {
        App
    },
    render: h => h(App)
})