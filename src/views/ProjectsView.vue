<template>
  <div class="projects">
    <NavBar></NavBar>
    <h1 class="subheading grey--text ma-10" >Projects</h1>
    <v-container class="my-5">
      <v-data-table
        :headers="headers"
        :items="projects"
        :items-per-page="5"
        class="elevation-3"
        show-expand
        item-key="projectName"
        
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Project's Details</v-toolbar-title>
            <v-spacer></v-spacer>
            <PopUp @projectAdded="projectAdded"></PopUp>

            <v-dialog v-model="dialogDelete" max-width="550px">
              <v-card>
                <v-card-title class="text-h5"
                  >Are you sure you want to delete this project?</v-card-title
                >
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="green darken-1"
                    text
                    @click="
                      dialogDelete = false;
                      selectedProject = null;
                    "
                    >Cancel</v-btn
                  >
                  <v-btn color="red darken-1" text @click="deleteItemConfirm()"
                    >OK</v-btn
                  >
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>

        <template v-slot:[`item.actions`]="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">
            mdi-pencil
          </v-icon>

          <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
        </template>

        <template v-slot:[`item.activeStatus`]="{ item }">
          <v-chip :color="getColor(item.status)">
            {{ item.status }}
          </v-chip>
        </template>
        <template v-slot:expanded-item="{ headers, item }">
          <td :colspan="headers.length">
            Description ::
            {{ item.information }}
          </td>
        </template>
      </v-data-table>
    </v-container>

    <v-snackbar v-model="message.chip" top rounded="pill" :color="message.color"
      ><div class="text-center">
        {{ message.text }}
      </div>
    </v-snackbar>

    <UpdateProjectPopupVue
      v-if="showUpdate"
      :project="selectedProject"
      @closeDialog="showUpdate = false"
      @projectUpdated="renew"
    ></UpdateProjectPopupVue>
  </div>
</template>
  
  <script>
import PopUp from "@/components/PopUp.vue";
import UpdateProjectPopupVue from "@/components/UpdateProjectPopup.vue";
import NavBar from "@/components/NavBar.vue";

import api from "@/Services/api.js";
import { parse, isPast } from "date-fns";

export default {
  name: "ProjectsView",

  components: { PopUp, UpdateProjectPopupVue,NavBar },

  data() {
    return {
      headers: [
        { text: "Project Name", align: "start", value: "projectName" },
        { text: "Starting Date", value: "startingDate" },
        { text: "Due Date", value: "dueDate" },
        { text: "Creadted By", value: "createdBy" },
        { text: "Team", value: "teamMembers" },
        // { text: "Description", value: "information" },
        { text: "Status", value: "activeStatus" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      projects: [],
      showUpdate: false,
      dialogDelete: false,
      selectedProject: null,
      message: {
        chip: false,
        text: "",
        color: "",
        expanded: [],
        username: sessionStorage.getItem("userName"),
      },
    };
  },

  methods: {
    getColor(status) {
      if (status == "complete") {
        return "#3cd1c2";
      } else if (status == "ongoing") {
        return "orange";
      } else {
        return "red";
      }
    },

    deleteItem(item) {
      console.log("deleting item : ", item);
      this.selectedProject = item;
      // this.editedIndex = this.desserts.indexOf(item)
      // this.editedItem = Object.assign({}, item)
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      console.log("SDfsdf", this.selectedProject.projectId);
      api
        .delete(
          `api/v1/projects/deleteProject?projectId=${this.selectedProject.projectId}`
        )
        .then((result) => {
          console.log("deleted", result.data);
          this.dialogDelete = false;
          this.getProjects();
          this.message.chip = true;
          this.message.color = "green";
          this.message.text = "Project deleted successfully!!";
        })
        .catch((error) => {
          console.log("error", error);
          this.dialogDelete = false;
          this.message.chip = true;
          this.message.color = "red";
          this.message.text = "Project delete failed!!";
        });
    },

    editItem(item) {
      console.log(item);
      this.selectedProject = item;
      this.showUpdate = true;
    },

    projectAdded() {
      // this.snackbar = true;
      this.message.chip = true;
      this.message.color = "green";
      this.message.text = "Project added successfully!!";
      this.getProjects();
    },

    renew() {
      this.selectedProject = null;
      this.showUpdate = false;
      this.getProjects();
    },

    getProjects() {
      api
        .get("api/v1/projects/getProjects")
        .then((response) => {
          console.log("projects:: ", response.data.data);

          this.projects = response.data.data;
          this.projects.forEach((element) => {
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
            element.status = statuss;
          });

          this.projects.sort((a, b) => {
            const statusOrder = { overdue: 1, ongoing: 2, complete: 3 };
            return statusOrder[a.status] - statusOrder[b.status];
          });
          console.log(":::::::", this.projects);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },

  async created() {
    //   this.getTasks();
    this.getProjects();
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
  