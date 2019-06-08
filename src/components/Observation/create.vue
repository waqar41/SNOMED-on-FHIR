<template>
    <v-container>
        <!--<v-card>-->
            <!--<v-card-text>-->
                <!--<v-btn>Add Patient</v-btn>-->
            <!--</v-card-text>-->
        <!--</v-card>-->
        <v-layout>
            <v-flex sm3 justify-end>
                <!--<a href="" color="info" block @click.prevent="$router.push({name:'patient-show'})">Go Back</a>-->
            </v-flex>
        </v-layout>
        <v-layout justify-center
                  text-xs-center
                  wrap
        >


            <v-layout>
                <v-flex sm12>
                    <v-card>
                        <v-card-title>
                            Create New Vital Sign Observation for Blood Pressure
                        </v-card-title>
                        <v-form v-model="valid">
                            <v-container>
                                <v-layout>
                                    <v-flex
                                            xs12
                                            md3
                                    >
                                        <v-autocomplete
                                                label="Patient Name"
                                                required
                                                :items="patients"
                                                v-model="patient_id"
                                                item-text="resource.name[0].given[0]"
                                                item-value="resource.id"
                                        ></v-autocomplete>
                                    </v-flex>
                                    <v-flex
                                            xs12
                                            md3
                                    >
                                        <v-menu
                                                v-model="menu2"
                                                :close-on-content-click="false"
                                                :nudge-right="40"
                                                lazy
                                                transition="scale-transition"
                                                offset-y
                                                full-width
                                                min-width="290px"
                                        >
                                            <v-text-field
                                                    slot="activator"
                                                    v-model="date"
                                                    label="Date"
                                                    hint="Departure"
                                                    prepend-icon="mdi-calendar"
                                                    readonly
                                            ></v-text-field>
                                            <v-date-picker :min="todaydate" v-model="date"
                                                           @input="menu2 = false"></v-date-picker>
                                        </v-menu>
                                    </v-flex>

                                </v-layout>
                                <v-layout>
                                    <v-flex
                                            md3
                                    >
                                        <v-text-field
                                                v-model="bodysite"
                                                :rules="nameRules"
                                                :counter="15"
                                                label="SNOMED code for BodySite"
                                                required
                                        ></v-text-field>
                                    </v-flex>
                                    <v-flex
                                            md3
                                    >
                                        <v-text-field
                                                v-model="descriptionB"
                                                :rules="nameRules"
                                                :counter="15"
                                                label="SNOMED description"
                                                required
                                        ></v-text-field>
                                    </v-flex>


                                </v-layout>
                                <v-layout>
                                    <v-flex
                                            xs12
                                            md3
                                    >
                                        <v-text-field
                                                v-model="codeS"
                                                :rules="nameRules"
                                                :counter="30"
                                                label="SNOMED Code Systolic BP"
                                                required
                                        ></v-text-field>
                                    </v-flex>
                                    <v-flex
                                            xs12
                                            md3
                                    >
                                        <v-text-field
                                                v-model="descriptionS"
                                                label="Systolic BP"
                                                required
                                        ></v-text-field>
                                    </v-flex>
                                    <v-flex
                                            xs12
                                            md3
                                    >
                                        <v-text-field
                                                v-model="valueS"
                                                :rules="nameRules"
                                                :counter="15"
                                                label="Systolic Value"
                                                required
                                        ></v-text-field>
                                    </v-flex>
                                </v-layout>
                                <v-layout>

                                    <v-flex
                                            xs12
                                            md3
                                    >
                                        <v-text-field
                                                v-model="codeD"
                                                :rules="nameRules"
                                                :counter="30"
                                                label="Code Diastolic"
                                                required
                                        ></v-text-field>
                                    </v-flex>
                                    <v-flex
                                            xs12
                                            md3
                                    >
                                        <v-text-field
                                                v-model="descriptionD"
                                                label="SNOMED Description"
                                                required
                                        ></v-text-field>
                                    </v-flex>
                                    <v-flex
                                            xs12
                                            md3
                                    >
                                        <v-text-field
                                                v-model="valueD"
                                                :rules="nameRules"
                                                :counter="15"
                                                label="Diastolic Value"
                                                required
                                        ></v-text-field>
                                    </v-flex>
                                </v-layout>
                                <v-layout>
                                    <v-flex
                                            xs12
                                            md3
                                    >
                                        <v-btn color="primary" @click="saveBloodPreasure" block> Save</v-btn>
                                    </v-flex>
                                </v-layout>

                            </v-container>
                        </v-form>
                    </v-card>

                </v-flex>
            </v-layout>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        data: () => ({
            baseUrl: 'http://localhost:8080/hapi-fhir-jpaserver-example/baseDstu3/',
            data: '',
            valid: false,
            patients:[],
            patient_id:'',
            patient_reference: '',
            date: '',
            menu2: false,
            bodysite: '368209003',
            descriptionB: 'Right arm',
            codeS: '271649006',
            descriptionS: 'Systolic blood pressure',
            valueS: '',
            codeD: '271650006',
            descriptionD: 'Diastolic blood pressure',
            todaydate: new Date().toISOString().slice(0, 10),
            valueD: '',
            nameRules: [
                v => !!v || 'Name is required',
                v => v.length <= 30 || 'Name must be less than 10 characters'
            ],
            email: '',
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+/.test(v) || 'E-mail must be valid'
            ]
        }),
        methods: {
            saveBloodPreasure() {
                let data = {
                    "resourceType": "Observation",
                    "id": "blood-pressure",
                    "meta": {
                        "profile": [
                            "http://hl7.org/fhir/StructureDefinition/vitalsigns"
                        ]
                    },

                    "status": "final",
                    "category": [
                        {
                            "coding": [
                                {
                                    "system": "http://terminology.hl7.org/CodeSystem/observation-category",
                                    "code": "vital-signs",
                                    "display": "Vital Signs"
                                }
                            ]
                        }
                    ],
                    "code": {
                        "coding": [
                            {
                                "system": "http://snomed.info/sct",
                                "code": "75367002",
                                "display": "Blood pressure panel with all children optional"
                            }
                        ],
                        "text": "Blood pressure systolic & diastolic"
                    },
                    "subject": {
                      "reference": "Patient/"+this.patient_id
                    },
                    "effectiveDateTime": this.date,
                    "bodySite": {
                        "coding": [
                            {
                                "system": "http://snomed.info/sct",
                                "code": this.bodysite,
                                "display": this.descriptionB
                            }
                        ]
                    },
                    "component": [
                        {
                            "code": {
                                "coding": [
                                    {
                                        "system": "http://snomed.info/sct",
                                        "code": this.codeS,
                                        "display": this.descriptionS
                                    }
                                ]
                            },
                            "valueQuantity": {
                                "value": this.valueS,
                                "unit": "mmHg",
                                "system": "http://unitsofmeasure.org",
                                "code": "mm[Hg]"
                            },
                        },
                        {
                            "code": {
                                "coding": [
                                    {
                                        "system": "http://loinc.org",
                                        "code": this.codeD,
                                        "display": this.descriptionD
                                    }
                                ]
                            },
                            "valueQuantity": {
                                "value": this.valueD,
                                "unit": "mmHg",
                                "system": "http://unitsofmeasure.org",
                                "code": "mm[Hg]"
                            },
                        }
                    ]
                };
                this.axios.post(this.baseUrl + 'Observation', data).then((response) => {
                    console.log(response.data);
                    this.$snotify.success('Successfully added');
                    this.$router.push({name:'observations'});
                });
            },
            getAllPatients() {
                this.axios.get(this.baseUrl + 'Patient').then((response) => {
                    console.log(response.data);
                    this.patients = response.data.entry
                })
            },
        },
        mounted() {
            this.getAllPatients();
        }
    }
</script>

<style>

</style>
