<template>
  <div class="dashboard">
    <h1 class="subheading grey--text">Dashboard</h1>
    <v-container class="my-5">
      <v-row class="mb-3">
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
      </v-row>

      <v-card text v-for="project in projects" :key="project.title" class="mt-1">
        <div :class="`pa-3 project ${project.status}`" >
          <v-row>
            <v-col cols="12" md="6">
              <div class="caption grey--text">Project title</div>
              <div>{{ project.title }}</div>
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
import db from "@/fb";
import { collection, onSnapshot } from "firebase/firestore"; 

export default {
  name: "DashboardView",

  components: {},
  data() {
    return {
      // projects: [
      //   {
      //     title: "Design a new website",
      //     person: "Kasun",
      //     due: "1st Jan 2019",
      //     status: "ongoing",
      //     content:
      //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt consequuntur eos eligendi illum minima adipisci deleniti, dicta mollitia enim explicabo fugiat quidem ducimus praesentium voluptates porro molestias non sequi animi!",
      //   },
      //   {
      //     title: "Code up the homepage",
      //     person: "Chun Li",
      //     due: "10th Jan 2019",
      //     status: "complete",
      //     content:
      //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt consequuntur eos eligendi illum minima adipisci deleniti, dicta mollitia enim explicabo fugiat quidem ducimus praesentium voluptates porro molestias non sequi animi!",
      //   },
      //   {
      //     title: "Design video thumbnails",
      //     person: "Ryu",
      //     due: "20th Dec 2018",
      //     status: "complete",
      //     content:
      //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt consequuntur eos eligendi illum minima adipisci deleniti, dicta mollitia enim explicabo fugiat quidem ducimus praesentium voluptates porro molestias non sequi animi!",
      //   },
      //   {
      //     title: "Create a community forum",
      //     person: "Gouken",
      //     due: "20th Oct 2018",
      //     status: "overdue",
      //     content:
      //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt consequuntur eos eligendi illum minima adipisci deleniti, dicta mollitia enim explicabo fugiat quidem ducimus praesentium voluptates porro molestias non sequi animi!",
      //   },
      // ],

      projects :[],
    };
  },

  methods: {
    sortBy(property) {
      this.projects.sort((a, b) => (a[property] < b[property] ? -1 : 1));
    },
  },

  async created(){
    // db.collection('projects').onSnapshot(res=>{
    //   const changes=res.docChanges();

    //   changes.forEach(change => {
    //     if(change.type=='added'){
    //       this.projects.push({
    //         ...change.doc.data(),
    //         id : change.doc.id
    //       })
    //     }
        
    //   });
    // })

    onSnapshot(collection(db, "projects"), docsSnap => {
      const changes=docsSnap.docChanges();

      changes.forEach(change=>{
        if(change.type=== 'added'){
          this.projects.push(
            {
              ...change.doc.data(),
              id : change.doc.id
            }
          )
        }
      });


});


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
