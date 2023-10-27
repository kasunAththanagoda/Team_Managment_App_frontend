<template>
  <div class="myTasks">
    <NavBar></NavBar>
    <h1 class="subheading grey--text ma-10">My Tasks</h1>

    <v-container class="my-5">
      <v-expansion-panels>
        <v-expansion-panel v-for="project in projects" :key="project.taskId">
          <v-expansion-panel-header class="py-1">
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
                    <v-chip
                      :class="`${project.status} white--text caption my-2`"
                      >{{ project.status }}</v-chip
                    >
                  </div>
                </v-col>
              </v-row>
            </div>
          </v-expansion-panel-header>
          <v-expansion-panel-content class="px-4 grey--text">
            <v-row>
              <v-col cols="12" md="9">
                <div class="font-weight-bold">Due by {{ project.due }}</div>
                <div>{{ project.content }}</div>
              </v-col>
              <v-col cols="12" md="3">
                <v-switch
                  v-model="switchState"
                  label="Mark as Completed"
                  color="success"
                  hide-details
                  @change="toggleTaskStatus(project.taskId, switchState)"
                ></v-switch>
              </v-col>
            </v-row>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-container>
    <v-snackbar v-model="message.chip" top rounded="pill" :color="message.color"
      ><div class="text-center">
        {{ message.text }}
      </div>
    </v-snackbar>
  </div>
</template>

<script>
// import db from "@/fb";
// import { collection, onSnapshot } from "firebase/firestore";
import api from "@/Services/api.js";
import { parse, isPast } from "date-fns";
import NavBar from "@/components/NavBar.vue";

export default {
  components: {
    NavBar,
  },
  data() {
    return {
      projects: [],
      username: sessionStorage.getItem("userName"),
      switchState: false,
      message: {
        chip: false,
        text: "",
        color: "",
      },
      jwtToken: localStorage.getItem("token"),
    };
  },
  methods: {
    getTasks() {
      console.log("username", this.username ,this.jwtToken);
      api
        .get(
          "api/v1/tasks/getTasksByUser",
          {
            params: {
              user: this.username,
              activeStatus: true,
            },
            headers: {
            Authorization: `Bearer ${this.jwtToken}`,
          },
          },
          
        )
        .then((result) => {
          console.log("results", result);
          result.data.data.forEach((element) => {
            let statuss = "";
            if (element.activeStatus) {
              //1-ongoing
              const parsedDate = parse(
                element.dueDate,
                "dd/MM/yyyy",
                new Date()
              );
              const isOverdue = isPast(parsedDate);
              //correct this
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
              activeStatus: element.activeStatus,
              content: element.content,
            });
          });
          console.table(this.projects);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    toggleTaskStatus(taskId, switchState) {
      console.log(taskId, switchState);
      api
        .put(`api/v1/tasks/switchActiveStatus?taskId=${taskId}`, {
          headers: {
            Authorization: `Bearer ${this.jwtToken}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          console.log(`Task ${taskId} activeStatus updated to ${switchState}`);
          this.message.chip = true;
          this.message.text = "task status changed";
          this.message.color = "green";
        })
        .catch((error) => {
          this.message.chip = true;
          this.message.text = "changing task status failed";
          this.message.color = "red";
          console.error("Error updating task status:", error);
        });
    },
  },
  computed: {},
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