<template>
  <v-container>
    <v-card elevation="0">
      <v-card-text>
        <v-layout
                text-xs-center
                wrap
        >
          <v-btn class="mx-2" color="info" block @click="$router.push({name:'patients'})">View Patients</v-btn> 
          <v-btn class="mx-2" color="info" block @click="$router.push({name:'observations'})">View Observations</v-btn>
        </v-layout>
      </v-card-text>
    </v-card>

  </v-container>
</template>

<script>
  export default {
    data: () => ({

    })
  }
</script>

<style>

</style>
