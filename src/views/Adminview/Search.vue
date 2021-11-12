<template>
  <div class="container">
    <b-row class="text-success">
      <b-col>
        <div>
          ปีการศึกษา
          <b-form-select
            v-model="form.phase"
            :options="phase"
            @change="yearSelect()"
            class="mb-3"
          >
          </b-form-select>
        </div>
      </b-col>
      <!-- <b-col>
        <div>
          ภาคการศึกษา
          <b-form-select v-model="form.phase" :options="phase" class="mb-3">
          </b-form-select>
        </div>
      </b-col> -->
      <b-col>
        <div>
          ชั้นปี (นักศึกษา)
          <b-form-select
            v-model="form.year"
            :options="yearstudent"
            @change="yearSelect()"
            class="mb-3"
          >
          </b-form-select>
        </div>
      </b-col>
      <b-col>
        <div>
          คณะ
          <b-form-select
            v-model="form.faculty"
            :options="options"
            class="mb-3"
            @change="getprogram(), yearSelect()"
          >
          </b-form-select>
        </div>
      </b-col>
      <b-col>
        <div>
          สาขา
          <b-form-select
            v-model="form.program"
            :options="optionsp"
            @change="yearSelect()"
            class="mb-3"
          >
          </b-form-select>
        </div>
      </b-col>
    </b-row>

    <b-card-group deck>
      <b-card
        border-variant="info"
        header="จำนวนนักศึกษาทั้งหมด"
        header-bg-variant="info"
        header-text-variant="white"
        align="center"
      >
        <b-card-text>
          <b-row>
            <b-col>
              <label class="text-success">นักศึกษาทั้งหมด</label>
              <b-row>
                <b-col
                  ><h1>{{ AllStudent }}</h1></b-col
                >
              </b-row>
              <div>
                <b-button variant="info" v-b-modal.modal-lg>รายชื่อ</b-button>
                <b-modal id="modal-lg" size="lg" hide-footer>
                  <template #modal-title> รายชื่อทั้งหมด </template>
                  <div class="d-block text-center">
                    <div>
                      <b-table
                        striped
                        hover
                        :items="AllStudent_data"
                        :fields="fields"
                      ></b-table>
                    </div>
                  </div>
                  <b-button
                    class="mt-3"
                    block
                    @click="$bvModal.hide('modal-lg')"
                    >ปิด</b-button
                  >
                  <b-button class="mt-3" block @click="onExport"
                    >โหลดข้อมูล</b-button
                  >
                </b-modal>
              </div>
            </b-col>
          </b-row>
        </b-card-text>
      </b-card>

      <b-card
        border-variant="info"
        header="กรอกแบบประเมิน"
        header-bg-variant="info"
        header-text-variant="white"
        align="center"
      >
        <b-card-text>
          <b-row>
            <b-col>
              <label class="text-success">กรอก</label>
              <b-row>
                <b-col
                  ><h1>{{ is_active }}</h1></b-col
                >
              </b-row>
              <div>
                <b-button variant="info" v-b-modal.modal-lg>รายชื่อ</b-button>
                <b-modal id="modal-lg1" size="lg" hide-footer>
                  <template #modal-title> รายชื่อทั้งหมด </template>
                  <div class="d-block text-center">
                    <div>
                      <b-table
                        striped
                        hover
                        :items="active_data"
                        :fields="fields"
                      ></b-table>
                    </div>
                  </div>
                  <b-button
                    class="mt-3"
                    block
                    @click="$bvModal.hide('modal-lg1')"
                    >ปิด</b-button
                  >
                  <b-button class="mt-3" block @click="onExport"
                    >โหลดข้อมูล</b-button
                  >
                </b-modal>
              </div>
            </b-col>

            <b-col>
              <label class="text-danger">ยังไม่กรอก</label>
              <b-row>
                <b-col
                  ><h1>{{ is_Notactive }}</h1></b-col
                >
              </b-row>
              <div>
                <b-button variant="info" v-b-modal.modal-lg>รายชื่อ</b-button>
                <b-modal id="modal-lg2" size="lg" hide-footer>
                  <template #modal-title> รายชื่อทั้งหมด </template>
                  <div class="d-block text-center">
                    <div>
                      <b-table
                        striped
                        hover
                        :items="active_data"
                        :fields="fields"
                      ></b-table>
                    </div>
                  </div>
                  <b-button
                    class="mt-3"
                    block
                    @click="$bvModal.hide('modal-lg2')"
                    >ปิด</b-button
                  >
                  <b-button class="mt-3" block @click="onExport"
                    >โหลดข้อมูล</b-button
                  >
                </b-modal>
              </div>
            </b-col>
          </b-row>
        </b-card-text>
      </b-card>
    </b-card-group>
    <br />
  </div>
</template>
<script>
import XLSX from "xlsx"; // import xlsx

export default {
  components: {},
  data() {
    return {
      fields: [
        {
          key: "nametitle",
          label: "คำนำหน้า",
          sortable: true,
        },
        {
          key: "Firstname",
          label: "ชื่อ",
          sortable: true,
        },
        {
          key: "Lastname",
          label: "นามสกุล",
          sortable: true,
        },
        {
          key: "ID",
          label: "รหัสนักศึกษา",
          sortable: true,
        },
        {
          key: "faculty_name",
          label: "คณะ",
          sortable: true,
        },
        {
          key: "program_name",
          label: "สาขา",
          sortable: true,
        },
        {
          key: "Mobile",
          label: "เบอร์โทรศัพท์",
          sortable: true,
        },
      ],
      items: [],

      form: {
        studnetid: "",
        username: "",
        password: "",
        nametitle: "",
        studentfristname: "",
        studentlastname: "",
        mobile: "",
        roleid: 1,
        studentcode: "",
        faculty: "all",
        program: "all",
        year: "all",
        phase: "all",
        thetime: null,
        ative: false,
      },
      is_select: false,
      // nametitle: [
      //   { text: "เลือกคำนำหน้า", value: null },
      //   "นาย",
      //   "นาง",
      //   "นางสาว",
      // ],
      options: [{ value: "all", text: "All" }],
      optionsp: [
        {
          value: "all",
          text: "All",
        },
      ],
      year: [],
      phase: [
        {
          value: "all",
          text: "All",
        },
      ],
      is_active: 0,
      is_Notactive: 0,
      AllStudent: 0,

      active_data: [],
      Notactive_data: [],
      AllStudent_data: [],
      yearstudent: [{ value: "all", text: "All" }],
    };
  },
  created() {
    this.getfaculty();
    this.getUser_data();
    this.getallyear();
    this.getallphase();
    this.getyearstudent();
  },
  methods: {
    yearSelect() {
      if (this.form.phase != null) {
        console.log(this.form.phase);
        let user = JSON.parse(localStorage.getItem("user"));
        var axios = require("axios");
        var qs = require("qs");
        var data = qs.stringify({
          phase: this.form.phase,
          year: this.form.year,
          faculty: this.form.faculty,
          program: this.form.program,
        });
        var config = {
          method: "post",
          url: "http://localhost:3000/yearSelect",
          headers: {
            "x-access-token": user.token,
          },
          data: data,
        };

        axios(config)
          .then((response) => {
            console.log(JSON.stringify(response.data));
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },

    onExport() {
      const dataWS = XLSX.utils.json_to_sheet(this.AllStudent_data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, dataWS);
      XLSX.writeFile(wb, "export.xlsx");
    },

    getyearstudent() {
      var axios = require("axios");
      var qs = require("qs");
      var data = qs.stringify({});
      var config = {
        method: "get",
        url: "http://localhost:3000/getyearstudent",
        headers: {},
        data: data,
      };

      axios(config)
        .then((response) => {
          // console.log(JSON.stringify(response.data));
          response.data.forEach((element) => {
            this.yearstudent.push({
              value: element.Years,
              text: element.Years,
            });
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    getfaculty() {
      var axios = require("axios");
      var config = {
        method: "get",
        url: "http://localhost:3000/getfaculty_signup",
        headers: {},
      };

      axios(config)
        .then((response) => {
          response.data.forEach((element) => {
            this.options.push({
              value: element.faculty_id,
              text: element.faculty_name,
            });
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getprogram() {
      this.optionsp = [
        {
          value: "all",
          text: "All",
        },
      ];
      var axios = require("axios");
      var qs = require("qs");
      var data = qs.stringify({
        idfaculty: this.form.faculty, // ส่ง id faculty เพื่อเข้าไป query เอาข้อมูล faculty จากฐานข้อมูล
      });
      var config = {
        method: "post",
        url: "http://localhost:3000/getprogram_signup",
        headers: {},
        data: data,
      };

      axios(config)
        .then((response) => {
          response.data.forEach((element) => {
            this.optionsp.push({
              value: element.program_id,
              text: element.program_name,
            });
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    getUser_data() {
      var axios = require("axios");

      var config = {
        method: "get",
        url: "http://localhost:3000/getallUseractive",
        headers: {},
      };

      axios(config)
        .then((response) => {
          // console.log(response.data);
          this.AllStudent = response.data.length;

          // console.log(this.AllStudent_data);
          response.data.forEach((element) => {
            this.AllStudent_data.push(element);
            if (element.Active == 0) {
              this.is_Notactive += 1;
              this.Notactive_data.push(element);
            } else {
              this.is_active += 1;
              this.active_data.push(element);
            }
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    getallyear() {
      var axios = require("axios");
      var config = {
        method: "get",
        url: "http://localhost:3000/getallyear",
        headers: {},
      };
      axios(config)
        .then((response) => {
          response.data.forEach((element) => {
            this.year.push({
              value: element.year_id,
              text: element.year,
            });
          });
          // console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    getallphase() {
      var axios = require("axios");

      var config = {
        method: "get",
        url: "http://localhost:3000/getallphase",
        headers: {},
      };

      axios(config)
        .then((response) => {
          response.data.forEach((element) => {
            this.phase.push({
              value: element.phase_id,
              text: element.phase,
            });
          });
          // console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
};
</script>
