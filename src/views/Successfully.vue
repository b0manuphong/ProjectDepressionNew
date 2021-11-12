<template>
  <div>
    <b-text class="text-center">
      <center>
        <b-iconstack font-scale="5" class="titlesuccess">
          <b-icon stacked icon="square" variant="success"></b-icon>
          <b-icon stacked icon="check" variant="success"></b-icon>
        </b-iconstack>
        <p></p>
        <b-card-text class="h2 text-success">
          {{ text }}
        </b-card-text>
        <p>{{ thank }}</p>
      </center>
      <div class="cards">
        <b-card text-variant="info" class="text-center h4">
          <b-card-text
            >คะแนนของคุณ คือ : {{ score }} คะแนน อาการของคุณ คือ :
            {{ status }}</b-card-text
          >
        </b-card>
      </div>
      <br />

      <center>
        <b-button variant="primary" href="/History"
          >ดู ประวัติกรอกแบบประเมิน</b-button
        >
      </center>
    </b-text>
  </div>
</template>
<script>
export default {
  data() {
    return {
      text: "กรอกแบบประเมินสำเร็จ",
      thank: "ขอบคุณสำหรับการกรอกแบบประเมิน",
      score: 23,
      status: "ไม่มีอาการ",
    };
  },
};
</script>
<style>
.titlesuccess {
  margin-top: 10%;
}
.cards {
  border: none;
  align-items: center;
}
</style>

