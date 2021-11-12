<template>
  <div class="pt-5">
    <h2 class="text-center">ลงทะเบียน</h2>
    <div class="container col-sm-3">
      <b-form-group>
        <label for="input-live"
          >รหัสนักศึกษา <span class="text-danger">*</span> :</label
        >
        <b-form-input
          v-model="form.Id"
          placeholder="ตัวอย่าง : 60xxxxxxxx"
          type="number"
          autofocus
          require
        ></b-form-input>
      </b-form-group>

      <b-form-group>
        <label for="input-live">
          รหัสผ่าน <span class="text-danger">*</span> :
        </label>
        <b-form-input
          type="password"
          v-model="form.Pass_word"
          placeholder="รหัสผ่าน"
          require
        ></b-form-input>
      </b-form-group>

      <b-form-group>
        <label for="input-live">
          ยืนยันรหัสผ่าน <span class="text-danger">*</span> :
        </label>
        <b-form-input
          type="password"
          v-model="form.Confirm_password"
          placeholder="ใส่รหัสผ่านอีกครั้ง"
          require
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3">
        คำนำหน้า <span class="text-danger">*</span> :
        <b-form-select
          v-model="form.Nametitle_name"
          :options="nametitle"
          required
        ></b-form-select>
      </b-form-group>

      <b-form-group>
        <label for="input-live"
          >ชื่อ <span class="text-danger">*</span> :</label
        >
        <b-form-input
          v-model="form.First_name"
          placeholder=""
          require
        ></b-form-input>
      </b-form-group>

      <b-form-group>
        <label for="input-live"
          >นามสกุล <span class="text-danger">*</span> :</label
        >
        <b-form-input
          v-model="form.Last_name"
          placeholder=""
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group>
        <label for="input-live"
          >เบอร์โทรศัพท์ <span class="text-danger">*</span> :</label
        >
        <b-form-input
          v-model="form.Mobile"
          placeholder="08xxxxxxxx"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group>
        <label for="input-live"
          >อีเมล <span class="text-danger">*</span> :</label
        >
        <b-form-input
          v-model="form.Email"
          type="email"
          placeholder="test@gmail.com"
          required
        ></b-form-input>
      </b-form-group>

      <b-row>
        <b-col>
          <b-list-group>
            <div>
              คณะ <span class="text-danger">*</span> :
              <b-form-select
                v-model="form.Faculty_name"
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
              สาขา <span class="text-danger">*</span> :
              <b-form-select
                v-model="form.Program_name"
                :options="program"
                class="mb-3"
              >
              </b-form-select>
            </div> </b-list-group
        ></b-col>
      </b-row>
      <div>
        <b-form-textarea
          disabled
          id="textarea"
          class="mb-3 col-sm-15"
          placeholder="     นโยบายคุ้มครองข้อมูลส่วนบุคคลและหนังสือให้ความยินยอม
           ระบบคัดกรองภาวะซึมเศร้านักศึกษามหาวิทยาลัยแม่โจ้ ขอแจ้งให้ท่านทราบถึงนโยบายคุ้มครองข้อมูล
        ส่วนบุคคลของระบบฯ เพื่อคุ้มครองข้อมูลส่วนบุคคลของท่านที่ยินยอมให้ระบบฯ เก็บรวบรวม ใช้ และเปิดเผย 
        (รวมเรียกว่า “ใช้ข้อมูลฯ” หรือ “การใช้ข้อมูลฯ”) ตามเงื่อนไขรายละเอียดที่ระบุในนโยบายคุ้มครองข้อมูลส่วน
        บุคคลและหนังสือให้ความยินยอมฉบับนี้ดังต่อไปนี้
              1. คำนิยาม
        “ข้อมูลส่วนบุคคล” หมายถึง ข้อมูลเกี่ยวกับบุคคลซึ่งทำให้สามารถระบุตัวบุคคลนั้นได้ไม่ว่าทางตรงหรือ
         ทางอ้อม แต่ไม่รวมถึงข้อมูลของผู้ถึงแก่กรรม
        “ท่าน” หมายถึง เจ้าของข้อมูลส่วนบุคคลผู้ให้ความยินยอม นักศึกษา มหาวิทยาลัยแม่โจ้
        “ระบบ” หมายถึง ระบบคัดกรองภาวะซึมเศร้านักศึกษามหาวิทยาลัยแม่โจ้ 
              2. ความยินยอมของเจ้าของข้อมูลส่วนบุคคล
         ทางระบบฯ จะใช้ข้อมูลฯ ของท่านตามวัตถุประสงค์ที่ระบุในหนังสือให้ความยินยอมฉบับนี้ และ/หรือ ตามที่
         กฎหมายกำหนด ซึ่งการให้ความยินยอมตามข้อ 1 นั้นท่านสามารถเพิกถอนความยินยอมเมื่อใดก็ได้ แต่การเพิก
         ถอนความยินยอมจะไม่ส่งผลกระทบต่อความยินยอมที่ท่านได้ให้ไปก่อนหน้านี้แล้ว
              3. การได้มาซึ่งข้อมูลส่วนบุคคล
         ข้อมูลส่วนบุคคลที่ได้รับจากท่านโดยตรง
         ข้อมูลที่ได้รับจากแหล่งอื่น (เช่น ข้อมูลงานทะเบียน สาขาวิชา คณะ)
         ข้อมูลอื่น ๆ ที่จัดเก็บโดยเทคโนโลยีการสื่อสารผ่านระบบ
              4. ประเภทของข้อมูลส่วนบุคคลที่ระบบฯ จัดเก็บ
         4.1 ข้อมูลยืนยันตัวตน
         4.1.1 ชื่อ-นามสกุล (เพื่อยืนยันตัวตน)
         4.1.2 รหัสนักศึกษา, คณะ, สาขาวิชา (เพื่อยืนยันตัวตน)
         4.1.3 เบอร์โทรศัพท์ (ใช้ในการติดต่อ)
         4.2 ข้อมูลจากแบบประเมิน
	              4.2.1 ผลการตอบแบบประเมิน
	              4.2.2 ผลรวมการตอบแบบประเมิน
	              4.2.3 ผลอาการ จากการตอบแบบประเมิน
	              4.2.4 ประวัติการตอบแบบประเมิน (ใช้ในการติดตามและช่วยเหลือ)
              5. ความยินยอมให้ใช้ข้อมูลฯ
         ท่านตกลงยินยอมให้ระบบ เก็บรวบรวมข้อมูลส่วนบุคคลและข้อมูลการใช้ระบบของท่าน และยินยอมให้ระบบ 
         ส่ง โอน ใช้ และ/หรือ เปิดเผยข้อมูลส่วนบุคคลฯ ให้แก่งานทุนการศึกษาและให้คำปรึกษา พนักงานและบุคลากร
         งานทุนการศึกษาฯ เพื่อวัตถุประสงค์ในการวิเคราะห์ ติดตามผล และแก้ปัญหาต่าง ๆ จากภาวะซึมเศร้า
         ท่านยอมรับว่าเอกสารใด ๆ ก็ตามที่ระบบฯ ได้จัดทำหรือรวบรวมขึ้นอันเกี่ยวข้องกับข้อมูลส่วนบุคคลหรือมี
         ข้อมูลส่วนบุคคลถูกบันทึกอยู่ในนั้นทั้งที่ได้เขียนไว้บนเอกสารกระดาษ บันทึกเป็นเอกสารอิเล็กทรอนิกส์ และ/
         หรือ สื่อรูปแบบอื่น ๆ ถือว่าเป็นเอกสารและหลักฐานที่มีผลสมบูรณ์และผูกพันตามกฎหมายแม้ว่าท่านจะไม่ได้
         ลงนามในเอกสารเหล่านั้นก็ตาม
              6. การสื่อสารทางไลน์ออฟฟิเชียล
         ระบบฯ อาจจะส่งจดหมาย ข้อความ ข่าวประชาสัมพันธ์ หรือแจ้งข่าวสารอื่น ๆ ที่เกี่ยวข้องกับระบบฯ ผ่านไลน์ออฟฟิเชียล
              7. ระยะเวลาการเก็บรักษาข้อมูลส่วนบุคคล
         ระบบฯ จะจัดเก็บข้อมูลส่วนบุคคลไว้เพียงเท่าที่จำเป็นเท่านั้น ตามวัตถุประสงค์การใช้งานข้อมูลฯ ตามที่
         กฎหมายกำหนด และ/หรือ ตามความจำเป็นทางเทคนิค (งานทุนศึกษาและให้คำปรึกษา)
              8. ความปลอดภัยของข้อมูล
         ระบบฯ จะใช้ความระมัดระวังอย่างเหมาะสมในการดูแลรักษาความปลอดภัยของข้อมูลส่วนบุคคลโดยปฏิบัติ
         ตามวิธีการและหลักการที่ถูกต้องเพื่อป้องกันไม่ให้บุคคลภายนอก (ตามพระราชบัญญัติคุ้มครองข้อมูลส่วน
         บุคคล พ.ศ. 2562) เข้าถึงข้อมูลส่วนบุคคล อย่างไรก็ตามท่านยอมรับว่าไม่มีระบบรักษาความปลอดภัยใดที่
         สามารถป้องกันการรั่วไหลของข้อมูลส่วนบุคคลได้อย่างสมบูรณ์ และหากท่านมีเหตุอันควรสงสัยได้ว่าระบบ
         รักษาความปลอดภัยข้อมูลส่วนบุคคลของระบบฯ มีข้อบกพร่องหรือมีความเสี่ยงที่จะมีการรั่วไหลของข้อมูล
         ส่วนบุคคล ท่านสามารถแจ้งให้ระบบฯ ทราบได้ทันทีตามช่องทางการติดต่อที่ระบุในข้อ 11.
              9. สิทธิของท่าน (พระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562)

                  ในการให้ความยินยอมในการใช้ข้อมูลส่วนบุคคลฯ นั้น ท่านมีสิทธิดังต่อไปนี้
          1. สิทธิในการเข้าถึงข้อมูลส่วนบุคคล
          2. สิทธิในการขอถอนความยินยอมที่ได้ให้ไว้ตามหนังสือฉบับนี้ (ตามวิธีการที่ระบุในข้อ 2)
          3. สิทธิขอให้เปิดเผยถึงการได้มาซึ่งข้อมูลส่วนบุคคลที่ท่านไม่ได้ให้ความยินยอม
          4. สิทธิขอรับข้อมูลส่วนบุคคลที่จัดเก็บในอุปกรณ์ที่ทำงานอัตโนมัติในกรณีที่ผู้ควบคุมข้อมูลส่วน
        บุคคลได้ทำให้ข้อมูลส่วนบุคคลนั้นอยู่ในรูปแบบที่สามารถอ่านหรือใช้งานโดยทั่วไปได้ด้วยเครื่องมือหรือ
        อุปกรณ์ที่ทำงานได้โดยอัตโนมัติ และสามารถใช้หรือเปิดเผยข้อมูลส่วนบุคคลได้ด้วยวิธีการอัตโนมัติตลอดจนมี
        สิทธิขอรับข้อมูลส่วนบุคคลที่เกี่ยวกับท่าน หรือ ขอให้ผู้ควบคุมข้อมูลส่วนบุคคลส่งหรือโอนข้อมูลส่วนบุคคล
        ในรูปแบบดังกล่าวไปยังผู้ควบคุมข้อมูลส่วนบุคคลอื่นเมื่อสามารถทำได้ด้วยวิธีการอัตโนมัติ หรือ ขอรับข้อมูล
        ส่วนบุคคลที่ผู้ควบคุมข้อมูลส่วนบุคคลส่งหรือโอนข้อมูลส่วนบุคคลในรูปแบบดังกล่าวไปยังผู้ควบคุมข้อมูล
        ส่วนบุคคลอื่นโดยตรงยกเว้นโดยสภาพทางเทคนิคแล้วไม่สามารถทำได้
          5. สิทธิคัดค้านการเก็บรวบรวม ใช้ หรือเปิดเผยข้อมูลส่วนบุคคล
          6. สิทธิขอให้ผู้ควบคุมข้อมูลส่วนบุคคลดำเนินการลบหรือทำลายหรือทำให้ข้อมูลส่วนบุคคลเป็นข้อมูล
        ที่ไม่สามารถระบุตัวบุคคลที่เป็นเจ้าของข้อมูลส่วนบุคคลได้
          7. มีสิทธิขอให้ผู้ควบคุมข้อมูลส่วนบุคคลระงับใช้ข้อมูล
          8. มีสิทธิร้องขอให้ผู้ควบคุมข้อมูลส่วนบุคคลดำเนินการให้ข้อมูลส่วนบุคคลนั้นถูกต้อง เป็นปัจจุบัน 
        สมบูรณ์ และไม่ก่อให้เกิดความเข้าใจผิด
          9. มีสิทธิร้องเรียนในกรณีที่ผู้ควบคุมข้อมูลส่วนบุคคลรวมทั้งลูกจ้างหรือผู้รับจ้างของผู้ควบคุมข้อมูล
        ส่วนบุคคลฝ่าฝืนหรือไม่ปฏิบัติตาม พ.ร.บ.คุ้มครองข้อมูลส่วนบุคคล พ.ศ.2562 หรือประกาศที่ออกตามพระราชบัญญัติดังกล่าว
            (ท่านสามารถดูรายละเอียดในเรื่องนี้เพิ่มเติมได้ใน พ.ร.บ.คุ้มครองข้อมูลส่วนบุคคล พ.ศ.2562)
            10. เรื่องอื่น ๆ
        นโยบายคุ้มครองข้อมูลส่วนบุคคลและหนังสือให้ความยินยอมฉบับนี้อยู่ภายใต้บังคับของกฎหมายไทย
        ระบบฯ มีสิทธิแก้ไขเปลี่ยนแปลงและปรับปรุงนโยบายคุ้มครองข้อมูลส่วนบุคคลได้ตามที่ทางงานทุนการศึกษาฯ เห็นสมควร
            11. ช่องทางการติดต่อกับระบบฯ และงานทุนการศึกษาและให้คำปรึกษา มหาวิทยาลัยแม่โจ้
        11.1 หากท่านมีความประสงค์จะติดต่อกับผู้พัฒนาระบบฯ ในเรื่องที่เกี่ยวข้องกับระบบต่าง ๆ ตามที่ระบุ
        ในนโยบายฉบับนี้ ท่านสามารถติดต่อได้ตามช่องทางดังต่อไปนี้
            Email Address: arnontts@outlook.com
            Email Address: lzukhamlaeng@hotmail.com
            Email Address: anupong03930@gmail.com"
          max-rows="5"
        >
        </b-form-textarea>
        <b-form-checkbox v-model="form.Access"
          >ยอมรับเงื่อนไข <span class="text-danger">*</span> :
        </b-form-checkbox>
        <b-button block variant="info" @click="Signup()">ลงทะเบียน</b-button>
      </div>
      <br />
      <br />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        Id: null,
        Pass_word: null,
        Confirm_password: null,
        Nametitle_name: null,
        First_name: null,
        Last_name: null,
        Mobile: null,
        role_id: 1,
        Program_name: null,
        Faculty_name: null,
        Active: false,
        Access: false,
        Years: null,
        Email: null,
      },
      is_select: false,
      nametitle: [],
      faculty: [],
      program: [],
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
    } else {
      this.$router.push("/Home");
    }
  },
  created() {
    this.getfaculty();
    this.getnametitle();
  },
  methods: {
    Signup() {
      if (
        this.form.Id != null &&
        this.form.Pass_word != null &&
        this.form.Confirm_password != null &&
        this.form.Nametitle_name != null &&
        this.form.First_name != null &&
        this.form.Last_name != null &&
        this.form.Mobile != null &&
        this.form.Program_name != null &&
        this.form.Access != false &&
        this.form.Email != null
      ) {
        var axios = require("axios");
        var qs = require("qs");
        var data = qs.stringify({
          id: this.form.Id,
          username: this.form.Id,
          password: this.form.Pass_word,
          confirmpassword: this.form.Confirm_password,
          firstname: this.form.First_name,
          lastname: this.form.Last_name,
          mobile: this.form.Mobile,
          role_id: this.form.role_id,
          program_id: this.form.Program_name,
          active: this.form.Active,
          access: this.form.Access,
          years: this.form.Id.substring(0, 2),
          nametitle_id: this.form.Nametitle_name,
          email: this.form.Email,
        });
        var config = {
          method: "post",
          url: "http://localhost:3000/Signup",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          data: data,
        };
        if (this.form.Confirm_password != this.form.Pass_word) {
          alert("รหัสผ่านไม่ตรงกัน");
        } else {
          axios(config)
            .then((response) => {
              alert("ลงทะเบียนสำเร็จ");
              this.$router.push("/Signin");
              console.log(JSON.stringify(response.data));
            })
            .catch((error) => {
              alert("ชื่อผู้ใช้งานของคุณ มีการใช้งานแล้ว");
              location.reload();
              console.log(error);
            });
        }
      } else {
        alert("กรุณากรอกข้อมูลให้ครบ!");
      }
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
  },
};
</script>
