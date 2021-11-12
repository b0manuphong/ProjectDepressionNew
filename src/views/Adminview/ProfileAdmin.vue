<template>
  <div class="container pt-5">
    <h3 class="text-center text-success">
      ข้อมูลส่วนตัว <strong>แอดมิน</strong>
    </h3>
    <p></p>
    <div class="container col-sm-5 shadow p-3 mb-5 bg-white rounded">
      <b-list-group class="text-success">
        <!-- <div align="right"><EditProfile /></div> -->
        <b-list-group
          ><strong>ชื่อ</strong>
          <b-list-group-item variant="success">{{
            form.fristname
          }}</b-list-group-item>
        </b-list-group>
        <p></p>
        <b-list-group>
          <strong>นามสกุล</strong>
          <b-list-group-item variant="success">{{
            form.lastname
          }}</b-list-group-item></b-list-group
        >
        <p></p>
        <b-list-group>
          <strong>ชื่อผู้ใช้</strong>
          <b-list-group-item variant="success">{{
            form.username
          }}</b-list-group-item></b-list-group
        >
        <p></p>
        <!--  <b-list-group>
          <strong>รหัสผ่าน</strong>
          <b-list-group-item variant="success">{{
            form.password
          }}</b-list-group-item></b-list-group
        >
        <p></p> -->
        <b-list-group>
          <strong>เบอร์โทรศัพท์</strong>
          <b-list-group-item variant="success">{{
            form.mobile
          }}</b-list-group-item></b-list-group
        >
        <p></p>
        <b-list-group>
          <strong>อีเมล</strong>
          <b-list-group-item variant="success">{{
            form.email
          }}</b-list-group-item></b-list-group
        >
        <p></p>
        <b-list-group
          ><strong>สถานะ</strong>
          <b-list-group-item variant="success">{{
            form.status
          }}</b-list-group-item></b-list-group
        >
      </b-list-group>
      <p></p>
      <!-- <div class="text-center">
        <b-button id="show-btn" @click="showModal" variant="success"
          >แก้ไข</b-button
        >
      </div> -->
    </div>
    <div>
      <b-modal ref="my-modal" hide-footer title="แก้ไขข้อมูลส่วนตัว">
        <div class="d-block">
          <div class="container col-sm-15">
            <b-list-group>
              <!-- <div align="right"><EditProfile /></div> -->
              <b-list-group
                ><strong>ชื่อ</strong>
                <b-form-input v-model="form.fristname"></b-form-input>
              </b-list-group>
              <p></p>
              <b-list-group>
                <strong>นามสกุล</strong>
                <b-form-input v-model="form.lastname"></b-form-input
              ></b-list-group>
              <p></p>
              <b-list-group>
                <strong>ชื่อผู้ใช้</strong>
                <b-form-input v-model="form.username"></b-form-input
              ></b-list-group>
              <p></p>
              <b-list-group>
                <strong>รหัสผ่าน</strong>
                <b-form-input v-model="form.password"></b-form-input
              ></b-list-group>
              <p></p>
              <b-list-group>
                <strong>เบอร์โทรศัพท์</strong>
                <b-form-input v-model="form.mobile"></b-form-input
              ></b-list-group>
              <p></p>
              <b-list-group
                ><strong>สถานะ</strong>
                <b-form-input v-model="form.status"></b-form-input
              ></b-list-group>
            </b-list-group>
          </div>
        </div>
        <div class="container">
          <b-button class="mt-3" variant="info" block @click="hideModal"
            >ยืนยัน</b-button
          >
          <b-button class="mt-2" variant="danger" block @click="toggleModal"
            >ปิด</b-button
          >
        </div>
      </b-modal>
    </div>
  </div>
</template>

<script>
// import EditProfile from "../Adminview/EditProfile.vue";
export default {
  data() {
    return {
      form: {
        fristname: "",
        lastname: "",
        username: "",
        password: "",
        mobile: "",
        status: "",
        email:"",
      },
      showdata2: [],
    };
  },
  components: {
    // EditProfile,
  },
  created() {
    this.getdata();
  },
  methods: {
    async getdata() {
      this.current_data = await this.$store.state.auth.user;
      // console.log(this.current_data);
      this.showdata2.push(this.$store.state.auth.user);
      // console.log(this.current_data);
      this.form.fristname = this.current_data.First_name;
      this.form.lastname = this.current_data.Last_name;
      this.form.username = this.current_data.User_name;
      this.form.password = this.current_data.Pass_word;
      this.form.mobile = this.current_data.Mobile;
      this.form.email =this.current_data.Email;
      this.form.status = this.current_data.role_id;
    },

    showModal() {
      this.$refs["my-modal"].show();
    },
    hideModal() {
      this.$refs["my-modal"].hide();
    },
    toggleModal() {
      // We pass the ID of the button that we want to return focus to
      // when the modal has hidden
      this.$refs["my-modal"].toggle("#toggle-btn");
    },
  },
};
</script>

<style></style>
