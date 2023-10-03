<template>
  <div>
    <v-dialog v-model="dialog" width="600" persistent>
      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          Add new Task
          <v-spacer> </v-spacer>
          <v-icon @click="closeDialog">mdi-close-circle-outline</v-icon>
        </v-card-title>

        <v-card-text>
          <v-form class="px-3" ref="form">
            <v-text-field
              label="Task Title"
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
              label="Assign to"
            ></v-select>

            <v-select
              v-model="selectedProject"
              :items="projects"
              label="Related Project"
            ></v-select>

            <v-divider></v-divider>
            <v-btn
              text
              class="success mt-3 mx-0"
              @click="addTask"
              :loading="isLoading"
              >Add Task</v-btn
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
import api from "@/Services/api.js";

export default {
  //   props: {
  //     openDialog: Boolean,
  //   },
  data() {
    return {
      title: "",
      info: "",
      dueDate: "",
      startDate: "",
      menu: false,
      menu2: false,
      dialog: true,
      inputRules: [(v) => (v && v.length >= 0) || "empty field"],
      isLoading: false,
      users: null,
      team: [],
      selectedTeam: [],
      projects: [],
      selectedProject: "",
      message: {
        chip: false,
        text: "",
        color: "",
      },
    };
  },

  methods: {
    async addTask() {
      console.log("sdate", this.selectedTeam);
      if (this.$refs.form.validate()) {
        this.isLoading = true;

        const task = {
          project: this.selectedProject,
          title: this.title,
          createdDate: this.startDate, //start date
          dueDate: this.dueDate,
          createdBy: sessionStorage.getItem("userName"),
          assignedTo: this.selectedTeam,
          content: this.info,
          activeStatus: true,
        };

        // console.log(project);
        console.table(task);

        api
          .post("api/v1/tasks/addTask", task)
          .then((response) => {
            console.log(response.data);
            this.isLoading = false;
            this.dialog = false;
            this.message.chip = true;
            this.message.color = "green";
            this.message.text = "task added";
            this.$emit("taskAdded");
          })
          .catch((error) => {
            console.log(error);
            this.isLoading = false;
            this.dialog = false;
            this.message.chip = true;
            this.message.color = "alert";
            this.message.text = "adding task failed";
          });

        this.$refs.form.reset();
      }
    },

    getTeam() {
      api
        .get("api/v1/users/getAllUsers")
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

    getProjects() {
      api
        .get("api/v1/projects/getProjects")
        .then((response) => {
          console.log("projects:: ", response.data.data);
          response.data.data.forEach((project) => {
            this.projects.push({
              text: project.projectName,
              value: project.projectId,
            });
          });
          console.log(":::::::", this.projects);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    closeDialog() {
      this.$emit("closeDialog");
    },
  },

  mounted() {
    console.log("created", this.openDialog);
    this.getTeam();
    this.getProjects();
  },
};
</script>
  
  <style>
</style>