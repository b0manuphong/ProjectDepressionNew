<template>
  <div class="p-t-10">
    <div class="container p-5  ">
      <h3 class="text-center text-success">ติดต่อเรา</h3>
      <p></p>
      <div class="shadow p-3 mb-5 bg-body rounded text-success">
        <p></p>

        คิวอาร์โค้ด :

        <b-img
          center
          src="../assets/QR Code.png"
          thumbnail
          width="250,"
          height="250,"
          alt="Fluid image"
        ></b-img>
        <p></p>
        <div>
          ลิงก์ไลน์ :

          <b-button variant="outline-success">
            <b-link href="https://lin.ee/ohqpwdG">เพิ่มเพื่อน </b-link>
          </b-button>
        </div>
        <p></p>
        <div>
          เบอร์โทรศัพท์ :

          <b-form-input v-model="this.phone" disabled></b-form-input>
        </div>
        <p></p>
        <div>
          แฟนเพจเฟซบุ๊ก :

          <b-button variant="outline-success">
            <b-link href="https://www.facebook.com/Scholarship.maejo"
              >งานทุนการศึกษาและให้คำปรึกษา
            </b-link>
          </b-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      phone: "053-873183-4",
    };
  }
};
</script>
