<template>
  <div class="container">
    <h2 class="pt-5 text-center">
      <strong>แบบประเมินภาวะโรคซึมเศร้า 9 คำถาม (9Q)</strong>
    </h2>
    <hr />
    <h4>1. เบื่อ ไม่สนใจอยากทำอะไร</h4>
    <br />
    <b-form-radio-group
      v-model="selected1"
      :options="options"
      class="mb-3"
      value-field="item"
      text-field="name"
      disabled-field="notEnabled"
      size="lg"
    ></b-form-radio-group>
    <br />
    <h4>2. ไม่สบายใจ ซึมเศร้า ท้อแท้</h4>
    <br />
    <b-form-radio-group
      v-model="selected2"
      :options="options"
      class="mb-3"
      value-field="item"
      text-field="name"
      disabled-field="notEnabled"
      size="lg"
    ></b-form-radio-group>
    <br />
    <h4>3. หลับยาก หรือหลับๆ ตื่นๆ หรือหลับมากไป</h4>
    <br />
    <b-form-radio-group
      v-model="selected3"
      :options="options"
      class="mb-3"
      value-field="item"
      text-field="name"
      disabled-field="notEnabled"
      size="lg"
    ></b-form-radio-group>
    <br />
    <h4>4. เหนื่อยง่าย หรือ ไม่ค่อยมีแรง</h4>
    <br />
    <b-form-radio-group
      v-model="selected4"
      :options="options"
      class="mb-3"
      value-field="item"
      text-field="name"
      disabled-field="notEnabled"
      size="lg"
    ></b-form-radio-group>
    <br />
    <h4>5. เบื่ออาหาร หรือกินมากเกินไป</h4>
    <br />
    <b-form-radio-group
      v-model="selected5"
      :options="options"
      class="mb-3"
      value-field="item"
      text-field="name"
      disabled-field="notEnabled"
      size="lg"
    ></b-form-radio-group>
    <br />
    <h4>
      6. รู้สึกไม่ดีกับตัวเอง คิดว่าตัวเองล้มเหลว
      หรือทำให้ตนเองหรือครอบครัวผิดหวัง
    </h4>
    <br />
    <b-form-radio-group
      v-model="selected6"
      :options="options"
      class="mb-3"
      value-field="item"
      text-field="name"
      disabled-field="notEnabled"
      size="lg"
    ></b-form-radio-group>
    <br />
    <h4>
      7. สมาธิไม่ดีเวลาทำอะไร เช่น ดูโทรทัศน์ ฟังวิทยุ
      หรือทำงานที่ต้องใช้ความตั้งใจ
    </h4>
    <br />
    <b-form-radio-group
      v-model="selected7"
      :options="options"
      class="mb-3"
      value-field="item"
      text-field="name"
      disabled-field="notEnabled"
      size="lg"
    ></b-form-radio-group>
    <br />
    <h4>
      8. พูดช้า ทำอะไรช้าลง จนคนอื่นสังเกตเห็นได้
      หรือกระสับกระส่ายไม่สามารถอยู่นิ่งได้เหมือนที่เคยเป็น
    </h4>
    <br />
    <b-form-radio-group
      v-model="selected8"
      :options="options"
      class="mb-3"
      value-field="item"
      text-field="name"
      disabled-field="notEnabled"
      size="lg"
    ></b-form-radio-group>
    <br />
    <h4>9. คิดทำร้ายตนเอง หรือคิดว่าถ้าตายไปคงจะดี</h4>
    <br />
    <b-form-radio-group
      v-model="selected9"
      :options="options"
      class="mb-3"
      value-field="item"
      text-field="name"
      disabled-field="notEnabled"
      size="lg"
    ></b-form-radio-group>
    <div>
      <hr />
      <br />
      <b-row align-h="center">
        <b-col cols="4">
          <b-button block variant="info" @click="sumq9()"
            >ส่งแบบประเมิน</b-button
          ></b-col
        >
        <!-- <b-col cols="4"
          ><b-button block variant="danger" @click="quesiton2"
            >ยกเลิก</b-button
          ></b-col -->
        <!-- > -->
      </b-row>
      <br />
      <br />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selected1: null,
      selected2: null,
      selected3: null,
      selected4: null,
      selected5: null,
      selected6: null,
      selected7: null,
      selected8: null,
      selected9: null,
      options: [
        { item: 0, name: "ไม่มีเลย" },
        { item: 1, name: "เป็นบางวัน" },
        { item: 2, name: "เป็นบ่อย " },
        { item: 3, name: "เป็นทุกวัน" },
      ],
      current_data: null,
      symptom_status: 0,
      LastPhase: 0,
    };
  },
  created() {
    this.current_data = this.$store.state.auth.user;
    this.getLastPhase();
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
        id: "6004101392",
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
        .catch(function(error) {
          console.log(error);
        });
    },
    sumq9() {
      console.log(this.$store.state.resultquestion2);
      if (
        this.selected1 == null ||
        this.selected2 == null ||
        this.selected3 == null ||
        this.selected4 == null ||
        this.selected5 == null ||
        this.selected6 == null ||
        this.selected7 == null ||
        this.selected8 == null ||
        this.selected9 == null
      ) {
        alert("ท่านกรอกแบบประเมินไม่ครบ!");
      } else {
        let user = JSON.parse(localStorage.getItem("user"));
        var result =
          this.selected1 +
          this.selected2 +
          this.selected3 +
          this.selected4 +
          this.selected5 +
          this.selected6 +
          this.selected7 +
          this.selected8 +
          this.selected9;

        if (result >= 7 && result <= 12) {
          this.symptom_status = 2;
        } else if (result >= 13 && result <= 18) {
          this.symptom_status = 3;
        } else if (result >= 19) {
          this.symptom_status = 4;
        } else {
          alert("ท่านไม่มีความเสี่ยงโรคภาวะซึมเศร้า");
        }

        console.log(this.symptom_status);
        // console.log(this.current_data.studnet_code);
        // console.log(this.current_data);
        // console.log(result);
        var axios = require("axios");
        var qs = require("qs");
        var data = qs.stringify({
          // studnet_id: this.current_data.Id,
          // symptom_id: this.symptom_status,
          // sum_question2: "1",
          // sum_question9: result,
          // phase_id: "1",
          symptom: this.symptom_status,
          question2: this.$store.state.resultquestion2,

          question9: result,
          phase: this.LastPhase,
          trace: "1",
          id: this.current_data.Id,
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
          .then(() => {
            this.selected1 == null;
            this.selected2 == null;
            this.selected3 == null;
            this.selected4 == null;
            this.selected5 == null;
            this.selected6 == null;
            this.selected7 == null;
            this.selected8 == null;
            this.selected9 == null;
            this.symptom_status = 0;
            alert("ท่าน! กรอกแบบประเมินเสร็จแล้ว");
            this.update_status();
          })
          .catch(function(error) {
            console.log(error);
          });
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
        .catch(function(error) {
          console.log(error);
        });
    },
    quesiton2() {
      this.$router.push({ name: "Question2" });
    },
  },
};
</script>
