<template>
  <div class="pt-5">
    <img
      src="@/assets/mju-logo.png"
      class="rounded mx-auto d-block"
      alt="..."
      width="150"
      height="150"
    />
    <div class="container text-center">
      <h1 class="h1 text-bold">
        Depression Screening System
        <h4>for Students of Maejo University</h4>
      </h1>
      <p></p>
      <h5 class="text-gray-soft text-regular">
        ระบบคัดกรองภาวะโรคซึมเศร้า นักศึกษามหาวิทยาลัยแม่โจ้
      </h5>
      <br />
    </div>    
    <h2 class="text-center">เข้าสู่ระบบ</h2>
    <div class="container col-sm-3">
      ชื่อผู้ใช้ <span class="text-danger">*</span> :
      <b-form-group id="username" label-for="input-username">
        <b-form-input
          id="username"
          v-model="user.Username"
          placeholder="60xxxxxxxx"
          autofocus
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group id="password" label-for="input-password">
        รหัสผ่าน <span class="text-danger">*</span> :
        <b-form-input
          id="password"
          type="password"
          v-model="user.Password"
          placeholder="รหัสผ่าน"
          required
          @keydown.enter="handleLogin"
        ></b-form-input>
      </b-form-group>
      <div>
        <b-button block variant="info" @click="handleLogin()"
          >เข้าสู่ระบบ</b-button
        >
        <b-button block variant="danger">ยกเลิก</b-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        Username: "",
        Password: "",
      },
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },

  created() {
    if (this.loggedIn) {
      this.$router.push("/Home");
    }
  },
  methods: {
    handleLogin() {
      console.log(this.user.Username)
      console.log(this.user.Password)
      if (this.user.Username.length != 0 && this.user.Password.length != 0) {
        // this.user.Username.toUpperCase();
        this.$store.dispatch("auth/login", this.user).then(
          () => {
            this.$router.go("/Home");
          },
          () => {
            alert("ชื่อผู้ใช้ หรือ รหัสผ่านของท่านไม่ถูกต้อง");
          }
        );
      } else {
        alert("ท่านยังไม่ได้กรอกข้อมูล");
      }
    },
  },
};
</script>

