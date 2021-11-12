<!--<template>
<div>
    <b-button id="show-btn" @click="showModal" variant="success"
      >แก้ไข</b-button
    >

     <b-modal ref="my-modal" hide-footer title="แก้ไขข้อมูลส่วนตัว">
      <div class="d-block">
        <div class="container col-sm-15">
          <b-list-group>
            <div align="right"><EditProfile /></div>
            <b-form-group id="input-group-3" label="คำนำหน้า :">
            <b-form-select
              v-model="editdata.name_title"
              :options="nametitle"
              required
            ></b-form-select>
          </b-form-group>
            <p></p>
            <b-list-group>
              <strong>ชื่อ</strong>
              <b-form-input
                v-model="form.firstname"
                placeholder="ชื่อ :"
              ></b-form-input
            ></b-list-group>
            <p></p>
            <b-list-group>
              <strong>นามสกุล</strong>
              <b-form-input
                v-model="form.lastname"
                placeholder="นามสกุล :"
              ></b-form-input
            ></b-list-group>
            <p></p>
            <b-list-group>
              <strong>เบอร์โทรศัพท์</strong>
              <b-form-input+
                v-model="form.mobile"
                placeholder="เบอร์โทร :"
              ></b-form-input+
            ></b-list-group>
            <p></p>
            <b-list-group>
              <strong>ชื่อผู้ใช้</strong>
              <b-form-input
                v-model="form.username"
                placeholder="ชื่อผู้ใช้ :"
                disabled
              ></b-form-input
            ></b-list-group>
            <p></p>
            <b-list-group>
              <strong>รหัสผ่าน</strong>
              <b-form-input
                v-model="form.password"
                placeholder="รหัสผ่าน :"
              ></b-form-input
            ></b-list-group>

            <p></p>
            <b-list-group>
              <strong>อีเมล</strong>
              <b-form-input
                v-model="form.email"
                placeholder="อีเมล :"
              ></b-form-input
            ></b-list-group>
            <p></p>
            <p></p>

            <b-list-group>
              <div>
                คณะ
                <b-form-select
                  v-model="form.faculty_name"
                  :options="faculty"
                  class="mb-3"
                  @change="getprogram()"
                  :disabled="is_select"
                >
                </b-form-select>
              </div>
            </b-list-group>
            <p></p>
            <b-list-group>
              <div>
                สาขา
                <b-form-select
                  v-model="form.program_name"
                  :options="program"
                  class="mb-3"
                >
                </b-form-select>
              </div>
            </b-list-group>
            <p></p>
          </b-list-group>
        </div>
      </div>
      <div class="container">
        <b-button class="mt-3" variant="info" block @click="showModal()"
          >ยืนยัน</b-button
        >
        <b-button class="mt-2" variant="danger" block @click="hideModal()"
          >ปิด</b-button
        >
      </div>
    </b-modal>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        name_title: null,
        firstname: null,
        lastname: null,
        mobile: null,
        faculty_name: null,
        program_name: null,
        email: null,
        username: null,
        password: null,
      },
      nametitle: [],
      faculty: [],
      program: [],
      showdata2: [],
      is_select: false,
    };
  },
  created() {
    this.getdata();
    this.getfaculty();
    this.getnametitle();
    this.getupdate_user();
  },
  methods: {
    async getdata() {
      this.current_data = await this.$store.state.auth.user;
      console.log(this.current_data);
      this.showdata2.push(this.$store.state.auth.user);
      console.log(this.showdata2[0]);
      // this.form.name_title = this.showdata2[0].Nametitle_name;
      this.form.firstname = this.showdata2[0].First_name;
      this.form.lastname = this.showdata2[0].Last_name;
      this.form.mobile = this.showdata2[0].Mobile;
      // this.form.faculty_name = this.showdata2[0].faculty;
      // this.form.program_name = this.showdata2[0].program_name;
      this.form.email = this.showdata2[0].Email;
      this.form.username = this.showdata2[0].User_name;
      this.form.password = this.showdata2[0].Pass_word;
    },
   showModal() {
      this.$refs["my-modal"].show();
    },
    hideModal() {
      this.$refs["my-modal"].hide();
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
        // console.log(this.nametitle_id)
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

    getprogram() {
      this.is_select = true;
      let user = JSON.parse(localStorage.getItem("user"));
      // console.log(user);
      // console.log(this.form.faculty_name);
      var axios = require("axios");
      var qs = require("qs");
      var data = qs.stringify({
        idfaculty: this.form.faculty_name,
      });
      var config = {
        method: "post",
        url: "http://localhost:3000/getprogram",
        headers: {
          "x-access-token": user.token,
        },
        data: data,
      };

      axios(config)
        .then((response) => {
          // console.log(JSON.stringify(response.data));
          response.data.forEach((element) => {
            this.program.push({
              value: element.program_id,
              text: element.program_name,
            });
          });
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    update_user() {
      console.log(this.form.username);
      console.log(this.form.password);
      console.log(this.form.firstname);
      console.log(this.form.lastname);
      console.log(this.form.mobile);
      console.log(this.form.email);
      console.log(this.form.name_title);
      console.log(this.form.faculty_name);
      console.log(this.form.program_name);
      console.log(this.current_data.Id);
      if (
        this.form.username.length != 0 &&
        this.form.password.length != 0 &&
        this.form.firstname.length != 0 &&
        this.form.lastname.length != 0 &&
        this.form.mobile.length != 0 &&
        this.form.email.length != 0 &&
        this.form.name_title != null &&
        this.form.faculty_name != null &&
        this.form.program_name != null &&
        this.current_data.Id.length != 0
      ) {
        var axios = require("axios");
        var qs = require("qs");
        var data = qs.stringify({
          username: this.form.username,
          password: this.form.password,
          firstname: this.form.firstname,
          lastname: this.form.lastname,
          mobile: this.form.mobile,
          email: this.form.email,
          nametitle_id: this.form.name_title,
          program_id: this.form.program_name,
          id_up: this.current_data.Id,
        });
        var config = {
          method: "put",
          url: "http://localhost:3000/update_user",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          data: data,
        };

        axios(config)
          .then((response) => {
            alert("อัพเดทข้อมูลสำเร็จ");
            location.reload();
            console.log(JSON.stringify(response.data));
          })
          .catch(function(error) {
            alert("อัพเดทข้อมูลไม่สำเร็จ");
            location.reload();
            console.log(error);
          });
      } else {
        alert("กรุณากรอกข้อมูลให้ครบ");
      }
    },
    getupdate_user() {
      let user = JSON.parse(localStorage.getItem("user"));
      // console.log(localStorage.getItem("user"));
      console.log(user.Id);
      var axios = require("axios");
      var qs = require("qs");
      var data = qs.stringify({
        id: user.Id,
      });

      var config = {
        method: "post",
        url: "http://localhost:3000/getupdate_user",
        headers: {
          "x-access-token": user.token,
        },
        data: data,
      };
      axios(config)
        .then((response) => {
          this.form = {
            name_title: null,
            firstname: null,
            lastname: null,
            mobile: null,
            faculty_name: null,
            program_name: null,
            email: null,
            username: null,
            password: null,
          };
          // console.log(this.form.name_title);
          this.getdata();
          localStorage.removeItem("user");
          localStorage.setItem("user", JSON.stringify(response.data));
        })

        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
-->

<template>
  <div>
    <b-button id="show-btn" @click="showModal" variant="success"
      >แก้ไข</b-button
    >
    <b-modal ref="my-modal" hide-footer title="แก้ไขข้อมูลส่วนตัว">
      <div class="d-block">
        <b-form-group id="input-group-3" label="คำนำหน้า">
          <b-form-select
            v-model="form.name_title"
            :options="nametitle"
            required
          ></b-form-select>
          <p></p>
          <b-list-group>
            <strong>ชื่อ</strong>
            <b-form-input
              v-model="form.firstname"
              placeholder="ชื่อ :"
            ></b-form-input
          ></b-list-group>
          <p></p>
          <b-list-group>
            <strong>นามสกุล</strong>
            <b-form-input
              v-model="form.lastname"
              placeholder="นามสกุล :"
            ></b-form-input
          ></b-list-group>
          <p></p>
          <b-list-group>
            <strong>เบอร์โทรศัพท์</strong>
            <b-form-input
              v-model="form.mobile"
              placeholder="เบอร์โทรศัพท์ :"
            ></b-form-input
          ></b-list-group>
          <p></p>
          <b-list-group>
            <strong>ชื่อผู้ใช้</strong>
            <b-form-input
              v-model="form.username"
              placeholder="ชื่อผู้ใช้ :"
            ></b-form-input
          ></b-list-group>
          <p></p>
          <b-list-group>
            <strong>รหัสผ่าน</strong>
            <b-form-input
              v-model="form.password"
              placeholder="รหัสผ่าน :"
            ></b-form-input
          ></b-list-group>
          <p></p>
          <b-list-group>
            <strong>อีเมล</strong>
            <b-form-input
              v-model="form.email"
              placeholder="อีเมล :"
            ></b-form-input
          ></b-list-group>
          <p></p>
          <b-list-group>
            <div>
              คณะ
              <b-form-select
                v-model="form.faculty_name"
                :options="faculty"
                class="mb-3"
                @change="getprogram()"
                :disabled="is_select"
              >
              </b-form-select>
            </div>
          </b-list-group>
          <p></p>
          <b-list-group>
            <div>
              สาขา
              <b-form-select
                v-model="form.program_name"
                :options="program"
                class="mb-3"
              >
              </b-form-select>
            </div>
          </b-list-group>
          <p></p>
        </b-form-group>
      </div>
      <div class="container">
        <b-button class="mt-3" variant="info" block @click="update_user()"
          >อัพเดท</b-button
        >
        <b-button class="mt-2" variant="danger" block @click="hideModal()"
          >ปิด</b-button
        >
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name_title: null,
        firstname: null,
        lastname: null,
        mobile: null,
        faculty_name: null,
        program_name: null,
        email: null,
        username: null,
        password: null,
      },
      nametitle: [],
      faculty: [],
      program: [],
      showdata2: [],
      is_select: false,
    };
  },
  created() {
    this.getdata();
    this.getfaculty();
    this.getnametitle();
    this.getupdate_user();
  },
  methods: {
    async getdata() {
      this.current_data = await this.$store.state.auth.user;
      console.log(this.current_data);
      this.showdata2.push(this.$store.state.auth.user);
      console.log(this.showdata2[0]);
      // this.form.name_title = this.showdata2[0].Nametitle_name;
      this.form.firstname = this.showdata2[0].First_name;
      this.form.lastname = this.showdata2[0].Last_name;
      this.form.mobile = this.showdata2[0].Mobile;
      // this.form.faculty_name = this.showdata2[0].faculty;
      // this.form.program_name = this.showdata2[0].program_name;
      this.form.email = this.showdata2[0].Email;
      this.form.username = this.showdata2[0].User_name;
      this.form.password = this.showdata2[0].Pass_word;
    },
    showModal() {
      this.$refs["my-modal"].show();
    },
    hideModal() {
      this.$refs["my-modal"].hide();
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
    getprogram() {
      this.is_select = true;
      let user = JSON.parse(localStorage.getItem("user"));
      console.log(user);
      // console.log(this.form.faculty_name);
      var axios = require("axios");
      var qs = require("qs");
      var data = qs.stringify({
        idfaculty: this.form.faculty_name,
      });
      var config = {
        method: "post",
        url: "http://localhost:3000/getprogram",
        headers: {
          "x-access-token": user.token,
        },
        data: data,
      };

      axios(config)
        .then((response) => {
          // console.log(JSON.stringify(response.data));
          response.data.forEach((element) => {
            this.program.push({
              value: element.program_id,
              text: element.program_name,
            });
          });
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    update_user() {
      console.log(this.form.username);
      console.log(this.form.password);
      console.log(this.form.firstname);
      console.log(this.form.lastname);
      console.log(this.form.mobile);
      console.log(this.form.email);
      console.log(this.form.name_title);
      console.log(this.form.faculty_name);
      console.log(this.form.program_name);
      console.log(this.current_data.Id);
      if (
        this.form.username.length != 0 &&
        this.form.password.length != 0 &&
        this.form.firstname.length != 0 &&
        this.form.lastname.length != 0 &&
        this.form.mobile.length != 0 &&
        this.form.email.length != 0 &&
        this.form.name_title != null &&
        this.form.faculty_name != null &&
        this.form.program_name != null &&
        this.current_data.Id.length != 0
      ) {
        console.log(this.form.password)
        var axios = require("axios");
        var qs = require("qs");
        var data = qs.stringify({
          username: this.form.username,
          password: this.form.password,
          firstname: this.form.firstname,
          lastname: this.form.lastname,
          mobile: this.form.mobile,
          email: this.form.email,
          nametitle_id: this.form.name_title,
          program_id: this.form.program_name,
          id_up: this.current_data.Id,
        });
        var config = {
          method: "put",
          url: "http://localhost:3000/update_user",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          data: data,
        };

        axios(config)
          .then((response) => {
            alert("อัพเดทข้อมูลสำเร็จ");
            location.reload();
            console.log(JSON.stringify(response.data));
          })
          .catch(function(error) {
            alert("อัพเดทข้อมูลไม่สำเร็จ");
            location.reload();
            console.log(error);
          });
      } else {
        alert("กรุณากรอกข้อมูลให้ครบ");
      }
    },

    // getUser_data() {
    //   var axios = require("axios");
    //   var config = {
    //     method: "get",
    //     url: "http://localhost:3000/getallUseractive",
    //     headers: {},
    //   };

    //   axios(config)
    //     .then((response) => {
    //       response.data.forEach((element) => {
    //         // console.log(element);
    //         this.items.push({
    //           id: element.ID,
    //           mobile: element.Mobile,
    //           nametitle: element.nametitle,
    //           faculty: element.faculty_name,
    //           program: element.program_name,
    //           username: element.Username,
    //           password: element.Password,
    //           firstname: element.Firstname,
    //           lastname: element.Lastname,
    //         });
    //       });
    //     })
    //     .catch(function(error) {
    //       console.log(error);
    //     });
    // },
    getupdate_user() {
      let user = JSON.parse(localStorage.getItem("user"));
      // console.log(localStorage.getItem("user"));
      console.log(user.Id);
      var axios = require("axios");
      var qs = require("qs");
      var data = qs.stringify({
        id: user.Id,
      });

      var config = {
        method: "post",
        url: "http://localhost:3000/getupdate_user",
        headers: {
          "x-access-token": user.token,
        },
        data: data,
      };
      axios(config)
        .then((response) => {
          this.form = {
            name_title: null,
            firstname: null,
            lastname: null,
            mobile: null,
            faculty_name: null,
            program_name: null,
            email: null,
            username: null,
            password: null,
          };
          // console.log(this.form.name_title);
          this.getdata();
          localStorage.removeItem("user");
          localStorage.setItem("user", JSON.stringify(response.data));
        })

        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
--
