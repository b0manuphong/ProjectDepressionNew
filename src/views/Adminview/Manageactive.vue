<template>
  <div class="container-fluid">
    <div class="pt-5">
      <h3 class="text-center text-success">ติดตามผล</h3>
      <p></p>
      <div class="card p-2 shadow p-3 mb-5 bg-white rounded">
        <b-container fluid>
          <!-- User Interface controls -->
          <b-row>
            <b-col lg="6" class="my-1">
              <b-form-group
                label="ประเภทการค้นหา"
                label-for="sort-by-select"
                label-cols-sm="3"
                label-align-sm="right"
                label-size="sm"
                class="mb-0"
                v-slot="{ ariaDescribedby }"
              >
                <b-input-group size="sm">
                  <b-form-select
                    id="sort-by-select"
                    v-model="sortBy"
                    :options="sortOptions"
                    :aria-describedby="ariaDescribedby"
                    class="w-75"
                  >
                    <template #first>
                      <option value="">-- ทั้งหมด --</option>
                    </template>
                  </b-form-select>

                  <b-form-select
                    v-model="sortDesc"
                    :disabled="!sortBy"
                    :aria-describedby="ariaDescribedby"
                    size="sm"
                    class="w-25"
                  >
                    <option :value="false">น้อยไปมาก</option>
                    <option :value="true">มากไปน้อย</option>
                  </b-form-select>
                </b-input-group>
              </b-form-group>
            </b-col>
            <b-col lg="6" class="my-1">
              <b-form-group
                label="ค้นหา"
                label-for="filter-input"
                label-cols-sm="3"
                label-align-sm="right"
                label-size="sm"
                class="mb-0"
              >
                <b-input-group size="sm">
                  <b-form-input
                    id="filter-input"
                    v-model="filter"
                    type="search"
                    placeholder="ค้นหา"
                  ></b-form-input>

                  <b-input-group-append>
                    <b-button :disabled="!filter" @click="filter = ''"
                      >ล้างการค้นหา</b-button
                    >
                  </b-input-group-append>
                </b-input-group>
              </b-form-group>
            </b-col>

            <b-col lg="6" class="my-1">
              <b-form-group
                v-model="sortDirection"
                label="ค้นหา"
                description="ให้เลือก สิ่งที่จะค้นหา เช่น Username หรือ รหัสนักศึกษา"
                label-cols-sm="3"
                label-align-sm="right"
                label-size="sm"
                class="mb-0"
                v-slot="{ ariaDescribedby }"
              >
                <b-form-checkbox-group
                  v-model="filterOn"
                  :aria-describedby="ariaDescribedby"
                  class="mt-1"
                >
                </b-form-checkbox-group>
              </b-form-group>
            </b-col>

            <b-col sm="5" md="6" class="my-1">
              <b-form-group
                label="จำนวน"
                label-for="per-page-select"
                label-cols-sm="6"
                label-cols-md="4"
                label-cols-lg="3"
                label-align-sm="right"
                label-size="sm"
                class="mb-0"
              >
                <b-form-select
                  id="per-page-select"
                  v-model="perPage"
                  :options="pageOptions"
                  size="sm"
                ></b-form-select>
              </b-form-group>
            </b-col>

            <b-col sm="7" md="6" class="my-1">
              <b-pagination
                v-model="currentPage"
                :total-rows="totalRows"
                :per-page="perPage"
                align="fill"
                size="sm"
                class="my-0"
              ></b-pagination>
            </b-col>
            <b-col sm="7" md="6" class="my-1">
              <b-button variant="" size="sm" @click="getdownloadalluseractive">
                โหลดข้อมูล
              </b-button>
            </b-col>
          </b-row>

          <!-- Main table element -->
          <b-table
            :items="items"
            :fields="fields"
            :current-page="currentPage"
            :per-page="perPage"
            :filter="filter"
            :filter-included-fields="filterOn"
            :sort-by.sync="sortBy"
            :sort-desc.sync="sortDesc"
            :sort-direction="sortDirection"
            stacked="md"
            show-empty
            small
            @filtered="onFiltered"
          >
            <template #cell(name)="row">
              {{ row.value.first }} {{ row.value.last }}
            </template>

            <template #cell(actions)="row">
              <b-button
                size="sm"
                variant="info"
                @click="info(row.item, row.index, $event.target)"
                class="mr-1"
              >
                แก้ไข
              </b-button>
              <b-button
                variant="danger"
                size="sm"
                @click="delete_item(row.item, row.index, $event.target)"
              >
                ลบ
              </b-button>
                 <b-button
                variant=""
                size="sm"
                @click="onExport(row.item, row.index, $event.target)"
              >
               โหลดข้อมูล
              </b-button>
              <p></p>
            </template>

            <template #row-details="row">
              <b-card>
                <ul>
                  <li v-for="(value, key) in row.item" :key="key">
                    {{ key }}: {{ value }}
                  </li>
                </ul>
              </b-card>
            </template>
          </b-table>

          <!-- Info modal -->
          <b-modal
            :id="infoModal.id"
            :title="infoModal.title"
            ok-only
            @hide="resetInfoModal"
          >
            <pre>{{ infoModal.content }}</pre>
          </b-modal>
        </b-container>
      </div>

      <!-- อัพเดตสถานะข้อมูลนักศึกษา -------->
      <b-modal ref="my-modal" hide-footer title="อัปเดตสถานะ">
        <div class="d-block">
          <b-form-group>
            <label for="input-live">รหัสนักศึกษา :</label>
            <b-form-input
              v-model="editdata.Id"
              placeholder="กรอก รหัส นักศึกษา"
              disabled
            ></b-form-input>
          </b-form-group>
          <b-form-group>
            <label for="input-live">ชื่อ :</label>
            <b-form-input
              v-model="editdata.fristname"
              placeholder="ชื่อ"
              require
              disabled
            ></b-form-input>
          </b-form-group>

          <b-form-group>
            <label for="input-live">นามสกุล :</label>
            <b-form-input
              v-model="editdata.lastname"
              placeholder="นามสกุล"
              disabled
            ></b-form-input>
          </b-form-group>

          <b-form-group>
            <label for="input-live">2Q :</label>
            <b-form-input
              v-model="editdata.scores2Q"
              placeholder="scores2Q"
              disabled
            ></b-form-input>
          </b-form-group>

          <b-form-group>
            <label for="input-live">9Q :</label>
            <b-form-input
              v-model="editdata.scores9Q"
              placeholder="scores9Q"
              disabled
            ></b-form-input>
          </b-form-group>
          <b-form-group>
            <label for="input-live">อาการ :</label>
            <b-form-input
              v-model="editdata.symptoms"
              placeholder="symptoms"
              disabled
            ></b-form-input>
          </b-form-group>

          <b-form-group>
            <label for="input-live">วันเวลา :</label>
            <b-form-input
              v-model="editdata.datatime"
              placeholder="symptoms"
              disabled
            ></b-form-input>
          </b-form-group>

          <b-form-group>
            <label for="input-live">ปีการศึกษา :</label>
            <b-form-input
              v-model="editdata.Phase"
              placeholder="Phase"
              disabled
            ></b-form-input>
          </b-form-group>

          <b-form-group>
            <label for="input-live">สถานะ :</label>
            <b-form-select
              v-model="editdata.trace"
              :options="trace"
              class="mb-3"
            >
            </b-form-select>
          </b-form-group>
        </div>
        <b-button class="mt-3" variant="outline-danger" block @click="hideModal"
          >ปิด</b-button
        >
        <b-button
          class="mt-2"
          variant="outline-warning"
          block
          @click="updatealltrace()"
          >อัพเดต</b-button
        >
      </b-modal>
    </div>
  </div>
</template>

<script>
import XLSX from "xlsx"; // import xlsx
export default {
  data() {
    return {
      form: {},
      items: [],
      fields: [
        {
          key: "student_id",
          label: "รหัสนักศึกษา",
          sortable: true,
        },
        {
          key: "nametitle",
          label: "คำนำหน้า",
          sortable: true,
          sortDirection: "desc",
        },
        {
          key: "fristname",
          label: "ชื่อ",
          sortable: true,
          sortDirection: "desc",
        },
        {
          key: "lastname",
          label: "นามสกุล",
          sortable: true,
          sortDirection: "desc",
        },
        {
          key: "mobile",
          label: "เบอร์โทรศัพท์",
          sortable: true,
        },
        {
          key: "scores2Q",
          label: "2Q",
          sortable: true,
        },
        {
          key: "scores9Q",
          label: "9Q",
          sortable: true,
        },
        {
          key: "symptoms",
          label: "อาการ",
          sortable: true,
        },
        {
          key: "datatime",
          label: "วันเวลา",
          sortable: true,
        },
        {
          key: "Phase",
          label: "ปีการศึกษา",
          sortable: true,
        },
        {
          key: "trace",
          label: "สถานะ",
          sortable: true,
        },

        {
          sortable: true,
          sortByFormatted: true,
          filterByFormatted: true,
        },

        { key: "actions", label: "Actions" },
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 10,
      pageOptions: [10, 50, 100, { value: 500, text: "แสดงทั้งหมด" }],
      sortBy: "",
      sortDesc: false,
      sortDirection: "น้อยไปมาก",
      filter: null,
      filterOn: [],
      infoModal: {
        id: "info-modal",
        title: "",
        content: "",
      },
      is_select: false,
      nametitle: [],
      trace: [],
      history_id: "",
      download:"",
      editdata: {
        Id: "",
        name_title: "",
        fristname: "",
        lastname: "",
        mobile: "",
        Access: "",
        Active: "",
        scores2Q: "",
        scores9Q: "",
        symptoms: "",
        datatime:"",
        Phase: "",
        trace: "",
      
      },
      userdata: [],
      alluserdata:[]
    };
  },
  created() {
    this.getUser_data();
    this.getnametitle();
    this.getadlltrace();
  },
  computed: {
    sortOptions() {
      // console.log(this.fields)
      // Create an options list from our fields
      return this.fields
        .filter((f) => f.sortable)
        .map((f) => {
          return { text: f.label, value: f.key };
        });
    },
  },
  mounted() {
    // Set the initial number of items
    this.totalRows = this.items.length;
    // console.log(this.totalRows)
  },
  methods: {
    getUser_data() {
      // console.log(this.items)
      var axios = require("axios");
      var qs = require("qs");
      var data = qs.stringify({});
      var config = {
        method: "get",
        url: "http://localhost:3000/getallhistoryActive",
        headers: {},
        data: data,
      };

      axios(config)
        .then((response) => {
          response.data.forEach((element) => {
            this.items.push({
              student_id: element.ID,
              nametitle: element.nametitle,
              fristname: element.Firstname,
              lastname: element.Lastname,
              mobile: element.Mobile,
              Access: element.Access,
              faculty: element.faculty_name,
              program: element.program_name,
              username: element.Username,
              password: element.Password,
              Active: element.Active,
              scores2Q: element.sum_question2,
              scores9Q: element.sum_question9,
              symptoms: element.symptom_name,
              datatime: element.createtime,
              Phase: element.phase,
              trace: element.trace_name,
              history_id: element.history_id,
            });
          });
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    onExport(item) {
      // console.log(this.items)
      this.userdata = []
     this.userdata.push(item)
      // console.log(this.userdata)
      const dataWS = XLSX.utils.json_to_sheet(this.userdata);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, dataWS);
      XLSX.writeFile(wb, "ข้อมูลนักศึกษา.xlsx");
    },
    info(item) {
      // console.log(this.item);
      this.editdata.fristname = item.fristname;
      this.editdata.lastname = item.lastname;
      this.editdata.Id = item.student_id;
      this.editdata.mobile = item.mobile;
      this.editdata.username = item.username;
      this.editdata.password = item.password;
      this.editdata.Active = item.Active;
      this.editdata.Access = item.Access;
      this.editdata.scores2Q = item.scores2Q;
      this.editdata.scores9Q = item.scores9Q;
      this.editdata.symptoms = item.symptoms;
      this.editdata.datatime = item.datatime;
      this.editdata.Phase = item.Phase;
      // this.editdata.trace = item.trace;
      this.$refs["my-modal"].show();
    },

    updatedata() {
      if (
        // console.log(item.history_id);
        this.editdata.nametitle != null &&
        this.editdata.fristname != null &&
        this.editdata.lastname != null &&
        this.editdata.student_id != null &&
        this.editdata.faculty != null &&
        this.editdata.program != null &&
        this.editdata.mobile != null &&
        this.editdata.username != null &&
        this.editdata.password != null
      ) {
        var axios = require("axios");
        var qs = require("qs");
        var data = qs.stringify({
          studnetid: this.editdata.student_id,
          username: this.editdata.username,
          password: this.editdata.password,
          fristname: this.editdata.fristname,
          lastname: this.editdata.lastname,
          mobile: this.editdata.mobile,
          program_id: this.editdata.program,
          name_title: this.editdata.nametitle,
          Active: this.editdata.Active,
          sum_question2: this.editdata.scores2Q,
          sum_question9: this.editdata.scores9Q,
          symptom_id: this.editdata.symptoms,
          result: this.editdata.result,
        });
        // console.log(this.editdata);
        var config = {
          method: "put",
          url: "http://localhost:3000/updataUser",
          headers: {
            // "Content-Type": "application/x-www-form-urlencoded",
          },
          data: data,
        };

        axios(config)
          .then(() => {
            // console.log(JSON.stringify(response.data));
            alert("อัพเดตข้อมูลสำเร็จ");
            location.reload();
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        alert("กรุณากรอกข้อมูลให้ครบถ้วน");
      }
    },
    hideModal() {
      this.$refs["my-modal"].hide();
    },
    toggleModal() {
      // We pass the ID of the button that we want to return focus to
      // when the modal has hidden
      this.$refs["my-modal"].toggle("#toggle-btn");
    },

    delete_item(item) {
      // console.log(item.history_id);
      if (confirm("คุณต้องการลบข้อมูลหรือไม่?")) {
        var axios = require("axios");
        var qs = require("qs");
        var data = qs.stringify({
          history_id: item.history_id,
        });
        var config = {
          method: "post",
          url: "http://localhost:3000/deleteusermanageactive",
          headers: {},
          data: data,
        };

        axios(config)
          .then(() => {
            alert("ลบข้อมูลสำเร็จ");
            location.reload();
          })
          .catch(function(error) {
            alert("ลบข้อมูลไม่สำเร็จ");
            location.reload();
            console.log(error);
          });
      }
    },
    resetInfoModal() {
      this.infoModal.title = "";
      this.infoModal.content = "";
    },
    onFiltered(filteredItems) {
      console.log
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },

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
          response.data.forEach((element) => {
            this.nametitle.push({
              value: element.nametitle_id,
              text: element.nametitle,
            });
          });
          // console.log(JSON.stringify(response.data));
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getadlltrace() {
      var axios = require("axios");
      var config = {
        method: "get",
        url: "http://localhost:3000/getadlltrace",
        headers: {},
      };

      axios(config)
        .then((response) => {
          response.data.forEach((element) => {
            this.trace.push({
              value: element.trace_id,
              text: element.trace_name,
            });
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },

    updatealltrace() {
      // console.log(this.editdata.trace);
      if (this.editdata.trace != "") {
        var axios = require("axios");
        var qs = require("qs");
        var data = qs.stringify({
          trace_id: this.editdata.trace,
          id: this.editdata.Id,
        });
        var config = {
          method: "put",
          url: "http://localhost:3000/updateadlltrace",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          data: data,
        };

        axios(config)
          .then(function() {
            alert("อัพเดตข้อมูลสำเร็จ");
            location.reload();
            // console.log(JSON.stringify(response.data));
          })
          .catch(function(error) {
            alert("อัพเดตข้อมูลไม่สำเร็จ");
            console.log(error);
          });
      } else {
        alert("กรุณากรอกข้อมูลให้ครบ");
      }
    },
    getdownloadalluseractive(){
      if(this.filter == null){
        const dataWS = XLSX.utils.json_to_sheet(this.items);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, dataWS);
        XLSX.writeFile(wb, "ข้อมูลนักศึกษาทั้งหมด.xlsx");
      }else{
        console.log(this.filter);
        var axios = require('axios');
        var qs = require('qs');
        var data = qs.stringify({
            'id': this.filter
    });
      var config = {
      method: 'post',
      url: 'http://localhost:3000/getdownloadalluseractive',
      headers: { 
          'Content-Type': 'application/x-www-form-urlencoded'
      },
      data : data
    };
    axios(config)
    .then((response)=> {
      const dataWS = XLSX.utils.json_to_sheet(response.data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, dataWS);
      XLSX.writeFile(wb, "ข้อมูลนักศึกษาทั้งหมด.xlsx");
      console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
});

    }
      }
    
  },
};
</script>

<style></style>
