<template>
  <v-img src="/gear.jpg" style="height: 100vh; width: 100%">
    <div
      style="
        display: flex;
        justify-content: center;
        align-items: center;
        height: 90vh;
      "
    >
      <v-card
        elevation="12"
        width="40%"
        style="text-align: center; height: 50vh"
        class="pa-3"
      >
        <v-form>
          <h1>Login</h1>
          <br />
          <!-- <v-row>
        <label for="username">Username:</label><v-text-field
              label="user name"
              placeholder="user name"
              solo
              v-model="username"
              required
            ></v-text-field
          > </v-row>
           -->
          <v-row no-gutters justify="center">
            <v-col cols="9">
              <v-text-field
                v-model="username"
                class="form-control"
                label="Username"
                :rules="usernameRules"
                outlined
                dense
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row no-gutters justify="center">
            <v-col cols="9" dense>
              <v-text-field
                v-model="password"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="rules"
                :type="show1 ? 'text' : 'password'"
                label="Password"
                @click:append="show1 = !show1"
                outlined
                dense
                class="form-control"
                v-on:keyup.enter="login()"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row justify="center" class="mt-6">
            <!-- <v-col cols="2"></v-col> -->
            <v-col cols="9">
              <v-btn @click="login()" color="orange" block>LOGIN</v-btn>
            </v-col>
          </v-row>

          <v-row
            class="mt-5"
            style="
              justify-content: center;
              font-size: 0.9rem;
              color: black;
              font-weight: bold;
            "
          >
            <span class="ml-2 mt-2">Don't you have an account?</span>
            &nbsp;
            <v-btn plain color="info" @click="$router.push(`/signup`)"
              >Sign up</v-btn
            >
          </v-row>
        </v-form>
      </v-card>
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
  name: "LoginView",
  data() {
    return {
      username: "",
      password: "",
      usernameRules: [
        (v) => !!v || "Username is Required",
        (v) => v.length <= 15 || "Username must be less than 15 characters",
      ],
      rules: [(v) => !!v || "Password is Required."],
      message: {
        chip: false,
        text: "",
        color: "",
      },
      show1: false,
      jwtToken:"",
    };
  },

  methods: {
    async login() {
      let loginDetails = {
        "username": this.username,
        "password": this.password,
      };
      console.log(loginDetails)

      await api
      .post("api/v1/users/authenticate",loginDetails)
      .then(response=>{
        console.log("login",response)
        if(response.status==200){
          localStorage.setItem('token', response.data.jwtToken);
          sessionStorage.setItem("userName",this.username);

           this.jwtToken = response.data.jwtToken;
           this.getAvatar();
console.log("done")
          
          this.$router.push("/dashboard");
        }
        else{
          this.message.chip=true;
      this.message.color="red";
      this.message.text="login failed"
        }
      })
      .catch(error=>{
        console.log(error)
        this.message.chip=true;
      this.message.color="red";
      this.message.text="something went wrong"
      });
      console.log("22222")
      // this.$router.push("/dashboard");
    },

    async getAvatar(){
      const jwtToken=this.jwtToken;
      console.log(this.username,"heree : ",jwtToken)
      await api
      .get(`api/v1/users/getAvatar/${this.username}`
      , {
    headers: {
      Authorization: `Bearer ${jwtToken}` }}
      )
      .then(response=>{
        console.log("avatar 123:",response);
        sessionStorage.setItem("avatar",response.data.data)
      })
      .catch(error=>{
        sessionStorage.setItem("avatar","/animal1.jpg")
        console.log("error : ",error)
      })

      console.log("3333")
    }
  },
};
</script>
    
    <style>
</style>