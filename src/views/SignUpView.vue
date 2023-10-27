<template>
  <v-img src="/gear.jpg" style="height: 120vh; width: 100%">
    <div style="display: flex; justify-content: center; align-items: center">
      <v-card
        elevation="12"
        width="50%"
        style="text-align: center; height: 100vh"
        class="my-3"
      >
        <v-card-title class="headline">Sign Up</v-card-title>
        <v-card-text>
          <v-form @submit.prevent="register">
            <v-text-field v-model="firstName" label="First Name"></v-text-field>
            <v-text-field v-model="lastName" label="Last Name"></v-text-field>
            <v-text-field v-model="nic" label="NIC"></v-text-field>
            <v-text-field v-model="jobTitle" label="Job Title"></v-text-field>
            <v-text-field v-model="email" label="Email"></v-text-field>
            <v-text-field v-model="username" label="Username"></v-text-field>
            <v-text-field
              v-model="password"
              label="Password"
              type="password"
            ></v-text-field>

            <v-container class="pa-2">
              <h4 class="text-left">choose an avatar</h4>
              <v-item-group v-model="selected">
                <v-row>
                  <v-col v-for="(item, i) in items" :key="i" cols="12" md="2">
                    <v-item v-slot="{ active, toggle }">
                      <v-img
                        :src="item"
                        height="100"
                        class="text-right pa-2"
                        @click="toggle"
                      >
                        <v-btn icon dark>
                          <v-icon :color="active ? '#cd84f1' : ''">
                            {{ active ? "mdi-heart" : "mdi-heart-outline" }}
                          </v-icon>
                        </v-btn>
                      </v-img>
                    </v-item>
                  </v-col>
                </v-row>
              </v-item-group>
            </v-container>

            <v-btn color="primary" @click="signup" class="mt-5">Sign Up</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
      <!-- <v-btn color="primary" @click="getData">click me</v-btn> -->

      <v-snackbar
        v-model="message.chip"
        top
        rounded="pill"
        :color="message.color"
        ><div class="text-center">
          {{ message.text }}
        </div>
      </v-snackbar>
    </div>
  </v-img>
</template>
      
      <script>
import api from "@/Services/api.js";

export default {
  name: "SignupView",
  data() {
    return {
      firstName: "",
      lastName: "",
      nic: "",
      jobTitle: "",
      email: "",
      username: "",
      password: "",
      nameRules: [
        (v) => !!v || "Name is required",
        (v) => v.length <= 10 || "Name must be less than 10 characters",
      ],
      message: {
        chip: false,
        text: "",
        color: "",
      },
      items: [
        {
          src: "/animal1.jpg",
        },
        {
          src: "/animal2.jpg",
        },
        {
          src: "/animal3.jpg",
        },
        {
          src: "/animal4.jpg",
        },
      ],
      selected: "",
    };
  },

  methods: {
    // getData(){
    //   console.log("clicked");
    //   api
    //   .get('api/v1/users/getAllUsers?page=0&size=10')
    //   .then(response => {
    //     // Handle the response data here
    //     console.log(response.data);
    //   })
    //   .catch(error => {
    //     // Handle errors here
    //     console.error(error);
    //   });
    //   console.log("clicked 2");
    // },

    signup() {
      let user = {
        userFirstName: this.firstName,
        userLastName: this.lastName,
        nic: this.nic,
        userJobTitle: this.jobTitle,
        userEmail: this.email,
        userName: this.username,
        password: this.password,
        avatar: this.items[this.selected].src,
      };

      console.log("clicked", user);
      console.log(user.avatar);

      api
        .post("api/v1/users/saveUser", user)
        .then((response) => {
          console.log(response.data);
          this.message.chip = true;
          this.message.color = "success";
          this.message.text = "user added succcessfully";
          this.$router.push("/login");
        })
        .catch((error) => {
          console.log(error);
          this.message.chip = true;
          this.message.color = alert;
          this.message.text = "user adding failed";
        });
    },

    // login() {
    //   this.$router.push("/dashboard");
    // },
  },
};
</script>
      
      <style>
</style>