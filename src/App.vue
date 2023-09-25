<template>
  <v-app >
   
  
    <v-main class="grey lighten-4">
      <NavBar></NavBar>
      <v-main class="mx-4 mb-4 mt-6">
        <router-view/>
      </v-main>
      
    </v-main>
  </v-app>
</template>

<script>
import NavBar from './components/NavBar.vue';

export default {
  name: 'App',

  data: () => ({
    //
  }),

  components:{
     NavBar
  }
};
</script>
