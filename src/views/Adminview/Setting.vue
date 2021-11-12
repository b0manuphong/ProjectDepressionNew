<template>
  <div class="container">
    <div class="pt-5 container"></div>
    <h3 class="text-center text-success">ตั้งค่า</h3>
    <div class="container col-sm-10 shadow p-3 mb-5 bg-white rounded">
      <p></p>
      <!-- //------------------ -->
      <div>
        <div class="mb-3">
          <b-button v-b-toggle.phaes block>ตั้งค่า ปีการศึกษา</b-button>
        </div>
        <b-collapse id="phaes">
          <b-card title="ปีการศึกษา" class="text-center text-success">
          </b-card>
          <div>
            <b-table :items="items5" :fields="fields5" striped responsive="sm">
              <template #cell(Edit)="row">
                <b-button
                  size="sm"
                  @click="row.toggleDetails"
                  class="mr-2"
                  variant="info"
                >
                  {{ row.detailsShowing ? "แก้ไข" : "รายละเอียด" }}
                </b-button>
              </template>
              <template #cell(Delete)="row">
                <b-button
                  size="sm"
                  variant="danger"
                  @click="deletephase(row.item, row.index, $event.target)"
                >
                  ลบ
                </b-button>
              </template>
              <!-- <template #cell(Add)="row">
                <b-button size="sm" @click="row" class="mr-2" variant="success">
                  เพิ่ม
                </b-button>
              </template> -->
              <template #row-details="row">
                <b-card>
                  <b-row class="mb-2">
                    <b-col sm="3" class="text-sm-right"><b>ปีการศึกษา :</b></b-col>
                    <b-col>{{ row.item.เทอม }}</b-col>
                  </b-row>

                  <b-row class="mb-2">
                    <b-col sm="3" class="text-sm-right"
                      ><b>แก้ไขปีการศึกษา :</b></b-col
                    >
                    <b-col>
                      <b-form-input
                        v-model="form.EditRound"
                        placeholder="แก้ไขปีการศึกษา"
                      ></b-form-input>
                      <!-- {{ row.item.Round }} -->
                    </b-col>
                  </b-row>
                  <div class="row mb-2">
                    <b-col>
                      <div>
                        <label for="example-datepicker">แก้ไข เริ่ม</label>
                        <b-form-datepicker
                          id="example-datepicker"
                          v-model="form.EditStart"
                          class="mb-2"
                        ></b-form-datepicker>
                        <!-- <p>Value: '{{ value }}'</p> -->
                      </div>
                    </b-col>
                    <b-col>
                      <div>
                        <label for="example-datepicker">แก้ไข สิ้นสุด</label>
                        <b-form-datepicker
                          id="example-datepicker"
                          v-model="form.EditEnd"
                          class="mb-2"
                        ></b-form-datepicker>
                        <!-- <p>Value: '{{ value }}'</p> -->
                      </div>
                    </b-col>
                  </div>

                  <b-row align-h="center">
                    <b-col cols="2"
                      ><b-button
                        size="sm"
                        variant="info"
                        @click="updataphase(row.item, row.index, $event.target)"
                        >ตกลง</b-button
                      ></b-col
                    >
                    <b-col cols="2">
                      <b-button
                        size="sm"
                        variant="danger"
                        @click="row.toggleDetails"
                        >ยกเลิก</b-button
                      ></b-col
                    >
                  </b-row>
                </b-card>
              </template>
            </b-table>
          </div>
          <p></p>
          <div>
            <b-form-input v-model="text" placeholder="1/2564"></b-form-input>
            <div class="mt-2">ตัวอย่าง : {{ text }}</div>
          </div>
          <p></p>
          <div class="row">
            <div class="col">
              <div>
                <label for="example-datepicker">เริ่ม</label>
                <b-form-datepicker
                  id="example-datepicker"
                  v-model="valuestart"
                  class="mb-2"
                ></b-form-datepicker>
                <p>ปี/เดือน/วัน : '{{ valuestart }}'</p>
              </div>
            </div>
            <div class="col">
              <div>
                <label for="example-datepicker">สิ้นสุด</label>
                <b-form-datepicker
                  id="example-datepicker"
                  v-model="valueend"
                  class="mb-2"
                ></b-form-datepicker>
                <p>ปี/เดือน/วัน : '{{ valueend }}'</p>
              </div>
            </div>

            <div class="text-center">
              <div class="row">
                <div class="col">
                  <b-button variant="success" @click="insertphase()"
                    >เพิ่ม</b-button
                  >
                </div>
              </div>
            </div>
          </div>
        </b-collapse>
      </div>
      <p></p>
      <div>
        <div class="mb-3">
          <b-button v-b-toggle.setnametitle block>ตั้งค่า คำนำหน้า</b-button>
        </div>
        <b-collapse id="setnametitle">
          <b-card title="คำนำหน้า" class="text-center text-success"> </b-card>
          <div>
            <b-table :items="items" :fields="fields" striped responsive="sm">
              <template #cell(Edit)="row">
                <b-button
                  size="sm"
                  @click="row.toggleDetails"
                  class="mr-2"
                  variant="info"
                >
                  {{ row.detailsShowing ? "แก้ไข" : "รายละเอียด" }}
                </b-button>
              </template>
              <template #cell(Delete)="row">
                <b-button
                  size="sm"
                  variant="danger"
                  @click="deletenametitle(row.item, row.index, $event.target)"
                >
                  ลบ
                </b-button>
              </template>
              <!-- <template #cell(Add)="row">
                <b-button size="sm" @click="row" class="mr-2" variant="success">
                  เพิ่ม
                </b-button>
              </template> -->
              <template #row-details="row">
                <b-card>
                  <b-row class="mb-2">
                    <b-col sm="3" class="text-sm-right"
                      ><b>คำนำหน้า :</b></b-col
                    >
                    <b-col>{{ row.item.คำนำหน้า }}</b-col>
                  </b-row>

                  <b-row class="mb-2">
                    <b-col sm="3" class="text-sm-right"
                      ><b>แก้ไขคำนำหน้า :</b></b-col
                    >
                    <b-col>
                      <b-form-input
                        v-model="form.Editnametitle"
                        placeholder="แก้ไขคำนำหน้า"
                      ></b-form-input>
                      <!-- {{ row.item.isActive }} -->
                    </b-col>
                  </b-row>

                  <b-row align-h="center">
                    <b-col cols="2"
                      ><b-button
                        size="sm"
                        variant="info"
                        @click="updatanametitle(row.item)"
                        >ตกลง</b-button
                      ></b-col
                    >
                    <b-col cols="2">
                      <b-button
                        size="sm"
                        variant="danger"
                        @click="row.toggleDetails"
                        >ยกเลิก</b-button
                      ></b-col
                    >
                  </b-row>
                </b-card>
              </template>
            </b-table>
          </div>

          <div class="container">
            <div class="row">
              <div class="col-2">
                <b-form-group
                  id="input-group-1"
                  label="คำนำหน้า:"
                  label-for="input-1"
                  description="คำนำหน้าที่ต้องการเพิ่ม"
                ></b-form-group>
              </div>
              <div class="col">
                <b-form-input
                  v-model="textnametitle"
                  placeholder="เพิ่มคำนำหน้า "
                ></b-form-input>
                <div class="mt-2">ตัวอย่าง: {{ textnametitle }}</div>
              </div>
            </div>
          </div>
          <div class="row text-center pb-2">
            <div class="col">
              <b-button variant="success" @click="insertnametitle()"
                >เพิ่ม</b-button
              >
            </div>
          </div>
        </b-collapse>
      </div>
      <p></p>

      <!-- ///--------------------- -->
      <div>
        <div class="mb-3">
          <b-button v-b-toggle.setfaculty block>ตั้งค่า คณะ</b-button>
        </div>
        <b-collapse id="setfaculty">
          <b-card title="คณะ" class="text-center text-success"> </b-card>
          <div>
            <b-table :items="items2" :fields="fields2" striped responsive="sm">
              <template #cell(index)="data">
                {{ data.index + 1 }}
              </template>
              <template #cell(Edit)="row">
                <b-button
                  size="sm"
                  @click="row.toggleDetails"
                  class="mr-2"
                  variant="info"
                >
                  {{ row.detailsShowing ? "แก้ไข" : "รายละเอียด" }}
                </b-button>
              </template>
              <template #cell(Delete)="row">
                <b-button
                  size="sm"
                  variant="danger"
                  @click="deletefaculty(row.item, row.index, $event.target)"
                >
                  ลบ
                </b-button>
              </template>
              <template #row-details="row">
                <b-card>
                  <b-row class="mb-2">
                    <b-col sm="3" class="text-sm-right"><b>คณะ :</b></b-col>
                    <b-col>{{ row.item.text }}</b-col>
                  </b-row>

                  <b-row class="mb-2">
                    <b-col sm="3" class="text-sm-right"
                      ><b>แก้ไขคณะ :</b></b-col
                    >
                    <b-col>
                      <b-form-input
                        v-model="form.Editfaculty"
                        placeholder="แก้ไขคณะ"
                      ></b-form-input>
                      <!-- {{ row.item.isActive }} -->
                    </b-col>
                  </b-row>

                  <b-row align-h="center">
                    <b-col cols="2"
                      ><b-button
                        size="sm"
                        variant="info"
                        @click="
                          updatefaculty(row.item, row.index, $event.target)
                        "
                        >ตกลง</b-button
                      ></b-col
                    >
                    <b-col cols="2">
                      <b-button
                        size="sm"
                        variant="danger"
                        @click="row.toggleDetails"
                        >ยกเลิก</b-button
                      ></b-col
                    >
                  </b-row>
                </b-card>
              </template>
            </b-table>
          </div>

          <div class="container">
            <div class="row">
              <div class="col-2">
                <b-form-group
                  id="input-group-1"
                  label="คณะ:"
                  label-for="input-1"
                  description="คณะที่ต้องการเพิ่ม"
                ></b-form-group>
              </div>
              <div class="col">
                <b-form-input
                  v-model="textfaculty"
                  placeholder="เพิ่มคณะ "
                ></b-form-input>
                <div class="mt-2">ตัวอย่าง: {{ textfaculty }}</div>
              </div>
            </div>
          </div>
          <div class="row text-center pb-2">
            <div class="col">
              <b-button variant="success" @click="insertfaculty()"
                >เพิ่ม</b-button
              >
            </div>
          </div>
        </b-collapse>
      </div>
      <p></p>

      <!-- สาขา ---------------------------------------------------->
      <div>
        <div class="mb-3">
          <b-button v-b-toggle.setprogram block>ตั้งค่า สาขา</b-button>
        </div>
        <b-collapse id="setprogram">
          <b-card title="สาขา" class="text-center text-success"> </b-card>
          <br />
          <div class="container">
            <div class="row">
              <div class="col-2">
                <b-form-group
                  id="input-group-1"
                  label="เลือกคณะ :"
                  label-for="input-1"
                  description="เลือกคณะที่ต้องการเพิ่มสาขาลงไป"
                ></b-form-group>
              </div>
              <div class="col">
                <div>
                  <b-form-select
                    v-model="FacultyId"
                    :options="items2"
                    class="mb-3"
                  >
                    <template #first>
                      <b-form-select-option :value="null" disabled
                        >-- กรุณาเลือกคณะ ที่ต้องการ เพื่อเพิ่มสาขา
                        --</b-form-select-option
                      >
                    </template>
                  </b-form-select>
                </div>
              </div>
            </div>
          </div>
          <p></p>
          <div class="container">
            <div class="row">
              <div class="col-2">
                <b-form-group
                  id="input-group-1"
                  label="สาขา :"
                  label-for="input-1"
                  description="สาขาที่ต้องการเพิ่ม"
                ></b-form-group>
              </div>
              <div class="col">
                <b-form-input
                  v-model="textprogram"
                  placeholder="เพิ่มสาขา "
                ></b-form-input>
              </div>
            </div>
          </div>
          <p></p>
          <p></p>
          <div class="row text-center pb-2">
            <div class="col">
              <b-button variant="success" @click="insertprogram()"
                >เพิ่ม</b-button
              >
            </div>
          </div>
          <!--------------------->
          <b-row>
            <b-col>
              <b-list-group>
                <div>
                  ตรวจสอบสาขา :
                  <b-form-select
                    v-model="form.Faculty_name"
                    :options="faculty"
                    class="mb-3"
                    @change="getprogram2()"
                  >
                  </b-form-select>
                </div>
              </b-list-group>
            </b-col>
          </b-row>

          <div>
            <b-table
              :items="program"
              :fields="fieldsProgram"
              v-if="showTable"
              striped
              responsive="sm"
            >
              <template #cell(index)="data">
                {{ data.index + 1 }}
              </template>
              <template #cell(Edit)="row">
                <b-button
                  size="sm"
                  @click="row.toggleDetails"
                  class="mr-2"
                  variant="info"
                >
                  {{ row.detailsShowing ? "แก้ไข" : "รายละเอียด" }}
                </b-button>
              </template>
              <template #cell(Delete)="row">
                <b-button
                  size="sm"
                  variant="danger"
                  @click="deleteprogram(row.item, row.index, $event.target)"
                >
                  ลบ
                </b-button>
              </template>
              <template #row-details="row">
                <b-card>
                  <b-row class="mb-2">
                    <b-col sm="3" class="text-sm-right"><b>สาขา :</b></b-col>
                    <b-col>{{ row.item.text }}</b-col>
                  </b-row>

                  <b-row class="mb-2">
                    <b-col sm="3" class="text-sm-right"
                      ><b>แก้ไขสาขา :</b></b-col
                    >
                    <b-col>
                      <b-form-input
                        v-model="form.Editprogram"
                        placeholder="แก้ไขสาขา"
                      ></b-form-input>
                      <!-- {{ row.item.isActive }} -->
                    </b-col>
                  </b-row>

                  <b-row align-h="center">
                    <b-col cols="2"
                      ><b-button
                        size="sm"
                        variant="info"
                        @click="
                          updateprogram(row.item, row.index, $event.target)
                        "
                        >ตกลง</b-button
                      ></b-col
                    >
                    <b-col cols="2">
                      <b-button
                        size="sm"
                        variant="danger"
                        @click="row.toggleDetails"
                        >ยกเลิก</b-button
                      ></b-col
                    >
                  </b-row>
                </b-card>
              </template>
            </b-table>
          </div>
        </b-collapse>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      valuestart: null,
      valueend: null,
      text: null,
      textnametitle: null,
      textfaculty: null,
      textprogram: null,

      fields: [
        "คำนำหน้า",
        { key: "Edit", label: "แก้ไข" },
        { key: "Delete", label: "ลบ" },
      ],
      fields2: [
        { key: "index", label: "ลำดับ" },
        { key: "text", label: "คณะ" },
        { key: "Edit", label: "แก้ไข" },
        { key: "Delete", label: "ลบ" },
      ],
      fieldsProgram: [
        { key: "index", label: "ลำดับ" },
        { key: "text", label: "สาขา" },
        { key: "Edit", label: "แก้ไข" },
        { key: "Delete", label: "ลบ" },
      ],
      fields3: ["Program", "Coures", "Edit", "Delete"],
      fields5: [
        "เทอม",
        "เริ่ม",
        "สิ้นสุด",
        "สร้าง",
        { key: "Edit", label: "แก้ไข" },
        { key: "Delete", label: "ลบ" },
      ],
      items: [],
      items2: [],
      items3: [],
      items5: [],
      faculty: [],
      program: [],
      FacultyId: "",
      form: {
        Editnametitle: null,
        Editfaculty: null,
        Editprogram: " ",
        EditRound: null,
        EditStart: null,
        EditEnd: null,
        Faculty_name: "",
        Program_name: "",
      },
      selected: null,
      showTable: false,
    };
  },
  created() {
    this.getphase();
    this.getnametitle();
    this.getfaculty();
    this.getprogram();
    this.getfaculty2();
    this.getprogram2();
  },
  methods: {
    ///---------------get phase --------
    insertphase() {
      if (
        this.text != null &&
        this.valuestart != null &&
        this.valueend != null
      ) {
        var axios = require("axios");
        var qs = require("qs");
        var data = qs.stringify({
          round: this.text,
          start: this.valuestart,
          end: this.valueend,
        });
        var config = {
          method: "post",
          url: "http://localhost:3000/insertphase",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          data: data,
        };

        axios(config)
          .then(() => {
            alert("บันทึกข้อมูลสำเร็จ");
            location.reload();
            // console.log(JSON.stringify(response.data));
          })
          .catch((error) => {
            alert("บันทึกข้อมูลไม่สำเร็จ");
            console.log(error);
          });
      } else {
        alert("บันทึกข้อมูลไม่สำเร็จ");
      }
    },
    getphase() {
      var axios = require("axios");

      var config = {
        method: "get",
        url: "http://localhost:3000/getphase",
        headers: {},
      };

      axios(config)
        .then((response) => {
          // console.log(JSON.stringify(response.data));
          response.data.forEach((element) => {
            this.items5.push({
              No: element.phase_id,
              เทอม: element.phase,
              เริ่ม: element.start,
              สิ้นสุด: element.end,
              สร้าง: element.created,
            });
          });
          // console.log(this.items5);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    updataphase(item) {
      if (
        this.form.EditRound != null &&
        this.form.EditStart != null &&
        this.form.EditEnd != null
      ) {
        var axios = require("axios");
        var qs = require("qs");
        var data = qs.stringify({
          phase: this.form.EditRound,
          start: this.form.EditStart,
          end: this.form.EditEnd,
          phase_id: item.No,
        });
        var config = {
          method: "put",
          url: "http://localhost:3000/updataphase",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          data: data,
        };

        axios(config)
          .then(() => {
            alert("อัพเดตข้อมูลสำเร็จ");
            location.reload();
            // console.log(JSON.stringify(response.data));
          })
          .catch((error) => {
            alert("อัพเดตข้อมูลไม่สำเร็จ");
            console.log(error);
          });
      } else {
        alert("อัพเดตข้อมูลไม่สำเร็จ");
      }
    },
    deletephase(item) {
      console.log(item);
      var axios = require("axios");
      var qs = require("qs");
      var data = qs.stringify({
        phase_id: item.No,
      });
      var config = {
        method: "delete",
        url: "http://localhost:3000/deletephase",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: data,
      };

      axios(config)
        .then(() => {
          alert("ลบข้อมูลสำเร็จ");
          location.reload();
          // console.log(JSON.stringify(response.data));
        })
        .catch((error) => {
          alert("ลบข้อมูลไม่สำเร็จ");
          console.log(error);
        });
    },

    //-------------------get nametitle---------------------------
    getnametitle() {
      var axios = require("axios");
      var qs = require("qs");
      var data = qs.stringify({});
      var config = {
        method: "get",
        url: "http://localhost:3000/getnametitle",
        headers: {},
        data: data,
      };

      axios(config)
        .then((response) => {
          // console.log(JSON.stringify(response.data));
          response.data.forEach((element) => {
            this.items.push({
              nametitle_id: element.nametitle_id,
              คำนำหน้า: element.nametitle,
            });
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    insertnametitle() {
      if (this.textnametitle != null) {
        var axios = require("axios");
        var qs = require("qs");
        var data = qs.stringify({
          nametitle: this.textnametitle,
        });
        var config = {
          method: "post",
          url: "http://localhost:3000/insertnametitle",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          data: data,
        };

        axios(config)
          .then(() => {
            alert("บันทึกข้อมูลสำเร็จ");
            location.reload();
            // console.log(JSON.stringify(response.data));
          })
          .catch((error) => {
            alert("บันทึกข้อมูลไม่สำเร็จ");
            location.reload();
            console.log(error);
          });
      } else {
        alert("บันทึกข้อมูลไม่สำเร็จ");
      }
    },
    updatanametitle(item) {
      if (this.form.Editnametitle != null) {
        var axios = require("axios");
        var qs = require("qs");
        var data = qs.stringify({
          nametitle: this.form.Editnametitle,
          nametitle_id: item.nametitle_id,
        });
        var config = {
          method: "put",
          url: "http://localhost:3000/updatenametitle",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          data: data,
        };

        axios(config)
          .then(() => {
            alert("อัพเดตข้อมูลสำเร็จ");
            location.reload();
            // console.log(JSON.stringify(response.data));
          })
          .catch(function (error) {
            alert("อัพเดตข้อมูลไม่สำเร็จ");
            console.log(error);
          });
      } else {
        alert("อัพเดตข้อมูลไม่สำเร็จ");
      }
    },
    deletenametitle(item) {
      var axios = require("axios");
      var qs = require("qs");
      var data = qs.stringify({
        nametitle_id: item.nametitle_id,
      });
      var config = {
        method: "delete",
        url: "http://localhost:3000/deletenametitle",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: data,
      };

      axios(config)
        .then(() => {
          alert("ลบข้อมูลสำเร็จ");
          location.reload();
          // console.log(JSON.stringify(response.data));
        })
        .catch((error) => {
          alert("ลบข้อมูลไม่สำเร็จ");
          console.log(error);
        });
    },

    //--------------------getfaculty----------------------
    getfaculty() {
      // console.log(this.faculty_name)
      var axios = require("axios");
      var qs = require("qs");
      var data = qs.stringify({});
      var config = {
        method: "get",
        url: "http://localhost:3000/getfaculty_signup",
        headers: {},
        data: data,
      };

      axios(config)
        .then((response) => {
          response.data.forEach((element) => {
            this.items2.push({
              value: element.faculty_id,
              text: element.faculty_name,
            });
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },

    insertfaculty() {
      if (this.textfaculty != null) {
        var axios = require("axios");
        var qs = require("qs");
        var data = qs.stringify({
          faculty_name: this.textfaculty,
        });
        var config = {
          method: "post",
          url: "http://localhost:3000/insertfaculty",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          data: data,
        };

        axios(config)
          .then(() => {
            alert("บันทึกข้อมูลสำเร็จ");
            location.reload();
            // console.log(JSON.stringify(response.data));
          })
          .catch((error) => {
            alert("บันทึกข้อมูลไม่สำเร็จ");
            console.log(error);
          });
      } else {
        alert("บันทึกข้อมูลไม่สำเร็จ");
      }
    },

    updatefaculty(item) {
      // console.log(item);
      if (this.form.Editfaculty != null) {
        var axios = require("axios");
        var qs = require("qs");
        var data = qs.stringify({
          faculty_name: this.form.Editfaculty,
          faculty_id: item.value,
        });
        var config = {
          method: "put",
          url: "http://localhost:3000/updatefaculty",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          data: data,
        };

        axios(config)
          .then(() => {
            alert("อัพเดตข้อมูลสำเร็จ");
            location.reload();
            // console.log(JSON.stringify(response.data));
          })
          .catch((error) => {
            alert("อัพเดตข้อมูลไม่สำเร็จ");
            console.log(error);
          });
      } else {
        alert("อัพเดตข้อมูลไม่สำเร็จ");
      }
    },
    deletefaculty(item) {
      var axios = require("axios");
      var qs = require("qs");
      var data = qs.stringify({
        faculty_id: item.value,
      });
      var config = {
        method: "delete",
        url: "http://localhost:3000/deletefaculty",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: data,
      };

      axios(config)
        .then(() => {
          alert("ลบข้อมูลสำเร็จ");
          location.reload();
          // console.log(JSON.stringify(response.data));
        })
        .catch((error) => {
          alert("ลบข้อมูลไม่สำเร็จ");
          console.log(error);
        });
    },

    ///-------------------get program ---------------
    getprogram() {
      // console.log(this.faculty_id)
      var axios = require("axios");
      var qs = require("qs");
      var data = qs.stringify({});
      var config = {
        method: "get",
        url: "http://localhost:3000/getprogram",
        headers: {},
        data: data,
      };

      axios(config)
        .then((response) => {
          // console.log(JSON.stringify(response.data));
          // console.log(this.items3)
          response.data.forEach((element) => {
            this.items3.push({
              Program_id: element.program_id,
              Program: element.program_name,
              FacultyId: element.faculty_id,
            });
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },

    insertprogram() {
      // console.log(this.FacultyId);
      // console.log(this.textprogram);
      if (this.textprogram != null && this.FacultyId != "") {
        var axios = require("axios");
        var qs = require("qs");
        var data = qs.stringify({
          program_name: this.textprogram,
          faculty_id: this.FacultyId,
        });
        var config = {
          method: "post",
          url: "http://localhost:3000/insertprogram",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          data: data,
        };

        axios(config)
          .then(() => {
            alert("บันทึกข้อมูลสำเร็จ");
            location.reload();
            // console.log(JSON.stringify(response.data));
          })
          .catch((error) => {
            alert("บันทึกข้อมูลไม่สำเร็จ");
            location.reload();
            console.log(error);
          });
      } else {
        alert("กรุณากรอกข้อมูลให้ครบ");
      }
    },

    updateprogram(item) {
      console.log(item);
      // console.log(item.value, item.text);
      if (this.form.Editprogram != "") {
        var axios = require("axios");
        var qs = require("qs");
        var data = qs.stringify({
          program_id: item.value,
          program_name: this.form.Editprogram,
        });
        var config = {
          method: "put",
          url: "http://localhost:3000/updateprogram",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          data: data,
        };

        axios(config)
          .then((response) => {
            alert("อัพเดตข้อมูลสำเร็จ");
            location.reload();
            console.log(JSON.stringify(response.data));
          })
          .catch(function (error) {
            alert("อัพเดตข้อมูลไม่สำเร็จ");
            console.log(error);
          });
      } else {
        alert("อัพเดตข้อมูลไม่สำเร็จ");
      }
    },

    deleteprogram(item) {
      console.log(item.value);
      var axios = require("axios");
      var qs = require("qs");
      var data = qs.stringify({
        program_id: item.value,
      });
      var config = {
        method: "delete",
        url: "http://localhost:3000/deleteprogram",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: data,
      };

      axios(config)
        .then(() => {
          alert("ลบข้อมูลสำเร็จ");
          location.reload();
          // console.log(JSON.stringify(response.data));
        })
        .catch((error) => {
          alert("ลบข้อมูลไม่สำเร็จ");
          console.log(error);
        });
    },

    //------------------------------------------
    getfaculty2() {
      this.showTable = false;
      var axios = require("axios");
      var qs = require("qs");
      var data = qs.stringify({});
      var config = {
        method: "get",
        url: "http://localhost:3000/getfaculty_signup",
        headers: {},
        data: data,
      };

      axios(config)
        .then((response) => {
          response.data.forEach((element) => {
            this.faculty.push({
              value: element.faculty_id,
              text: element.faculty_name,
            });
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },

    //---------------------show data table----------------
    getprogram2() {
      this.showTable = true;
      this.program = [];
      var axios = require("axios");
      var qs = require("qs");
      var data = qs.stringify({
        idfaculty: this.form.Faculty_name, // ส่ง id faculty เพื่อเข้าไป query เอาข้อมูล faculty จากฐานข้อมูล
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
            this.program.push({
              value: element.program_id,
              text: element.program_name,
            });
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
};
</script>
<style>
</style>