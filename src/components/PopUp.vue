<template>
   <div class="text-center"> 
    <v-dialog
      v-model="dialog"
      width="600"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn

          color="success"
          tile
          v-bind="attrs"
          v-on="on"
        >
          Add new project
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          Add New Project
        </v-card-title>

        <v-card-text>
          <v-form class="px-3" ref="form">
            <v-text-field label="Title" v-model="title" prepend-icon="mdi-format-title" :rules="inputRules"></v-text-field>
            <v-textarea label="information" v-model="info" prepend-icon="mdi-information" :rules="inputRules"></v-textarea>
            
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
            v-model="date"
            label="Due Date"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
            :rules="inputRules"
            
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="date"
          @input="menu = false"
          no-title
          scrollable
        >
          <v-spacer></v-spacer>
          <!-- <v-btn
            text
            color="primary"
            @click="menu = false"
          >
            Cancel
          </v-btn>
          <v-btn
            text
            color="primary"
            @click="$refs.menu.save(date)"
          >
            OK
          </v-btn> -->
        </v-date-picker>
      </v-menu>

            <v-divider></v-divider>
            <v-btn text class="success mt-3 mx-0" @click="submit" :loading="isLoading">Add Project</v-btn>
          </v-form>
        </v-card-text>

        

        
      </v-card>
    </v-dialog>
  </div> 
</template>

<script>
//import format from 'date-fns/format';
import db from '@/fb';
import { collection, addDoc } from "firebase/firestore"; 

export default {
    data(){
        return{
            title:'',
            info:'',
            date:'',
            menu: false,

            inputRules:[
                v => v && v.length >= 0 || "empty field"
            ],
            isLoading :false,
            dialog :false,
        }
    },

    methods:{
        async submit(){
            if(this.$refs.form.validate()){
              this.isLoading=true;
                console.log(this.title, this.info)

                const project = { 
          title: this.title,
          content: this.info,
          due: this.date,
          person: 'Kasun',
          status: 'ongoing'
        }


          await addDoc(collection(db, "projects"), project)
        .then(() => { 
          console.log('added to db');
          this.isLoading=false;
          this.dialog=false;
          this.$emit("projectAdded");
         })
         .catch((error)=>{
          console.log(error)
         }      
         );  
         
         this.$refs.form.reset();
            }
        }
    },
    
    // computed:{
    //   computedDate(){
    //     console.log('111',this.date)
    //     let abc=(this.data)? 'jj':'kk';
    //     console.log(abc)
    //     return (this.data)? format(this.date,'Do MMM YYYY'):'';
    //   },
    // },

}
</script>

<style>

</style>