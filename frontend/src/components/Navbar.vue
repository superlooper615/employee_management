<template>
<nav>
    <v-app-bar
      color="primary"
      dense
      dark
    >
      <v-toolbar-title>
      <router-link to="/" tag="span" style="cursor: pointer">
        <h1><span class="font-weight-light">WORK</span><span class="font-weight-regular grey--text text--darken-4">SCHEDULE</span></h1>     
      </router-link>
      </v-toolbar-title>
    </v-app-bar> 
</nav>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  data() {
    return {
      appTitle: 'Work Schedule',
      sidebar: false,
      drawer: false,
      group: null,
      menuItems: [
          { title: 'Home', path: '/', icon: 'mdi-home'},
          { title: 'Boat', path: '/boat', icon:'mdi-sail-boat'},
          { title: 'Employee', path: '/employee', icon:'mdi-human-queue'},
          { title: 'Schedule', path: '/schedule', icon: 'mdi-calendar'},
          { title: 'Vacation Report', path: '/VacationReport', icon: 'mdi-tooltip-text-outline'},
          { title: 'Schedule Report', path: '/SchedReport1', icon: 'mdi-tooltip-text-outline'},
          { title: 'Boat Status Report', path: '/BoatStatusReport', icon: 'mdi-tooltip-text-outline'},
          { title: 'BoatManager', path: '/boatmanager', icon:'mdi-sail-boat'},
     ],
    }
  },

  // methods: {
  //   loginClicked() {
  //     this.$router.push('/user');
  //   },
  // },
  computed: {
    nameOfUser() {
      return this.$store.getters['authStore/getFirstName'];
    },
    ...mapGetters({
      isLoggedIn: 'authStore/getIsLoggedIn',
    }),
  },
  methods: {
    async logoutClicked() {
    try {
        console.log("test");
        const data = await this.$store.dispatch('authStore/logout');

      console.log("success");
      this.$router.push('/');
    } catch (err) {
      console.log(err, "fail here");
      }
    }
  },
}
</script>

<style>
</style>