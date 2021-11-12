<template>
  <div class="container pt-5">
    <h3 class="text-center text-success">แดชบอร์ด</h3>
    <p></p>
    <!-- <div>
      <div class="card p-2 shadow p-3 mb-5 bg-white rounded">
        <label class="shadow-none p-3 mb-5 bg-light rounded text-success">
          ภาวะซึมเศร้าของนักศึกษา มหาวิทยาลัยแม่โจ้</label
        >
        <div class="">
          <b-card-group deck>
            <b-card
              border-variant="warning"
              header=" มีอาการของโรคซึมเศร้า ระดับปานกลาง"
              header-text-variant="white"
              header-bg-variant="warning"
              align="center"
            >
              <b-card-text
                ><h1>{{ status3 }}</h1></b-card-text
              >
              <b-button variant="warning">รายชื่อ</b-button>
            </b-card>

            <b-card
              border-variant="danger"
              header=" มีอาการของโรคซึมเศร้า ระดับรุนแรง"
              header-text-variant="white"
              header-bg-variant="danger"
              align="center"
            >
              <b-card-text
                ><h1>{{ status4 }}</h1></b-card-text
              >
              <b-button variant="danger">รายชื่อ</b-button>
            </b-card>
          </b-card-group>
        </div>
      </div>
      <p></p>
    </div> -->
    <p></p>
    <p></p>
    <div class="card p-2 shadow p-3 mb-5 bg-white rounded">
      <label class="shadow-none p-3 mb-5 bg-light rounded text-success">
        ภาวะซึมเศร้าของนักศึกษา มหาวิทยาลัยแม่โจ้</label
      >
      <div class="container">
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
                    <b-button variant="info" v-b-modal.modal-lg
                      >รายชื่อ</b-button
                    >
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
                    <b-button variant="info" v-b-modal.modal-lg1
                      >รายชื่อ</b-button
                    >
                    <b-modal id="modal-lg1" size="lg" hide-footer>
                      <template #modal-title> รายชื่อทั้งหมด </template>
                      <div class="d-block text-center">
                        <div>
                          <b-table
                            striped
                            hover
                            :items="active_data"
                            :fields="fields2"
                          ></b-table>
                        </div>
                      </div>
                      <b-button
                        class="mt-3"
                        block
                        @click="$bvModal.hide('modal-lg1')"
                        >ปิด</b-button
                      >
                      <b-button class="mt-3" block @click="onExport1"
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
                    <b-button variant="info" v-b-modal.modal-lg2
                      >รายชื่อ</b-button
                    >
                    <b-modal id="modal-lg2" size="lg" hide-footer>
                      <template #modal-title> รายชื่อทั้งหมด </template>
                      <div class="d-block text-center">
                        <div>
                          <b-table
                            striped
                            hover
                            :items="Notactive_data"
                            :fields="fields3"
                          ></b-table>
                        </div>
                      </div>
                      <b-button
                        class="mt-3"
                        block
                        @click="$bvModal.hide('modal-lg2')"
                        >ปิด</b-button
                      >
                      <b-button class="mt-3" block @click="onExport2"
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
    </div>
    <div>
      <div class="card p-2 shadow p-3 mb-5 bg-white rounded">
        <label class="shadow-none p-3 mb-5 bg-light rounded text-success">
          แสดงผลรวมของการตอบแบบประเมิน รวมทั้งหมด</label
        >
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
              border-variant="secondary"
              header="ไม่มีอาการของโรคซึมเศร้า หรือ มีน้อยมาก"
              header-text-variant="white"
              header-bg-variant="secondary"
              align="center"
            >
              <b-card-text
                ><h1>{{ status0 }}</h1></b-card-text
              >
              <div>
                <b-button variant="info" v-b-modal.modal-lg00>รายชื่อ</b-button>
                <b-modal id="modal-lg00" size="lg" hide-footer>
                  <template #modal-title> รายชื่อทั้งหมด </template>
                  <div class="d-block text-center">
                    <div>
                      <b-table
                        striped
                        hover
                        :items="status0_data"
                        :fields="fields4"
                      ></b-table>
                    </div>
                  </div>
                  <b-button
                    class="mt-3"
                    block
                    @click="$bvModal.hide('modal-lg00')"
                    >ปิด</b-button
                  >
                  <b-button class="mt-3" block @click="onExport3"
                    >โหลดข้อมูล</b-button
                  >
                </b-modal>
              </div>
            </b-card>

            <!-- <b-card
              border-variant="success"
              header="มีอาการของโรคซึมเศร้า ระดับน้อยมาก"
              header-text-variant="white"
              header-bg-variant="success"
              align="center"
            >
              <b-card-text
                ><h1>{{ status1 }}</h1></b-card-text
              >
              <div>
                <b-button variant="info" v-b-modal.modal-lg>รายชื่อ</b-button>
                <b-modal id="modal-lg11" size="lg" hide-footer>
                  <template #modal-title> รายชื่อทั้งหมด </template>
                  <div class="d-block text-center">
                    <div>
                      <b-table
                        striped
                        hover
                        :items="active_data"
                        :fields="fields2"
                      ></b-table>
                    </div>
                  </div>
                  <b-button
                    class="mt-3"
                    block
                    @click="$bvModal.hide('modal-lg11')"
                    >ปิด</b-button
                  >
                  <b-button class="mt-3" block @click="onExport"
                    >โหลดข้อมูล</b-button
                  >
                </b-modal>
              </div>
            </b-card> -->

            <b-card
              border-variant="primary"
              header="มีอาการของโรคซึมเศร้า ระดับน้อย"
              header-bg-variant="primary"
              header-text-variant="white"
              align="center"
            >
              <b-card-text
                ><h1>{{ status2 }}</h1></b-card-text
              >
              <div>
                <b-button variant="info" v-b-modal.modal-lg22>รายชื่อ</b-button>
                <b-modal id="modal-lg22" size="lg" hide-footer>
                  <template #modal-title> รายชื่อทั้งหมด </template>
                  <div class="d-block text-center">
                    <div>
                      <b-table
                        striped
                        hover
                        :items="status2_data"
                        :fields="fields5"
                      ></b-table>
                    </div>
                  </div>
                  <b-button
                    class="mt-3"
                    block
                    @click="$bvModal.hide('modal-lg22')"
                    >ปิด</b-button
                  >
                  <b-button class="mt-3" block @click="onExport4"
                    >โหลดข้อมูล</b-button
                  >
                </b-modal>
              </div>
            </b-card>

            <b-card
              border-variant="warning"
              header=" มีอาการของโรคซึมเศร้า ระดับปานกลาง"
              header-text-variant="white"
              header-bg-variant="warning"
              align="center"
            >
              <b-card-text
                ><h1>{{ status3 }}</h1></b-card-text
              >
              <div>
                <b-button variant="info" v-b-modal.modal-lg33>รายชื่อ</b-button>
                <b-modal id="modal-lg33" size="lg" hide-footer>
                  <template #modal-title> รายชื่อทั้งหมด </template>
                  <div class="d-block text-center">
                    <div>
                      <b-table
                        striped
                        hover
                        :items="status3_data"
                        :fields="fields6"
                      ></b-table>
                    </div>
                  </div>
                  <b-button
                    class="mt-3"
                    block
                    @click="$bvModal.hide('modal-lg33')"
                    >ปิด</b-button
                  >
                  <b-button class="mt-3" block @click="onExport5"
                    >โหลดข้อมูล</b-button
                  >
                </b-modal>
              </div>
            </b-card>

            <b-card
              border-variant="danger"
              header=" มีอาการของโรคซึมเศร้า ระดับรุนแรง"
              header-text-variant="white"
              header-bg-variant="danger"
              align="center"
            >
              <b-card-text
                ><h1>{{ status4 }}</h1></b-card-text
              >
              <div>
                <b-button variant="info" v-b-modal.modal-lg44>รายชื่อ</b-button>
                <b-modal id="modal-lg44" size="lg" hide-footer>
                  <template #modal-title> รายชื่อทั้งหมด </template>
                  <div class="d-block text-center">
                    <div>
                      <b-table
                        striped
                        hover
                        :items="this.status4_data"
                        :fields="fields7"
                      ></b-table>
                    </div>
                  </div>
                  <b-button
                    class="mt-3"
                    block
                    @click="$bvModal.hide('modal-lg44')"
                    >ปิด</b-button
                  >
                  <b-button class="mt-3" block @click="onExport6"
                    >โหลดข้อมูล</b-button
                  >
                </b-modal>
              </div>
            </b-card>
          </b-card-group>
        </div>
      </div>
      <p></p>
    </div>
  </div>
</template>

<script>
import XLSX from "xlsx"; // import xlsx
export default {
  data() {
    return {
      All_data: null,
      status0: 0,
      status1: 0,
      status2: 0,
      status3: 0,
      status4: 0,

      status0_data: [],
      status1_data: [],
      status2_data: [],
      status3_data: [],
      status4_data: [],

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
      fields2: [
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
      fields3: [
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
      fields4: [
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
      fields5: [
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
      fields6: [
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
      fields7: [
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
      options: [{ value: "all", text: "ทั้งหมด" }],
      optionsp: [
        {
          value: "all",
          text: "ทั้งหมด",
        },
      ],
      year: [],
      phase: [
        {
          value: "all",
          text: "ทั้งหมด",
        },
      ],
      is_active: 0,
      is_Notactive: 0,
      AllStudent: 0,

      active_data: [],
      Notactive_data: [],
      AllStudent_data: [],
      yearstudent: [{ value: "all", text: "ทั้งหมด" }],
    };
  },
  components: {},
  created() {
    this.getallhistory();
    this.getfaculty();
    this.getUser_data();
    // this.getallyear();
    this.getallphase();
    this.getyearstudent();
  },
  methods: {
    yearSelect() {
      if (this.form.phase != null) {
        // console.log(this.form.phase);
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
            this.status0 = 0;
            this.status0_data = [];
            this.status1 = 0;
            this.status1_data = [];
            this.status2 = 0;
            this.status2_data = [];
            this.status3 = 0;
            this.status3_data = [];
            this.status4 = 0;
            this.status4_data = [];

            // console.log(JSON.stringify(response.data));
            // console.log(this.status3);
            response.data.forEach((element) => {
              if (element.symptom_id == 0) {
                this.status0 += 1;
                this.status0_data.push(element);
              } else if (element.symptom_id == 1) {
                this.status1 += 1;
                this.status1_data.push(element);
              } else if (element.symptom_id == 2) {
                this.status2 += 1;
                this.status2_data.push(element);
              } else if (element.symptom_id == 3) {
                this.status3 += 1;
                this.status3_data.push(element);
              } else if (element.symptom_id == 4) {
                this.status4 += 1;
                this.status4_data.push(element);
              }
            });
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    },

    onExport() {
      const dataWS = XLSX.utils.json_to_sheet(this.AllStudent_data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, dataWS);
      XLSX.writeFile(wb, "นักศึกษาทั้งหมด.xlsx");
    },
    onExport1() {
      const dataWS = XLSX.utils.json_to_sheet(this.active_data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, dataWS);
      XLSX.writeFile(wb, "กรอก.xlsx");
    },
    onExport2() {
      const dataWS = XLSX.utils.json_to_sheet(this.Notactive_data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, dataWS);
      XLSX.writeFile(wb, "ยังไม่กรอก.xlsx");
    },
    onExport3() {
      const dataWS = XLSX.utils.json_to_sheet(this.status0_data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, dataWS);
      XLSX.writeFile(wb, "ไม่มีอาการ.xlsx");
    },
    onExport4() {
      const dataWS = XLSX.utils.json_to_sheet(this.status2_data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, dataWS);
      XLSX.writeFile(wb, "ระดับน้อย.xlsx");
    },
    onExport5() {
      const dataWS = XLSX.utils.json_to_sheet(this.status3_data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, dataWS);
      XLSX.writeFile(wb, "ระดับปานกลาง.xlsx");
    },
    onExport6() {
      const dataWS = XLSX.utils.json_to_sheet(this.status4_data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, dataWS);
      XLSX.writeFile(wb, "ระดับรุนแรง.xlsx");
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
        .catch(function(error) {
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
        .catch(function(error) {
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
          // console.log(this.active_data);
          // console.log(this.Notactive_data);
          // console.log()
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
        .catch(function(error) {
          console.log(error);
        });
    },

    // getallyear() {
    //   var axios = require("axios");
    //   var config = {
    //     method: "get",
    //     url: "http://localhost:3000/getallyear",
    //     headers: {},
    //   };
    //   axios(config)
    //     .then((response) => {
    //       response.data.forEach((element) => {
    //         this.year.push({
    //           value: element.year_id,
    //           text: element.year,
    //         });
    //       });
    //       // console.log(JSON.stringify(response.data));
    //     })
    //     .catch(function (error) {
    //       console.log(error);
    //     });
    // },
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
        .catch(function(error) {
          console.log(error);
        });
    },
    getallhistory() {
      let user = JSON.parse(localStorage.getItem("user"));
      var axios = require("axios");
      var qs = require("qs");
      var data = qs.stringify({});
      var config = {
        method: "get",
        url: "http://localhost:3000/getallhistory",
        headers: {
          "x-access-token": user.token,
        },
        data: data,
      };

      axios(config)
        .then((response) => {
          // console.log(response.data);
          response.data.forEach((element) => {
            if (element.symptom_id == 0) {
              this.status0 += 1;
              this.status0_data.push(element);
            } else if (element.symptom_id == 1) {
              this.status1 += 1;
              this.status1_data.push(element);
            } else if (element.symptom_id == 2) {
              this.status2 += 1;
              this.status2_data.push(element);
            } else if (element.symptom_id == 3) {
              this.status3 += 1;
              this.status3_data.push(element);
            } else if (element.symptom_id == 4) {
              this.status4 += 1;
              this.status4_data.push(element);
            }
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    
  },
};
</script>

<style></style>
