<template>
  <div
    style="
      display: flex;
      justify-content: center;
      align-items: center;
      height: 80vh;
    "
  >
    <v-card elevation="12" width="50%" style="text-align: center; height: 50vh">
      <v-form v-model="valid">
        <h1>Login</h1>
        <br />
        <v-row>
          <v-col><label for="username">Username:</label></v-col>
          <v-col
            ><v-text-field
              label="user name"
              placeholder="user name"
              solo
              v-model="username"
              required
            ></v-text-field
          ></v-col>
        </v-row>
        <v-row>
          <v-col><label for="password">Password:</label></v-col>
          <v-col>
            <!-- <input type="password" id="password" v-model="password"/> -->
            <v-text-field
              label="password"
              placeholder="password"
              solo
              v-model="password"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <br />
        <button @click="login" on-click="login">Login</button>
        <br />
        <button
          @click="signup"
          :to="this.$router.push('/signup')"
          on-click="signup"
        >
          Signup
        </button>
      </v-form>
    </v-card>
  </div>
</template>
    
    <script>
// import axios from "axios";

export default {
  name: "LoginView",
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