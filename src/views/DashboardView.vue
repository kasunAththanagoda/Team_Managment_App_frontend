<template>
  <div class="dashboard">
    <NavBar></NavBar>
    <h1 class="subheading grey--text ma-10">Dashboard - All Tasks</h1>
    <v-container class="my-5">
      <v-row class="mb-3">
        <v-col cols="10">
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                small
                color="grey "
                @click="sortBy('title')"
                class="mx-5"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon small left>mdi-folder</v-icon>
                <span class="caption text-lowecase">By project name</span>
              </v-btn>
            </template>
            <span>order by the project name</span>
          </v-tooltip>

          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                small
                color="grey "
                @click="sortBy('person')"
                class="mx-5"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon small left>mdi-account</v-icon>
                <span class="caption text-lowecase">By person</span>
              </v-btn>
            </template>
            <span>order by the person name</span>
          </v-tooltip>
        </v-col>
        <v-col>
          <v-btn @click="openAddTask" color="#55efc4">Add Tasks</v-btn>
          <AddTasksPopup
            v-if="openDialogs"
            @taskAdded="renew"
            @closeDialog="openDialogs = false"
          ></AddTasksPopup>
        </v-col>
      </v-row>

      <v-card
        text
        v-for="project in projects"
        :key="project.taskId"
        class="mt-2"
      >
        <div :class="`pa-3 project ${project.status}`">
          <v-row>
            <v-col cols="6" md="3">
              <div class="caption grey--text">Project title</div>
              <div>{{ project.title }}</div>
            </v-col>
            <v-col cols="6" md="3">
              <div class="caption grey--text">Task title</div>
              <div>{{ project.task }}</div>
            </v-col>

            <v-col cols="6" sm="4" md="2">
              <div class="caption grey--text">Person</div>
              <div>{{ project.person }}</div>
            </v-col>

            <v-col cols="6" sm="4" md="2">
              <div class="caption grey--text">Due by</div>
              <div>{{ project.due }}</div>
            </v-col>

            <v-col cols="4" sm="4" md="2">
              <div class="caption grey--text">
                <v-chip :class="`${project.status} white--text caption my-2`">{{
                  project.status
                }}</v-chip>
              </div>
            </v-col>
          </v-row>
        </div>
        <v-divider></v-divider>
      </v-card>
    </v-container>
  </div>
</template>

<script>
// import db from "@/fb";
// import { collection, onSnapshot } from "firebase/firestore";
import api from "@/Services/api.js";
import { parse, isPast } from "date-fns";
import AddTasksPopup from "@/components/AddTasksPopup.vue";
import NavBar from "@/components/NavBar.vue";

export default {
  name: "DashboardView",

  components: { AddTasksPopup, NavBar },
  data() {
    return {
      projects: [],
      openDialogs: false,
      username: sessionStorage.getItem("userName"),
      jwtToken: localStorage.getItem('token'),
    };
  },

  methods: {
    sortBy(property) {
      this.projects.sort((a, b) => (a[property] < b[property] ? -1 : 1));
    },

    openAddTask() {
      console.log("clicked");
      this.openDialogs = true;
      console.log(this.openDialogs);
    },

    getTasks() {
      api
        .get("api/v1/tasks/getTasks", {
    headers: {
      Authorization: `Bearer ${this.jwtToken}` }})
        .then((result) => {
          console.log("results", result);
          result.data.data.forEach((element) => {
            console.log("statussssss", element.activeStatus);
            let statuss = "";
            if (element.activeStatus) {
              //1-ongoing
              const parsedDate = parse(
                element.dueDate,
                "dd/MM/yyyy",
                new Date()
              );
              const isOverdue = isPast(parsedDate);
              console.log(
                element.dueDate,
                "111111111",
                element.activeStatus,
                "22222",
                isOverdue
              ); //correct this
              statuss = isOverdue ? "overdue" : "ongoing";
            } else {
              statuss = "complete";
            }
            this.projects.push({
              taskId: element.taskId,
              title: element.project.projectName,
              task: element.title,
              person: element.assignedTo,
              due: element.dueDate,
              status: statuss,
              content: element.content,
            });
          });
          console.table(this.projects);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    renew() {
      this.getTasks();
      this.openDialogs = false;
    },
  },

  async created() {
    this.getTasks();
  },
};
</script>

<style scoped>
.project.complete {
  border-left: 4px solid #3cd1c2;
}
.project.ongoing {
  border-left: 4px solid orange;
}
.project.overdue {
  border-left: 4px solid tomato;
}
.v-chip.complete {
  background: #3cd1c2;
}

.v-chip.ongoing {
  background: orange;
}

.v-chip.overdue {
  background: tomato;
}
</style>
