<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="secondary">
      <div>
        <b-button v-if="userstatus == ' admin'" v-b-toggle.sidebar-backdrop
          ><b-icon icon="sliders"></b-icon
        ></b-button>
        <b-sidebar
          id="sidebar-backdrop"
          title="DEPRESSION Admin"
          backdrop-variant="dark"
          backdrop
          shadow
          text-variant="success"
        >
          <hr />
          <div>
            <b-nav vertical class="p-2">
              <div>
                <b-nav vertical class="w-55">
                  <b-nav-item href="/AdminHome">แดชบอร์ด</b-nav-item>
                  <b-nav-item href="/ManageAdmin">จัดการผู้ดูแลระบบ</b-nav-item>
                  <b-nav-item href="/ManageUser">จัดการผู้ใช้งาน</b-nav-item>
                  <b-nav-item href="/Manageactive">ติดตามผล</b-nav-item>
                  <b-nav-item href="/Setting">ตั้งค่า</b-nav-item>
                  <!-- <b-nav-item href="/TableUser">Table</b-nav-item> -->
                </b-nav>
              </div>
            </b-nav>
          </div>
          <template #footer="{ hide }">
            <div class="d-flex bg-dark text-light align-items-center px-3 py-2">
              <strong class="mr-auto">ออกจากระบบ</strong>
              <b-button @click="logOut()" size="sm" class="btn btn-danger"
                >ออกจากระบบ</b-button
              >
              <b-button size="sm" @click="hide" class="close"></b-button>
            </div>
          </template>
        </b-sidebar>
      </div>
      <b-navbar-brand href="#" v-if="userstatus !== ' admin'">
        <img src="@/assets/mju-logo.png" width="45" alt="Kitten" />
        ระบบคักกรองภาวะซึมเศร้า</b-navbar-brand
      >
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav
          v-show="show_btn"
          class="ml-auto"
          v-if="userstatus !== ' admin'"
        >
          <b-navbar-nav>
            <b-nav-item href="/Home" active>หน้าหลัก</b-nav-item>
            <b-nav-item href="/Profile" active>ข้อมูลส่วนตัว</b-nav-item>
            <b-nav-item href="/History" active
              >ประวัติกรอกแบบประเมิน</b-nav-item
            >
            <b-nav-item href="/News" active>ภาวะโรคซึมเศร้า</b-nav-item>
            <b-nav-item href="/Contact" active>ติดต่อเรา</b-nav-item>

            <b-nav-item href="#" active>
              สวัสดี :
              <strong>{{ this.firstname }} {{ this.lastname }}</strong>
            </b-nav-item>
          </b-navbar-nav>
        </b-navbar-nav>
        <b-navbar-nav
          v-show="show_btn"
          class="ml-auto"
          v-if="userstatus == ' admin'"
        >
          <b-navbar-nav>
            <b-nav-item href="/Home" active>หน้าหลัก</b-nav-item>
            <b-nav-item href="/ProfileAdmin" active>ข้อมูลส่วนตัว</b-nav-item>
            <b-nav-item href="#" active
              >สวัสดี แอดมิน :
              <strong
                >{{ this.firstname }} {{ this.lastname }}</strong
              ></b-nav-item
            >
            <!-- <b-nav-item href="/Profile" active>ข้อมูลส่วนตัว</b-nav-item>            -->
          </b-navbar-nav>
        </b-navbar-nav>
        <b-button
          v-show="show_btn"
          variant="outline-light"
          v-if="userstatus !== ' admin'"
          @click="logOut()"
          >ออกจากระบบ</b-button
        >
        <b-button
          class="ml-auto"
          right
          v-show="show_btn2"
          variant="outline-light"
          @click="Signin_page()"
          >เข้าสู่ระบบ</b-button
        >
        <p></p>
        <b-button
          class="mr-1"
          right
          v-show="show_btn2"
          variant="outline-light"
          @click="Signup_page()"
          >ลงทะเบียน</b-button
        >
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      CurrentUser: null,
      show_btn: false,
      show_btn2: true,
      userstatus: "",
      firstname: "",
      lastname: "",
    };
  },
  created() {
    this.CurrentUser = this.$store.state.auth.user;
    this.userstatus = this.$store.state.auth.user.role_id;
    this.firstname = this.$store.state.auth.user.First_name;
    this.lastname = this.$store.state.auth.user.Last_name;
    console.log(this.$store.state.auth.user);

    if (this.CurrentUser) {
      this.show_btn = true;
      this.show_btn2 = false;
    }
  },
  methods: {
    logOut() {
      this.userstatus = "";
      this.$store.dispatch("auth/logout");
      this.show_btn = false;
      this.show_btn2 = true;
      this.$router.push("/Signin");
    },
    Signin_page() {
      this.$router.push("/Signin");
    },
    Signup_page() {
      this.$router.push("/");
    },
    AdminHome() {
      this.$router.push("/AdminHome");
    },
    ManagerUser() {
      this.$router.push("/ManagerUser");
    },
  },
};
</script>

<style></style>
