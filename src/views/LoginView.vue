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
      <!-- <v-form > -->
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
        <button @click="login">Login</button>
        <br />
        <!-- <button
          @click="this.$router.push('/signup')"
        >
          Signup
        </button> -->
      <!-- </v-form> -->
    </v-card>
    <v-snackbar v-model="message.chip" top rounded="pill" :color="message.color"
      ><div class="text-center">
        {{ message.text }}
      </div>
    </v-snackbar>
  </div>
</template>
    
    <script>
import api from "@/Services/api.js";

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
      message: {
        chip: false,
        text: "",
        color: "",
      },
    };
  },

  methods: {
    login() {
      let loginDetails = {
        "userName": this.username,
        "password": this.password,
      };
      console.log(loginDetails)

      api
      .post("api/v1/users/login",loginDetails)
      .then(response=>{
        console.log(response.data)
        if(response.data.code==200){
          sessionStorage.setItem("userName",this.username)
          this.$router.push("/dashboard");
        }
        else{
          this.message.chip=true;
      this.message.color="alert";
      this.message.text="login failed"
        }
      })
      .catch(error=>{
        console.log(error)
        this.message.chip=true;
      this.message.color="alert";
      this.message.text="something went wrong"
      });
      console.log("22222")
      // this.$router.push("/dashboard");
    },
  },
};
</script>
    
    <style>
</style>