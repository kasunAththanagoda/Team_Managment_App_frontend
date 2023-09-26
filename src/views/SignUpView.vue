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
          <v-text-field v-model="email" label="Email"></v-text-field>
          <v-text-field v-model="jobTitle" label="Job Title"></v-text-field>
          <v-text-field v-model="username" label="Username"></v-text-field>
          <v-text-field
            v-model="password"
            label="Password"
            type="password"
          ></v-text-field>
          <v-btn color="primary" type="submit">Sign Up</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>
      
      <script>
// import axios from "axios";

export default {
  name: "SignupView",
  data() {
    return {
      username: "",
      password: "",
      nameRules: [
        (v) => !!v || "Name is required",
        (v) => v.length <= 10 || "Name must be less than 10 characters",
      ],
    };
  },

  methods: {
    login() {
      this.$router.push("/dashboard");
    },
  },
};
</script>
      
      <style>
</style>