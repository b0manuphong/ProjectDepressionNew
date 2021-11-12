<template>
  <div class="container-fluid">
    <div class="pt-5">
      <h3 class="text-center text-success">จัดการผู้ดูแลระบบ</h3>
      <p></p>
      <div class="card p-2 shadow p-3 mb-5 bg-white rounded">
        <b-container fluid>
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
              <!-- <b-button
                variant="danger"
                size="sm"
                @click="delete_item(row.item, row.index, $event.target)"
              >
                ลบ
              </b-button> -->
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

      <!-- แก้ไขข้อมูลผู้ดูแลระบบ ------------------------------------------->
      <b-modal ref="my-modal" hide-footer title="แก้ไขข้อมูลผู้ดูแลระบบ">
        <div class="d-block">
          <b-form-group id="input-group-3" label="คำนำหน้า :">
            <b-form-select
              v-model="editdata.name_title"
              :options="nametitle"
              required
            ></b-form-select>
          </b-form-group>

          <b-form-group>
            <label for="input-live">ชื่อ :</label>
            <b-form-input
              v-model="editdata.firstname"
              placeholder="ชื่อ"
              require
            ></b-form-input>
          </b-form-group>

          <b-form-group>
            <label for="input-live">นามสกุล :</label>
            <b-form-input
              v-model="editdata.lastname"
              placeholder="นามสกุล"
              required
            ></b-form-input>
          </b-form-group>

          <!-- <b-form-group>
            <label for="input-live">รหัสนักศึกษา :</label>
            <b-form-input
              v-model="editdata.id"
              placeholder="กรอก รหัส นักศึกษา"
              require
              autofocus
            ></b-form-input>
          </b-form-group> -->

          <!-- <b-row>
            <b-col>
              <b-list-group>
                <div>
                  คณะ
                  <b-form-select
                    v-model="editdata.faculty_name"
                    :options="faculty"
                    class="mb-3"
                    @change="getprogram()"
                    :disabled="is_select"
                  >
                  </b-form-select>
                </div>
              </b-list-group>
            </b-col>
            <b-col>
              <b-list-group>
                <div>
                  สาขา
                  <b-form-select
                    v-model="editdata.program_id"
                    :options="program"
                    class="mb-3"
                  >
                  </b-form-select>
                </div> </b-list-group
            ></b-col>
          </b-row> -->

          <b-form-group>
            <label for="input-live">เบอร์โทรศัพท์ :</label>
            <b-form-input
              v-model="editdata.mobile"
              placeholder="เบอร์โทรศัพท์ "
              require
              autofocus
            ></b-form-input>
          </b-form-group>

          <b-form-group>
            <label for="input-live">ชื่อผู้ใช้ :</label>
            <b-form-input
              v-model="editdata.username"
              placeholder="Username"
              require
              autofocus
            ></b-form-input>
          </b-form-group>

          <b-form-group>
            <label for="input-live">รหัสผ่าน :</label>
            <b-form-input
              v-model="editdata.password"
              placeholder="Password"
              require
              autofocus
            ></b-form-input>
          </b-form-group>

          <!-- <b-form-group>
            <label for="input-live">รหัสผ่าน :</label>
            <b-form-input
              v-model="editdata.email"
              placeholder="email"
              require
              autofocus
            ></b-form-input>
          </b-form-group> -->
        </div>
        <b-button class="mt-3" variant="outline-danger" block @click="hideModal"
          >ปิด</b-button
        >
        <b-button
          class="mt-2"
          variant="outline-warning"
          block
          @click="updatedata()"
          >อัพเดต</b-button
        >
      </b-modal>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {},
      items: [],
      fields: [
        {
          key: "nametitle",
          label: "คำนำหน้า",
          sortable: true,
          sortDirection: "desc",
        },
        {
          key: "firstname",
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
          sortable: true,
          sortByFormatted: true,
          filterByFormatted: true,
        },
        {
          key: "username",
          label: "ชื่อผู้ใช้",
          sortable: true,
        },
        // {
        //   key: "password",
        //   label: "รหัสผ่าน",
        //   sortable: true,
        // },
        // {
        //   key: "email",
        //   label: "อีเมล",
        //   sortable: true,
        // },
        { key: "actions", label: "Actions" },
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 10,
      // pageOptions: [10, 50, 100, { value: 500, text: "แสดงทั้งหมด" }],
      sortBy: "",
      sortDesc: false,
      sortDirection: "asc",
      filter: null,
      filterOn: [],
      infoModal: {
        id: "info-modal",
        title: "",
        content: "",
      },
      is_select: false,
      nametitle: [],
      faculty: [],
      program: [],

      //---------------ข้อมูลตรงปุ่มแก้ไข--------------
      editdata: {
        name_title: "",
        firstname: "",
        lastname: "",
        id: "",
        // faculty_name: "",
        // program_id: "",
        mobile: "",
        username: "",
        password: "",
        // email: "",
      },
    };
  },
  created() {
    this.getUser_data();
    this.getnametitle();
    // this.getfaculty();
  },
  computed: {
    sortOptions() {
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
  },
  methods: {
    info(item) {
      console.log(item);
      this.editdata.firstname = item.firstname;
      this.editdata.lastname = item.lastname;
      this.editdata.id = item.id;
      this.editdata.mobile = item.mobile;
      this.editdata.username = item.username;
      this.editdata.password = item.password;
      // this.editdata.email = item.email;
      this.$refs["my-modal"].show();
    },

    updatedata() {
      console.log(this.editdata.name_title);
      console.log(this.editdata.firstname);
      console.log(this.editdata.lastname);
      console.log(this.editdata.id);
      // console.log(this.editdata.faculty_name);
      // console.log(this.editdata.program_id);
      console.log(this.editdata.mobile);
      console.log(this.editdata.username);
      console.log(this.editdata.password);
      // console.log(this.editdata.email);
      if (
        this.editdata.name_title != "" &&
        this.editdata.firstname != "" &&
        this.editdata.lastname != "" &&
        this.editdata.id != "" &&
        // this.editdata.faculty_name != "" &&
        // this.editdata.program_id != "" &&
        this.editdata.mobile != "" &&
        this.editdata.username != "" &&
        this.editdata.password != ""
      ) {
        var axios = require("axios");
        var qs = require("qs");
        var data = qs.stringify({
          id: this.editdata.id,
          username: this.editdata.username,
          password: this.editdata.password,
          firstname: this.editdata.firstname,
          lastname: this.editdata.lastname,
          mobile: this.editdata.mobile,
          // program_id: this.editdata.program_id,
          name_title: this.editdata.name_title,
          // email: this.editdata.email,
        });
        // console.log(this.editdata);
        var config = {
          method: "put",
          url: "http://localhost:3000/updataadmin",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
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
      // console.log(item);
      if (confirm("คุณต้องการลบข้อมูลหรือไม่?")) {
        // Save it!
        // console.log("Thing was saved to the database.");
        var axios = require("axios");
        var qs = require("qs");
        var data = qs.stringify({
          studnet_code: item.id,
        });
        var config = {
          method: "delete",
          url: "http://localhost:3000/deleteUser",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          data: data,
        };

        axios(config)
          .then(() => {
            // console.log(JSON.stringify(response.data));
            alert("ลบข้อมูลสำเร็จ");
            location.reload();
          })
          .catch(function (error) {
            console.log(error);
          });
      } else {
        // Do nothing!
        // console.log("Thing was not saved to the database.");
      }
    },
    resetInfoModal() {
      this.infoModal.title = "";
      this.infoModal.content = "";
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    ///-------------------get user ตรงหน้าแรก-------
    getUser_data() {
      var axios = require("axios");

      var config = {
        method: "get",
        url: "http://localhost:3000/getadmin",
        headers: {},
      };

      axios(config)
        .then((response) => {
          response.data.forEach((element) => {
            // console.log(element);
            this.items.push({
              id: element.ID,
              mobile: element.Mobile,
              nametitle: element.nametitle,
              faculty: element.faculty_name,
              program: element.program_name,
              username: element.Username,
              password: element.Password,
              firstname: element.Firstname,
              lastname: element.Lastname,
              // email: element.email,
            });
          });
        })
        .catch(function (error) {
          console.log(error);
        });
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
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style></style>
