<template>
  <div class="pt-5 container">
    <h2 class="text-center text-success">ประวัติกรอกแบบประเมิน</h2>
    <!-- <p class="mt-3 mb-0 h5 text-center text-primary">
      คะแนนของคุณ :<span class="text-success"> {{ this.LastScore.Q2 }} คะแนน</span>
      อาการของคุณ :<span class="text-success"> {{ status }}</span>
      <span class="text-danger"> *(ปัจจุบัน)</span>
    </p> -->
    <br />
    <div class="text-center shadow-sm p-3 mb-5 bg-body rounded">
      <h5 class="text-success ">คำแนะนำ</h5>
      <br />
      <b-row>
        <b-col class="pb-2"
          ><b-button variant="primary" @click="symptom2()"
            >อาการ น้อย</b-button
          ></b-col
        >
        <b-col class="pb-2"
          ><b-button variant="warning" @click="symptom3()"
            >อาการ ปานกลาง</b-button
          ></b-col
        >
        <b-col class="pb-2"
          ><b-button variant="danger" @click="symptom4()"
            >อาการ รุนแรง</b-button
          ></b-col
        >
      </b-row>
    </div>
    <br />
    <b-table striped hover :items="items"></b-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [],
      // score: "25",
      // status: "ไม่มีอาการ",
      LastScore: [],
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },

  mounted() {
    if (!this.currentUser) {
      this.$router.push("/");
    }
  },
  created() {
    this.getHistoryUser();
  },
  methods: {
    getHistoryUser() {
      let user = JSON.parse(localStorage.getItem("user"));
      let axios = require("axios");
      let qs = require("qs");
      let data = qs.stringify({
        ID: `${user.Id}`,
      });
      // console.log(user);
      // console.log(localStorage.getItem("user"));
      let config = {
        method: "post",
        url: "http://localhost:3000/gethistoryUser",
        headers: {
          "x-access-token": user.token,
        },
        data: data,
      };

      axios(config)
        .then((response) => {
          // console.log(response.data[0])
          this.LastScore = response.data[0];
          //  console.log(this.LastScore)
          response.data.forEach((element) => {
            this.items.push(element);
          });
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    symptom2() {
      this.$router.push({ name: "little2" });
    },
    symptom3() {
      this.$router.push({ name: "medium3" });
    },
    symptom4() {
      this.$router.push({ name: "severe4" });
    },
  },
};
</script>
