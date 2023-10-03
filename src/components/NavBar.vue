<template>
  <nav>
    <v-snackbar
      v-model="snackbar"
      top
      color="success"
      rounded="pill"
      timeout="1500"
    >
      <span class="mr-8">Project added successfully!!</span>
      <v-btn text @click="snackbar = false">close</v-btn>
    </v-snackbar>

    <v-toolbar text>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="text-uppercase grey--text">
        <span class="font-weight-light">Team Manager</span>
        <span>App</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <div class="text-center">
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn text color="grey " v-bind="attrs" v-on="on">
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

      <v-btn text class="grey--text" @click="openSignout">
        <span>sign out</span>
        <v-icon right>mdi-exit-to-app</v-icon>
      </v-btn>
    </v-toolbar>

    <v-navigation-drawer v-model="drawer" color="#6F61C0" temporary app>
      <v-row align-center>
        <v-col>
          <v-avatar size="100" class="ma-10 "
            ><img :src="avatar" alt="avatar image"
          /></v-avatar>
          <p class="white--text subheading mt-1 mx-5">{{ user }}</p>
        </v-col>
      </v-row>
      <v-row class="ma-5">
        <PopUp
          @projectAdded="
            snackbar = true;
            drawer = false;
          "
        ></PopUp>
      </v-row>
      <v-list>
        <v-list-item
          v-for="link in links"
          :key="link.text"
          router
          :to="link.route"
        >
          <v-list-item-action>
            <v-icon class="white--text">{{ link.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="white--text">{{
              link.text
            }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-dialog v-model="showSignOutDialog" max-width="500px">
      <v-card>
        <v-card-title>Sign Out</v-card-title>
        <v-card-text>
          Are you sure you want to sign out?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="confirmSignout" class="ma-2" >Yes</v-btn>
          <v-btn color="error" @click="showSignOutDialog = false" class="ma-2">No</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </nav>
</template>

<script>
import PopUp from "./PopUp.vue";

export default {
  components: { PopUp },
  data() {
    return {
      drawer: false,
      user: "",
      links: [
        { icon: "mdi-view-dashboard", text: "Dashboard", route: "/dashboard" },
        { icon: "mdi-folder", text: "My Tasks", route: "/myTasks" },
        { icon: "mdi-rhombus-split", text: "Projects", route: "/projects" },
        { icon: "mdi-account", text: "Team", route: "/team" },
      ],
      snackbar: false,
      showSignOutDialog: false,
      avatar: sessionStorage.getItem("avatar")
    };
  },

  methods:{
    openSignout(){
      this.showSignOutDialog=true;
    },
    confirmSignout(){
    sessionStorage.clear();
    this.$router.push("/");
    this.showSignOutDialog=false;
  },
  },
 


  mounted() {
    if (sessionStorage.getItem("userName"))
      this.user = sessionStorage.getItem("userName");
  },
};
</script>

<style></style>
