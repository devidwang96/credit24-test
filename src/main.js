import Vue from 'vue'
import App from './App.vue'
import './scss/app.scss'

import Button from './components/Button';
import Checkbox from './components/Checkbox';
import Input from './components/Input';

import VueTheMask from 'vue-the-mask'
Vue.use(VueTheMask);

Vue.component('site-button', Button);
Vue.component('site-checkbox', Checkbox);
Vue.component('site-input', Input);

new Vue({
    el: '#app',
    render: h => h(App),
});