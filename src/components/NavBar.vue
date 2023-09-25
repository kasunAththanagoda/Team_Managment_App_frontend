<template>
  <nav>

    <v-snackbar v-model="snackbar" top color="success" rounded="pill" timeout="1500">
      <span class="mr-8">Project added successfully!!</span>
      <v-btn text @click="snackbar=false">close</v-btn>
    </v-snackbar>


    <v-toolbar text  >
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="text-uppercase grey--text">
        <span class="font-weight-light">Todo</span>
        <span>App</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>

     
  <div class="text-center">
    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
        text
          color="grey "
          v-bind="attrs"
          v-on="on"
        >
         <v-icon left>mdi-chevron-down</v-icon>
         <span>Menu</span>
        </v-btn>
      </template>
      <v-list>
        <v-list-item
        v-for="link in links" 
        :key="link.text"
        route
        :to="link.route"
        >
          <v-list-item-title>{{ link.text }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>


      <v-btn  text class="grey--text">
        <span>sign out</span>
        <v-icon right>mdi-exit-to-app</v-icon>
      </v-btn>
    </v-toolbar>

    <v-navigation-drawer v-model="drawer" color="#6F61C0" temporary app>
      <v-row align-center>
      <v-col >
        <v-avatar size="100" class="ma-5"><img src="/img 1.jpg" alt="avatar image"></v-avatar>
        <p class="white--text subheading mt-1 mx-5">Kasun</p>
      </v-col>
    </v-row>
    <v-row class="ma-5">
      <PopUp  @projectAdded="snackbar=true; drawer=false;"></PopUp>
    </v-row>
      <v-list>
        <v-list-item v-for="link in links" :key="link.text" router :to="link.route">
            <v-list-item-action>
                <v-icon class="white--text">{{ link.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
                <v-list-item-title class="white--text ">{{ link.text }}</v-list-item-title>
            </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
import PopUp from './PopUp.vue';


export default {
  components: {PopUp},
  data() {
    return {
      drawer: false,
      links:[
        {icon:'mdi-view-dashboard',text:'Dashboard',route:'/'},
        {icon:'mdi-folder',text:'My projects',route:'/projects'},
        {icon:'mdi-account',text:'Team',route:'/team'}
    ],
    snackbar :false,
    };
  },
};
</script>

<style></style>
