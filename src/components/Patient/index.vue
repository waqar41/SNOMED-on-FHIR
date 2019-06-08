<template>
    <v-container>
        <v-layout wrap>
            <v-flex>
                <v-card elevation="0">
                    <v-card-text>
                        <v-layout>
                            <v-flex sm10>
                                <p>List of all the patients.</p>
                            </v-flex>
                            <v-flex sm2>
                                <v-btn color="info" @click="$router.push({name:'patient-create'})">Add Patient</v-btn>
                            </v-flex>
                        </v-layout>

                    </v-card-text>
                </v-card>
            </v-flex>

        </v-layout>
        <v-layout class="my-2"
                  text-xs-center
                  wrap
        >
            <v-text-field
                    v-model="searchText"
                    @input="onSearch"
                    solo append-icon="search" hide-details single-line placeholder="search for patient"></v-text-field>
        </v-layout>

        <v-layout>
            <v-btn sm6 class="mx-2" block @click="previous">Previous</v-btn>
            <v-btn sm6 class="mx-2" block @click="next">Next</v-btn>
        </v-layout>
        <p class="light-blue--text mx-2">Showing {{patients.length}} entries</p>
        <v-layout>
            <v-flex>
                <template v-for="patient in patients">
                    <v-card v-if="patient.resource.name.length && patient.resource.name[0].given" class="my-2 py-2"
                            elevation="0"
                            @click="$router.push({name:'patient-show',query:{patient_id:patient.resource.id}})"> 
                        <v-card-title>{{patient.resource.name[0].given[0] +" "+patient.resource.name[0].family }}
                        </v-card-title>
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
            searchText: '',
            offset: 0
        }),
        mounted() {
            this.getPatients()
        },
        methods: {
            onSearch(){
                this.axios.get(this.baseUrl + 'Patient?name=' + this.searchText).then((response) => {
                    console.log(response.data);
                    this.patients = response.data.entry
                })            },
            getPatients() {
                this.axios.get(this.baseUrl + 'Patient?_count=10&&_getpagesoffset=' + this.offset).then((response) => {
                    console.log(response.data);
                    this.patients = response.data.entry
                })
            },
            previous() {
                if (this.offset > 0) {
                    this.offset -= 10;
                    this.getPatients()
                }
            },
            next() {
                this.offset += 10;
                this.getPatients()
            }

        }
    }
</script>

<style>

</style>
