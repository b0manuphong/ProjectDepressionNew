<template>
  <div class="container">
    <h2 class="pt-5 text-center">
      <strong>แบบประเมินภาวะโรคซึมเศร้า 2 คำถาม (2Q)</strong>
    </h2>
    <hr />
    <div>
      <h4>
        1. ใน 2 สัปดาห์ที่ผ่านมารวมวันนี้ ท่านรู้สึก หดหู่ เศร้า
        หรือท้อแท้สิ้นหวัง หรือไม่
      </h4>
      <br />
      <div class="position-relative">
        <b-form-radio-group
          v-model="selected1s"
          :options="options"
          class="mb-3"
          value-field="item"
          text-field="name"
          disabled-field="notEnabled"
          size="lg"
          required
        ></b-form-radio-group>
      </div>
      <br />
      <h4>
        2. ใน 2 สัปดาห์ที่ผ่านมารวมวันนี้ ท่านรู้สึก เบื่อ
        ทำอะไรก็ไม่เพลิดเพลินหรือไม่
      </h4>
      <br />
      <b-form-radio-group
        v-model="selected2s"
        :options="options"
        class="mb-3"
        value-field="item"
        text-field="name"
        disabled-field="notEnabled"
        size="lg"
        required
      ></b-form-radio-group>
      <br />
      <hr />
    </div>
    <div>
      <b-row align-h="center">
        <b-col cols="4"
          ><b-button block variant="info" @click="question9"
            >ส่งแบบประเมิน</b-button
          ></b-col
        >
        <b-col cols="4"
          ><b-button block variant="danger" @click="home"
            >ยกเลิก</b-button
          ></b-col
        >
      </b-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selected1s: null,
      selected2s: null,
      options: [
        { item: 1, name: "มี" },
        { item: 0, name: "ไม่มี" },
      ],
      current_data: null,
      LastPhase:0
    };
  },

  created() {
    this.current_data = this.$store.state.auth.user;
    this.getLastPhase();
    // console.log(this.current_data.studnet_code);
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
  methods: {
    getLastPhase() {
      var axios = require("axios");
      var qs = require("qs");
      var data = qs.stringify({
      });
      var config = {
        method: "get",
        url: "http://localhost:3000/get_last_phase",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: data,
      };

      axios(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));

          response.data.forEach((element) => {
            console.log(element.phase_id);
            this.LastPhase = element.phase_id;
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    question9() {
      let user = JSON.parse(localStorage.getItem("user"));
      var result = this.selected1s + this.selected2s;
      this.$store.state.resultquestion2 = result;
      console.log(user);
      if (this.selected1s == null || this.selected2s == null) {
        alert("ท่านกรอกแบบประเมินไม่ครบ!");
      } else {
        if (result <= 0) {
          alert("ท่าน! ไม่อยู่ในความเสี่ยงภาวะโรคชึมเศร้า");
          var axios = require("axios");
          var qs = require("qs");
          var data = qs.stringify({
            id: this.current_data.Id,
            symptom: "0",
            question2: result,
            question9: "0",
            phase: this.LastPhase,
            trace: "1",
          });
          var config = {
            method: "post",
            url: "http://localhost:3000/insertscorequestion9",
            headers: {
              "x-access-token": user.token,
            },
            data: data,
          };

          axios(config)
            .then((res) => {
              console.log(res);
              this.update_status();
            })
            .catch(function (error) {
              console.log(error);
            });
        } else {
          alert("กรณี มี 1 ข้อขึ้นไปให้ประเมิน 9Q ต่อ ");
          this.$router.push("/Question9");
        }
      }
    },
    update_status() {
      let user = JSON.parse(localStorage.getItem("user"));
      var axios = require("axios");
      var qs = require("qs");
      var data = qs.stringify({
        id: this.current_data.Id,
      });
      var config = {
        method: "post",
        url: "http://localhost:3000/update_status",
        headers: {
          "x-access-token": user.token,
        },
        data: data,
      };

      axios(config)
        .then(() => {
          this.$router.push("/Home");
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    home() {
      this.$router.push({ name: "Home" });
    },
  },
};
</script>
