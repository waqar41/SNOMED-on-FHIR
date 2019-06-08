<template>
    <v-container>
        <v-layout justify-center
                  text-xs-center
                  wrap
        >
            <v-card>
                <v-card-title>
                    Create New Patient
                </v-card-title>
                <v-form v-model="valid">
                    <v-container>
                        <v-layout>
                            <v-flex
                                    xs12
                                    md3
                            >
                                <v-select
                                        v-model="mr"
                                        :rules="nameRules"
                                        :counter="10"
                                        label="Mr/mrs"
                                        :items="['Mr','Mrs']"
                                        required
                                ></v-select>
                            </v-flex>
                            <v-flex
                                    xs12
                                    md3
                            >
                                <v-text-field
                                        v-model="firstname"
                                        :rules="nameRules"
                                        :counter="10"
                                        label="First Name"
                                        required
                                ></v-text-field>
                            </v-flex>

                            <v-flex
                                    xs12
                                    md3
                            >
                                <v-text-field
                                        v-model="familyname"
                                        :rules="nameRules"
                                        :counter="10"
                                        label="Family name"
                                        required
                                ></v-text-field>
                            </v-flex>
                            <v-flex
                                    xs12
                                    md3
                            >
                                <v-btn color="primary" @click="savePatient"> Save</v-btn>
                            </v-flex>
                        </v-layout>
                        <v-layout>
                            <v-flex
                                    xs12
                                    md3
                            >
                                <v-text-field
                                        v-model="mobile"
                                        :rules="nameRules"
                                        :counter="10"
                                        label="Mobile Number"
                                        required
                                ></v-text-field>
                            </v-flex>
                            <v-flex
                                    xs12
                                    md3
                            >
                                <v-select
                                        v-model="gender"
                                        :rules="nameRules"
                                        :counter="10"
                                        label="Gender"
                                        :items="['male','female']"
                                        required
                                ></v-select>
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
                                            label="Date of Birth"
                                            hint="Date of birth"
                                            prepend-icon="mdi-calendar"
                                            readonly
                                    ></v-text-field>
                                    <v-date-picker :min="todaydate" v-model="date"
                                                   @input="menu2 = false"></v-date-picker>
                                </v-menu>
                            </v-flex>
                            <v-flex
                                    xs12
                                    md3
                            >
                                <v-text-field
                                        v-model="address"
                                        :rules="nameRules"
                                        :counter="50"
                                        label="Address"
                                        required
                                ></v-text-field>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-form>
            </v-card>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        data: () => ({
            baseUrl: 'http://localhost:8080/hapi-fhir-jpaserver-example/baseDstu3/',
            data: '',
            valid: false,
            firstname: '',
            familyname: '',
            mobile: '',
            mr: '',
            date: '',
            menu2: false,
            todaydate: "",
            gender: '',
            dob: '',
            address: '',
            nameRules: [
                v => !!v || 'Name is required',
                v => v.length <= 50 || 'Name must be less than 10 characters'
            ],
            email: '',
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+/.test(v) || 'E-mail must be valid'
            ]
        }),
        methods: {
            savePatient() {
                let data = {
                    "resourceType": "Patient",
                    "id": "1",
                    "identifier": [
                        {
                            "use": "usual",
                            "type": {
                                "coding": [
                                    {
                                        "system": "http://terminology.hl7.org/CodeSystem/v2-0203",
                                        "code": this.mr
                                    }
                                ]
                            },
                            "system": "uia.no",
                            "value": "12345",

                            "assigner": {
                                "display": "UIA Health"
                            }
                        }
                    ],
                    "active": true,
                    "name": [
                        {
                            "use": "official",
                            "family": this.familyname,
                            "given": [
                                this.firstname
                            ]
                        }
                    ],
                    "telecom": [
                        {
                            "use": "home"
                        },
                        {
                            "system": "phone",
                            "value": this.mobile,
                        },


                    ],
                    "gender": this.gender,
                    "birthDate": this.dob,
                    "deceasedBoolean": false,
                    "address": [
                        {
                            "use": "home",
                            "address1": this.address

                        }
                    ],
                };

                this.axios.post(this.baseUrl + 'Patient', data).then((response) => {
                    console.log(response.data);
                    this.$snotify.success("Successfully saved!")
                    this.$router.push({name:'patients'});

                })
            }
        }
    }
</script>

<style>

</style>
