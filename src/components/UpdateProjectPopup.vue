<template>
    <div class="text-center">

      <v-dialog v-model="dialog" width="600" persistent> 
        <v-card>
          <v-card-title class="text-h5 grey lighten-2">
            Update Project
            <v-spacer>
          </v-spacer>
          <v-icon @click="closeDialog">mdi-close-circle-outline</v-icon>
          </v-card-title>
  
          <v-card-text>
            <v-form class="px-3" ref="form">
              <v-text-field
                label="Title"
                v-model="title"
                prepend-icon="mdi-format-title"
                :rules="inputRules"
              ></v-text-field>
              <v-textarea
                label="information"
                v-model="info"
                prepend-icon="mdi-information"
                :rules="inputRules"
              ></v-textarea>
  
              <v-menu
                ref="menu"
                v-model="menu"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="startDate"
                    label="Start Date"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                    :rules="inputRules"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="startDate"
                  @input="menu = false"
                  no-title
                  scrollable
                >
                  <v-spacer></v-spacer>
                </v-date-picker>
              </v-menu>
  
              <v-menu
                ref="menu2"
                v-model="menu2"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="dueDate"
                    label="Due Date"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                    :rules="inputRules"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="dueDate"
                  @input="menu2 = false"
                  no-title
                  scrollable
                >
                  <v-spacer></v-spacer>
                </v-date-picker>
              </v-menu>
  
              <v-select
                v-model="selectedTeam"
                :items="team"
                label="team members"
                multiple
                chips
              ></v-select>
  
              <v-divider></v-divider>
              <v-btn
                text
                class="success mt-3 mx-0"
                @click="submit"
                :loading="isLoading"
                >Update Project</v-btn
              >
            </v-form>
          </v-card-text>
        </v-card>
      </v-dialog>
      <v-snackbar v-model="message.chip" top rounded="pill" :color="message.color"
      ><div class="text-center">
        {{ message.text }}
      </div>
    </v-snackbar>
    </div>
  </template>
  
  <script>
  //import format from 'date-fns/format';
  // import db from '@/fb';
  // import { collection, addDoc } from "firebase/firestore";
  import api from "@/Services/api.js";
  
  export default {
    data() {
      return {
        title: this.project.projectName,
        info: this.project.information,
        dueDate: this.project.dueDate,
        startDate: this.project.startingDate,
        projectId : this.project.projectId,
        menu: false,
        menu2: false,
  
        inputRules: [(v) => (v && v.length >= 0) || "empty field"],
        isLoading: false,
        dialog: true,
        users: null,
        team: [],
        selectedTeam: [],
        message: {
        chip: false,
        text: "",
        color: "",
      },
      jwtToken: localStorage.getItem('token'),
      };
    },
    
    props:["project"],
 
  
    methods: {

        closeDialog(){
        this.$emit("closeDialog")
    },

      async submit() {
        console.log("sdate", this.selectedTeam);
        if (this.$refs.form.validate()) {
          this.isLoading = true;
  
          const project = {
            projectId : this.projectId,
            projectName: this.title,
            startingDate: this.startDate,
            dueDate: this.dueDate,
            createdBy: sessionStorage.getItem("userName"),
            teamMembers: this.selectedTeam.toString(),
            information: this.info,
          };
  
          api
            .put("api/v1/projects/updateProject", project
            , {
    headers: {
      Authorization: `Bearer ${this.jwtToken}` }})
            .then((response) => {
              console.log(response.data);
              this.isLoading = false;
              this.dialog = false;
              this.message.chip = true;
            this.message.color = "green";
            this.message.text = "project updated";
              this.$emit("projectUpdated");
            })
            .catch((error) => {
              console.log(error);
            this.message.chip = true;
            this.message.color = "alert";
            this.message.text = "updating task failed";
            });
  
          this.$refs.form.reset();
        }
      },
  
      getTeam() {
        api
          .get("api/v1/users/getAllUsers", {
    headers: {
      Authorization: `Bearer ${this.jwtToken}` }})
          .then((response) => {
            this.users = response.data.data;
            console.log(response.data.data);
  
            this.users.forEach((user) => {
              this.team.push({ text: user.userFirstName, id: user.userId });
              //this.team[user.userId]=user.userFirstName;
            });
            console.log("team", this.team);
          })
          .catch((error) => {
            console.log(error);
          });
      },
    },


  
    mounted() {
      this.getTeam();
      console.log("update",this.project)
    this.selectedTeam=this.project.teamMembers.split(",");
   
    },
  };
  </script>
  
  <style>
  </style>