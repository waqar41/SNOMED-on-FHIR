<template>
  <v-container>
    <v-layout
      text-xs-center
      wrap
    >
      <v-flex sm3 justify-end>
        <v-btn color="info" block @click="$router.push({name:'observation-create'})">Add New Observation</v-btn>
      </v-flex>
    </v-layout>
    <v-layout class="py-10">
      <v-flex>
        <template v-for="observation in observations">
          <v-card>
            <v-card-title>Blood Pressure</v-card-title>
            <v-card-text>
              <p><b>Systolic:</b> {{observation.resource.component[0].valueQuantity.value}} <b>SNOMED code for systolic:</b>{{observation.resource.component[0].code.coding[0].code}}</p>
                <p><b>Diastolic:</b> {{observation.resource.component[1].valueQuantity.value}} <b>SNOMED code for diastolic:</b>{{observation.resource.component[1].code.coding[0].code}}</p>
            </v-card-text>
          </v-card>

        </template>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data: () => ({
      baseUrl: 'http://localhost:8080/hapi-fhir-jpaserver-example/baseDstu3/',
      observations:[],
      searchText:''
    }),
    mounted(){
      this.getPatient()
    },
    methods:{
      // Using this snippet we will get all the SNOMED-CT codes stored in the HAPI FHIR server
      // baseUrl: http://localhost:8080/hapi-fhir-jpaserver-example/baseDstu3/
      //Path: Observation
      // ? : used as a search
      getPatient(){
        this.axios.get(this.baseUrl+'Observation').then((response) => {
          console.log(response.data);
          this.observations = response.data.entry
        })
      }
    }
  }
</script>

<style>

</style>
