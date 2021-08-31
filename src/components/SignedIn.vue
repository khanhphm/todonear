<template>
  <v-app>
    <v-app-bar app>
      <v-avatar size="70">
        <img
          src="https://near.org/wp-content/themes/near-19/assets/downloads/near_icon_wht.png"
        />
      </v-avatar>
      <h2>Todo App</h2>
      <v-spacer></v-spacer>
      <v-chip @click="logout" color="error">
        Sign Out
      </v-chip>
    </v-app-bar>

    <v-main>
      <v-container class="mt-6 px-8 ">
        <v-card
          v-for="(task, id) in tasks"
          :key="id"
          class="mb-1 "
          color="secondary"
          v-touch="{
            left: () => deleteTask(id),
          }"
          @dblclick="deleteTask(id)"
        >
          <v-card-title class="py-2 pl-6 animate__backOutLeft">
            <span class="text-subtitle-1">
              {{ task }}
            </span>
            <v-spacer></v-spacer>
          </v-card-title>
        </v-card>

        <v-card class="mx-auto" v-if="tasks.length == 0">
          <v-card-text align="center">
            <v-img
              src="https://i.pinimg.com/originals/31/36/cd/3136cd447c99783f59cd1a4c7d9ca9c1.png"
              width="400"
            ></v-img>
            <h2 class="mb-7">Your list is empty</h2>
          </v-card-text>
        </v-card>
      </v-container>
    </v-main>

    <v-snackbar align="center" :color="color" v-model="noti" timeout="3000">
      <span>{{ content }}</span>
    </v-snackbar>

    <v-footer app>
      <v-text-field
        v-model="newTask"
        label="Yours Task"
        @keyup.enter="addTask()"
      >
      </v-text-field>
      <v-btn @click="addTask()" color="info" class="ml-4">Add</v-btn>
    </v-footer>
  </v-app>
</template>

<script>
import { logout } from "../utils";

export default {
  name: "SignedIn",

  beforeMount() {
    if (this.isSignedIn) {
      this.getTask();
    }
  },

  data: function() {
    return {
      color: "",
      content: "",
      noti: false,
      tasks: [],
      newTask: "",
      notificationVisible: false,
    };
  },

  computed: {
    isSignedIn() {
      return window.walletConnection
        ? window.walletConnection.isSignedIn()
        : false;
    },
    accountId() {
      return window.accountId;
    },
    contractId() {
      return window.contract ? window.contract.contractId : null;
    },
    networkId() {
      return window.networkId;
    },
  },

  methods: {
    notiShow(content, color) {
      this.noti = false;
      this.content = content;
      this.color = color;
      this.noti = true;
    },
    getTask() {
      window.contract.getTasks().then((data) => {
        this.tasks = data;
      });
    },

    addTask: async function() {
      if (this.newTask != "") {
        let newTask = this.newTask;
        this.tasks.unshift(this.newTask);
        this.newTask = "";
        try {
          await window.contract.addTask({
            task: newTask,
          });
        } catch (e) {
          this.tasks = this.getTask();
          this.notiShow("Add failed!!", "error");
          throw e;
        }
        //this.tasks = this.getTask();
        this.notiShow("Add complete!!", "success");
      } else {
        this.notiShow("You did not enter content!", "warning");
      }
    },

    deleteTask: async function(id) {
      this.tasks.splice(id, 1);
      try {
        await window.contract.deleteTask({
          task: id,
        });
      } catch (e) {
        this.tasks = this.getTask();
        this.notiShow("Delete failed!!", "error");
        throw e;
      }
      //this.tasks = this.getTask();
      this.notiShow("Delete Completed!!", "success");
    },

    logout: logout,
  },
};
</script>
<style scoped>
.account {
  font-size: 8px;
}
</style>
