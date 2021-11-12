<template>
  <div class="containers text-center">
    <br />
    <br />
    <img
      src="@/assets/mju-logo.png"
      class="rounded mx-auto d-block"
      alt="..."
      width="150"
      height="150"
    />
    <p></p>
    <h1 class="h2 text-bold text-success">{{ test }}</h1>
    <img
      src="@/assets/Logo project001.png"
      class="img-fluid"
      alt="Responsive image"
      width="250"
      height="120"
    />
    <h1 class="h1 text-bold text-success">Depression Screening System</h1>
    <h5 class="text-gray-soft text-regular text-success">
      ระบบคัดกรองภาวะโรคซึมเศร้า นักศึกษามหาวิทยาลัยแม่โจ้
    </h5>
    <br />
    <div class="container">
      <b-button variant="outline-info" @click="start()" size="lg"
        >เริ่มทำแบบประเมิน</b-button
      >
      <div class="p-4">
        <h6><strong>หมายเหตุ!</strong></h6>
        <h6 class="text-danger">
          กรุณากรอกตามความเป็นจริง เพราะมีผลต่อตัวท่านเอง!
        </h6>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      test: "MAEJO UNIVERSITY",
    };
  },

  components: {},
  computed: {
    loggedIn() {
      // console.log(this.$store.state.auth.status.loggedIn);
      return this.$store.state.auth.status.loggedIn;
    },
  },
  created() {
    this.userstatus = this.$store.state.auth.user.role_id;
    if (!this.loggedIn) {
      this.$router.push("/Signin");
    }
    if (this.userstatus == " admin") {
      this.$router.push("/AdminHome");
    }
  },
  methods: {
    start() {
      this.$router.push({ name: "Question2" });
    },
  },
};
</script>

<style></style>
