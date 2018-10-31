import Vue from 'vue'
import App from './App.vue'
import './scss/app.scss'

Vue.component('Button', require('./components/Button'));
Vue.component('Checkbox', require('./components/Checkbox'));
Vue.component('Input', require('./components/Input'));

new Vue({
    el: '#app',
    render: h => h(App)
});