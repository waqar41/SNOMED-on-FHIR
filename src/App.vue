<template>
  <v-app>
    <vue-snotify></vue-snotify>
    <v-toolbar app dark color="teal lighten-3" >
      <v-toolbar-title class="headline text-uppercase">
        <span @click.prevent="$router.push({name:'home'})">UIA-EHealth</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>

    </v-toolbar>

    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
  // import HelloWorld from './components/HelloWorld'
  // import Patient from './components/Patient'
let baseUrl= 'http://localhost:8080/hapi-fhir-jpaserver-example/baseDstu3/'
export default {
  name: 'App',
  components: {
    // HelloWorld,
    // Patient
  },
  data () {
    return {
      //
      baseUrl:baseUrl
    }
  }
}
</script>
