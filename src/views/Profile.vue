<template>
  <div class="pt-5 container">
    <h3 class="text-center text-success">ข้อมูลส่วนตัว</h3>
    <div class="container col-sm-5 shadow p-3 mb-5 bg-white rounded">
      <b-row>
        <b-col>
          <div align="right"><EditUProfile /></div>
          <b-list-group>
            <b-list-group>
              <strong>รหัสนักศึกษา</strong>
              <b-list-group-item>
                <div class="text-success">{{ showdata2[0].Id }}</div>
              </b-list-group-item></b-list-group
            >
            <b-list-group>
              <strong>คำนำหน้า</strong>
              <b-list-group-item>
                <div class="text-success">
                  {{ showdata2[0].Nametitle_name }}
                </div></b-list-group-item
              ></b-list-group
            >
            <b-list-group
              ><strong>ชื่อ</strong>
              <b-list-group-item>
                <div class="text-success">
                  {{ showdata2[0].First_name }}
                </div></b-list-group-item
              ></b-list-group
            >
            <b-list-group
              ><strong>นามสกุล</strong>
              <b-list-group-item>
                <div class="text-success">
                  {{ showdata2[0].Last_name }}
                </div></b-list-group-item
              ></b-list-group
            >
            <b-list-group
              ><strong>เบอร์โทรศัพท์</strong>
              <b-list-group-item
                ><div class="text-success">
                  {{ showdata2[0].Mobile }}
                </div></b-list-group-item
              ></b-list-group
            >

            <b-list-group
              ><strong>อีเมล</strong>
              <b-list-group-item
                ><div class="text-success">
                  {{ showdata2[0].Email }}
                </div></b-list-group-item
              ></b-list-group
            >

            <b-list-group
              ><strong>คณะ</strong>
              <b-list-group-item
                ><div class="text-success">
                  {{ showdata2[0].faculty }}
                </div></b-list-group-item
              ></b-list-group
            >
            <b-list-group
              ><strong>สาขา</strong>
              <b-list-group-item
                ><div class="text-success">
                  {{ showdata2[0].program_name }}
                </div></b-list-group-item
              ></b-list-group
            >
          </b-list-group> </b-col
        ><br />
      </b-row>
    </div>
  </div>
</template>
<script>
import EditUProfile from "../views/EditUProfile.vue";
export default {
  components: {
    EditUProfile,
  },
  data() {
    return {
      showdata2: [],
      // current_data: null,
    };
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
  created() {
    this.getdata();
  },
  methods: {
    async getdata() {
      // console.log(this.showdata2);
      // this.current_data = await this.$store.state.auth.user;
      this.showdata2.push(this.$store.state.auth.user);
    },
  },
};
</script>
