<template>
  <v-container>
    <v-layout justify-center
      text-xs-center
      wrap
    >
     <template v-for="patient in patients">
                    <v-card v-if="patient.resource.name.length && patient.resource.name[0].given" class="my-2 py-2"
                            elevation="0"
                            @click="$router.push({name:'patient-show',query:{patient_id:patient.resource.id}})"> 
                        <v-card-title>{{patient.resource.name[0].given[0] +" "+patient.resource.name[0].family }}
                        </v-card-title>
                    </v-card>
                </template>
      <v-card >
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
                <v-text-field
                        v-model="mr"
                        :rules="nameRules"
                        :counter="10"
                        label="Mr"
                        required
                ></v-text-field>
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
                <v-text-field
                        v-model="gender"
                        :rules="nameRules"
                        :counter="10"
                        label="Gender"
                        required
                ></v-text-field>
              </v-flex>
              <v-flex
                      xs12
                      md3
              >
                <v-text-field
                        v-model="dob"
                        :rules="nameRules"
                        :counter="10"
                        label="Date of Birth"
                        required
                ></v-text-field>
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
      baseUrl:'http://localhost:8080/hapi-fhir-jpaserver-example/baseDstu3/',
      data:'',
      valid: false,
      firstname: '',
      familyname: '',
      mobile: '',
      mr: '',
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
    methods:{
      savePatient(){
        this.data= {
  "resourceType": "Patient",
  "id": "1",
  "text": {
    "status": "generated",
    "div": "<div xmlns=\"http://www.w3.org/1999/xhtml\">\n\t\t\t<table>\n\t\t\t\t<tbody>\n\t\t\t\t\t<tr>\n\t\t\t\t\t\t<td>Name</td>\n\t\t\t\t\t\t<td>Peter James \n              <b>Chalmers</b> (&quot;Jim&quot;)\n            </td>\n\t\t\t\t\t</tr>\n\t\t\t\t\t<tr>\n\t\t\t\t\t\t<td>Address</td>\n\t\t\t\t\t\t<td>534 Erewhon, Pleasantville, Vic, 3999</td>\n\t\t\t\t\t</tr>\n\t\t\t\t\t<tr>\n\t\t\t\t\t\t<td>Contacts</td>\n\t\t\t\t\t\t<td>Home: unknown. Work: (03) 5555 6473</td>\n\t\t\t\t\t</tr>\n\t\t\t\t\t<tr>\n\t\t\t\t\t\t<td>Id</td>\n\t\t\t\t\t\t<td>MRN: 12345 (Acme Healthcare)</td>\n\t\t\t\t\t</tr>\n\t\t\t\t</tbody>\n\t\t\t</table>\n\t\t</div>"
  },
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
  "_birthDate": {
    "extension": [
      {
        "url": "http://hl7.org/fhir/StructureDefinition/patient-birthTime",
        "valueDateTime": "1974-12-25T14:35:45-05:00"
      }
    ]
  },
  "deceasedBoolean": false,
  "address": [
    {
      "use": "home",
      "address1": this.address
      
    }
  ],
      
                  
        
        })
      }
    }
  }
</script>

<style>

</style>
