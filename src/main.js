import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader
import VueRouter from 'vue-router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Snotify, { SnotifyPosition } from 'vue-snotify';
const options = {
    toast: {
        position: SnotifyPosition.rightBottom,
        showProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        timeout: 2000
    }
}

Vue.use(Snotify, options)
Vue.use(VueRouter);
Vue.use(VueAxios, axios);
Vue.use(Vuetify);
Vue.config.productionTip = false;

import Home from './components/Home'
import PatientIndex from './components/Patient/index'
import PatientCreate from './components/Patient/create'
import PatientShow from './components/Patient/show'
import ObservationIndex from './components/Observation/index'
import ObservationCreate from './components/Observation/create'
import PatientObservationCreate from './components/Patient/observation-create'

const routes = [
    {path: "/",name:'home', component: Home},
    {path: "/patients",name:'patients', component: PatientIndex},
    {path: "/patient/create", name:'patient-create', component: PatientCreate},
    {path: "/patient/show", name: 'patient-show', component: PatientShow},
    {path: "/patient/observation/create", name: 'patient-observation-create', component: PatientObservationCreate},
    {path: "/observation/create", name: 'observation-create', component: ObservationCreate},
    {path: "/observations", name: 'observations', component: ObservationIndex},
    // {path: "/observation/create", name: 'observation-create', component: ObservationCreate}
]
const router = new VueRouter({
    routes,
    mode: 'history'
});
new Vue({
    render: h => h(App),
    router
}).$mount('#app')
