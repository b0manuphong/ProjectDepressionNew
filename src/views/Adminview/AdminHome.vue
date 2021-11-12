<template>
  <div>
    <Dashborad />
  </div>
</template>

<script>
import Dashborad from "../Adminview/Dashborad.vue";

export default {
  components: {
    Dashborad,
  },
  computed:{
  //   currentUser() {
  //     return this.$store.state.auth.user;
  //   },
  // },
  // mounted() {
  //   if (!this.currentUser) {
  //     this.$router.push("/");
  //   } else {
  //     this.$router.push("/AdminHome");
  //   }
  },
};
</script>

<style></style>
