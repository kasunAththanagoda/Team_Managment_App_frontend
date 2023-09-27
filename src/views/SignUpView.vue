<template>
  <div
    style="
      display: flex;
      justify-content: center;
      align-items: center;
      height: 80vh;
    "
  >
    <v-card elevation="12" width="50%" style="text-align: center; height: 80vh">
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
          <v-btn color="primary"  @click="signup">Sign Up</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
    <v-btn color="primary" @click="getData">click me</v-btn>
    
    <v-snackbar v-model="message.chip" top rounded="pill" :color="message.color"
      ><div class="text-center">
        {{ message.text }}
      </div>
    </v-snackbar>
  </div>
</template>
      
      <script>
 import api from '@/Services/api.js'

export default {
  name: "SignupView",
  data() {
    return {
      firstName :"",
      lastName: "",
      nic : "",
      jobTitle : "",
      email : "",
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
    };
  },

  methods: {
    getData(){
      console.log("clicked");
      api
      .get('api/v1/users/getAllUsers?page=0&size=10')
      .then(response => {
        // Handle the response data here
        console.log(response.data);
      })
      .catch(error => {
        // Handle errors here
        console.error(error);
      });
      console.log("clicked 2");
    },

signup(){
  let user={
  "userFirstName": this.firstName,
  "userLastName": this.lastName,
  "nic": this.nic,
  "userJobTitle": this.jobTitle,
  "userEmail": this.email,
  "userName": this.username,
  "password": this.password
  }

  console.log("clicked",user)

  api
    .post("api/v1/users/saveUser",user)
    .then(response=>{
      console.log(response.data)
      this.message.chip=true;
      this.message.color="success";
      this.message.text="user added succcessfully"
      this.$router.push("/dashboard");
    })
    .catch(error=>{
      console.log(error)
      this.message.chip=true;
      this.message.color=alert;
      this.message.text="user adding failed"
    })
},

    // login() {
    //   this.$router.push("/dashboard");
    // },
  },
};
</script>
      
      <style>
</style>