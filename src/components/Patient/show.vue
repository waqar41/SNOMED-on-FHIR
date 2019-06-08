<template>
    <v-container>

        <v-card elevation="0">
            <v-card-text>
                <v-layout>
                    <v-flex sm10>
                        <h3 v-if=" patient[0]">{{patient[0].resource.name[0].given[0]+" "+patient[0].resource.name[0].family}} Observations</h3>

                    </v-flex>
                    <v-flex sm2>
                        <v-btn color="info" v-if="patient[0]"
                               @click="$router.push({name:'patient-observation-create',query:{patient_id:patient[0].resource.id}})">
                            New Observation
                        </v-btn>
                    </v-flex>
                </v-layout>

            </v-card-text>
        </v-card>

        <v-layout
                wrap
        >
            <v-flex>
                <template v-for="observation in observations">
                    <v-card v-if="observation.resource.component" class="my-2" elevation="0">
                        <v-card-title>Blood Pressure</v-card-title>
                        <v-card-text>
                            <p><b>{{observation.resource.component[0].code.coding[0].display}}:</b>
                                {{observation.resource.component[0].valueQuantity.value}} <b>Snomed code for
                                    systolic:</b>{{observation.resource.component[0].code.coding[0].code}}</p>
                            <p><b>{{observation.resource.component[1].code.coding[0].display}}:</b>
                                {{observation.resource.component[1].valueQuantity.value}} <b>Snomed code for
                                    diastolic:</b>{{observation.resource.component[1].code.coding[0].code}}</p>
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
            patients: [],
            observations: {},
            searchText: '',
            patient: {}
        }),
        mounted() {
            this.getPatientObservations()
            this.getPatientById()
        },
        methods: {
            getPatientObservations() {
                this.axios.get(this.baseUrl + 'Observation?subject:Patient=' + this.$route.query.patient_id).then((response) => {
                    console.log(response.data);
                    this.observations = response.data.entry
                })
            },
            getPatientById() {
                this.axios.get(this.baseUrl + 'Patient?_id=' + this.$route.query.patient_id).then((response) => {
                    console.log(response.data);
                    this.patient = response.data.entry
                })
            },
        }
    }
</script>

<style>

</style>
