<template>
    <div class="team">
      <h1 class="subheading grey--text">Team</h1>
  
      <v-container class="my-5">
  
        <v-row>
          <v-col cols=12 sm=6 md=4 lg=3 v-for="person in team" :key="person.name" >
            <v-card text class="ma-3 pb-2 text-center" >
              <v-responsive class="pt-4">
                <v-avatar size="100" class="grey mx-5 pa-5"><img :src="person.avatar" alt="person avatar"></v-avatar>
              </v-responsive>
              <v-card-text>
                <div class="subheading">{{ person.name }}</div>
                <div class="grey--text">{{ person.role }}</div>
              </v-card-text>
              <v-card-actions class="text-center">
                <v-btn text color="grey">
                  <v-icon small left>mdi-message-arrow-right</v-icon>
                  <span class="">Message</span>
                </v-btn>
              </v-card-actions>

            </v-card>
          </v-col>
        </v-row>
  
      </v-container>
      
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        team: [
          { name: 'Kasun', role: 'Web developer',avatar: "/img 1.jpg"},
          { name: 'Ryu', role: 'Graphic designer',avatar: "/img 2.jpg" },
          { name: 'Chun Li', role: 'Web developer',avatar: "/img 3.jpg" },
          { name: 'Gouken', role: 'Social media maverick',avatar: "/img 4.jpg" },
          { name: 'Yoshi', role: 'Sales guru',avatar: "/img 5.jpg"}
        ]
      }
    }
  }
  </script>

  <style scoped>

  .centered-card {
    display: flex;
    justify-content: center;
    align-items: center;
  }

</style>