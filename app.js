//index.js
const express = require("express");
const app = express();
const db = require("./db/db.config");
const jwt = require("jwt-simple");
const passport = require("passport");
const bodyParser = require("body-parser");

const bcrypt = require('bcrypt');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "POST, GET, PUT, PATCH, DELETE, OPTIONS"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Option, x-access-token"
  );
  next();
});

//ใช้ในการ decode jwt ออกมา
const ExtractJwt = require("passport-jwt").ExtractJwt;
//ใช้ในการประกาศ Strategy
const JwtStrategy = require("passport-jwt").Strategy;
const SECRET = "hzgsG7IUGl9ufsPiBLZczzdjqNoquu1ZTQqTWQ2unJ4";
//สร้าง Strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader("x-access-token"),
  secretOrKey: SECRET,
};

const jwtAuth = new JwtStrategy(jwtOptions, (payload, done) => {
  let sql = `SELECT * FROM student WHERE Username = '${payload.sub}'`;
  console.log(payload.sub);
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    if (payload.sub === results[0].Username) done(null, true);
    else done(null, false);
  });
});

//เสียบ Strategy เข้า Passport
passport.use(jwtAuth);
//ทำ Passport Middleware
const requireJWTAuth = passport.authenticate("jwt", { session: false });
//เสียบ middleware ยืนยันตัวตน JWT เข้าไป
app.get("/", requireJWTAuth, (req, res) => {
  res.send("Welcome to Homepage");
});

//------------------------------------Start System----------------------------
//-------------------------------------Post Sign up-----------------------------


app.post("/Signup", (req, res) => {
  // console.log(req.body.studnetid)
  // console.log(req.body.year)
  let sqlCheck = `SELECT ID FROM student WHERE id="${req.body.id}"`;
  let query = db.query(sqlCheck, (err, results) => {
    if (err) throw err;
    console.log(results.length)
    if (results.length == 0) {
      const password = bcrypt.hashSync(req.body.password, 8)

      let sql = `INSERT INTO student (ID, Username, Password,  Firstname, Lastname, Mobile, role_id, program_id, Active, Access, Years, nametitle_id, Email) VALUES ("${req.body.id}","${req.body.username}","${password}","${req.body.firstname}","${req.body.lastname}","${req.body.mobile}",${req.body.role_id},${req.body.program_id},${req.body.active},${req.body.access},${req.body.years},${req.body.nametitle_id},"${req.body.email}")`;
      let query = db.query(sql, (err, results) => {
        if (err) throw err;
        const payload = {
          sub: req.body.username,
          iat: new Date().getTime(),
        };
        res.json({
          title: " Signup success!" + " " + results
        });
        console.log(results)
      });

    } else {
      res.send(404, "Username in used");
    }
  });
});

///-------------------------------------Post Sign in----------------------------------------

//ทำ Middleware สำหรับขอ JWT
const loginMiddleWare = (req, res, next) => {
  let sql = `SELECT * FROM student WHERE Username = '${req.body.username}'`;
  let query = db.query(sql, (err, resultst) => {
    console.log(resultst)
    if (err) throw err;
    if (resultst.length == 1) {
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        resultst[0].Password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      } else {
        next();
      }
    }
    else res.send(401, "Wrong Username and Password");
    // console.log(results)
  });
};

app.post("/Signin", loginMiddleWare, (req, res) => {
  let sql = `SELECT student.ID , nametitle.nametitle, program.program_name, faculty.faculty_name,student.Username,student.Password,student.Firstname,student.Lastname,student.Mobile,student.Email ,roles.role
  FROM ((((student
  INNER JOIN nametitle ON student.nametitle_id = nametitle.nametitle_id)
  INNER JOIN program ON student.program_id = program.program_id)
  INNER JOIN faculty ON program.faculty_id = faculty.faculty_id)
  INNER JOIN roles ON student.role_id = roles.role_id)
  WHERE student.Username = "${req.body.username}";`;
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    const payload = {
      sub: req.body.username,
      iat: new Date().getTime(),
    };
    console.log(results)
    res.json({
      token: `${jwt.encode(payload, SECRET)}`,
      Id: `${results[0].ID}`,
      Nametitle_name: ` ${results[0].nametitle}`,
      First_name: ` ${results[0].Firstname}`,
      Last_name: `${results[0].Lastname}`,
      User_name: `${results[0].Username}`,
      Pass_word: `${results[0].Password}`,
      Mobile: `${results[0].Mobile}`,
      role_id: ` ${results[0].role}`,
      program_name: `${results[0].program_name}`,
      faculty: `${results[0].faculty_name}`,
      Email: `${results[0].Email}`,
    });
  });
});


//---------------------Get faculty----------------------
app.get("/getfaculty", requireJWTAuth, (req, res) => {
  let sql = `SELECT * FROM faculty`;
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});



//---------------------Post program-----------------------
app.post("/getprogram", (req, res) => {
  let sql = `SELECT program_name ,program_id FROM program WHERE faculty_id  = '${req.body.idfaculty}'`;
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
    // console.log(results)
  });
});

//----------------------Get nametitle--------------------
app.get("/getnametitle", (req, res) => {
  let sql = `SELECT * FROM nametitle`;
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});


//SELECT `phase_id`,max(`start`) FROM phase GROUP BY phase_id
app.get("/get_last_phase", (req, res) => {
  let sql = `SELECT phase_id,max(start) FROM phase GROUP BY phase_id`;
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

//------------------------post program in sign up page-----------------------
//get program หน้า  Signup
app.post("/getprogram_signup", (req, res) => {
  let sql = `SELECT program_name ,program_id FROM program WHERE faculty_id  = '${req.body.idfaculty}'`;
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

//get faculty หน้า  Signup
app.get("/getfaculty_signup", (req, res) => {
  let sql = `SELECT * FROM faculty`;
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});


//------------------update user in editprofile page------------------
app.put("/update_user", (req, res) => {

  let sqlCheckPass = `SELECT  Password FROM student WHERE student.ID = ${req.body.id_up}`
  let querypass = db.query(sqlCheckPass, (err, resultscheck) => {
    if (err) throw err;
    console.log(resultscheck[0].Password)
    console.log(req.body.password)



    if (resultscheck[0].Password == req.body.password) {
      let sql = `UPDATE student SET Username="${req.body.username}",Password="${req.body.password}",nametitle_id="${req.body.nametitle_id}",Firstname="${req.body.firstname}",Lastname="${req.body.lastname}",Mobile="${req.body.mobile}",program_id= "${req.body.program_id}",Email="${req.body.email}" WHERE student.ID="${req.body.id_up}"`;
      let query = db.query(sql, (err, results) => {
        if (err) throw err;
        res.send(200, results);
        console.log("update successfully")
      });

    } else if (resultscheck[0].Password != req.body.password) {

      const password = bcrypt.hashSync(req.body.password, 8)
      let sql = `UPDATE student SET Username="${req.body.username}",Password="${password}",nametitle_id="${req.body.nametitle_id}",Firstname="${req.body.firstname}",Lastname="${req.body.lastname}",Mobile="${req.body.mobile}",program_id= "${req.body.program_id}",Email="${req.body.email}" WHERE student.ID="${req.body.id_up}"`;
      let query = db.query(sql, (err, results) => {
        if (err) throw err;
        res.send(200, results);
        console.log("update successfully")
      });
    }
  });


});


//------------------------getupdate user editprofile page-------------------requireJWTAuth, 
app.get("/getupdate_user", (req, res) => {
  let sql = `SELECT student.ID,nametitle.nametitle,student.Firstname,student.Lastname,student.Username,student.Password,student.Mobile,student.Email,program.program_name, faculty.faculty_name,roles.role
  FROM ((((student
  INNER JOIN program ON student.program_id = program.program_id)
  INNER JOIN faculty ON program.faculty_id = faculty.faculty_id)
  INNER JOIN nametitle ON student.nametitle_id = nametitle.nametitle_id)
  INNER JOIN roles ON student.role_id = roles.role_id)
  WHERE student.ID ="${req.body.id}";`;
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    const payload = {
      sub: req.body.id,
      iat: new Date().getTime(),
    };
    // console.log(results)
    res.json({
      token: `${jwt.encode(payload, SECRET)}`,
      Id: `${results[0].ID}`,
      Nametitle_name: `${results[0].nametitle}`,
      First_name: `${results[0].Firstname}`,
      Last_name: `${results[0].Lastname}`,
      User_name: `${results[0].Username}`,
      Pass_word: `${results[0].Password}`,
      Mobile: `${results[0].Mobile}`,
      role_id: ` ${results[0].role}`,
      program_name: `${results[0].program_name}`,
      faculty: `${results[0].faculty_name}`,
      Email: `${results[0].Email}`,
    });
  });
});

//---------------------Post insert score question 9 -----------------------
app.post("/insertscorequestion9", (req, res) => {

  //-----ทดสอบ ข้อมูลจาก postman ว่าเข้ามาไหม?----
  // console.log("systom id",req.body.symptom)
  // console.log("sum question 2 ",req.body.question2)
  // console.log("sum question 9",req.body.question9)
  // console.log("phase id",req.body.phase)
  // console.log("trace id",req.body.trace)
  // console.log(req.body.id)

  let sql = `INSERT INTO history(symptom_id,sum_question2,sum_question9,phase_id,trace_id,ID) VALUES (${req.body.symptom},${req.body.question2},${req.body.question9},${req.body.phase},${req.body.trace},"${req.body.id}");`;
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    res.json({
      title: " Insert Question 9  Success!" + results
    });
  });
});

//---------Update สถานะว่าทำหรือยัง ของ User-------------
app.post("/update_status", (req, res) => {
  // console.log(req.body.id)
  let sql = `UPDATE student SET Active = true WHERE ID = ${req.body.id}`;
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    res.json({
      title: "Update success"
    });
  });

});


//---------------------------------Get historyUser----------------
app.post("/gethistoryUser", requireJWTAuth, (req, res) => {
  let sql = `SELECT history.createtime as วันเดือนปี,phase.phase as ปีการศึกษา  ,history.sum_question2 as คะแนน2Q ,history.sum_question9 as คะแนน9Q,symptom.symptom_name as อาการ
  FROM(((history 
       INNER JOIN student ON history.ID = student.ID)
       INNER JOIN phase ON history.phase_id = phase.phase_id)
       INNER JOIN symptom ON history.symptom_id = symptom.symptom_id)
       
  WHERE history.ID = '${req.body.ID}' ORDER BY history.createtime DESC`;
  let query = db.query(sql, (err, results) => {
    if (err) {
      throw err;
    } else {
      res.send(results);
    }

  });
});

//--------------------Get allhistory user dashborad page--------------------
app.get("/getallhistory", (req, res) => {
  let sql = `SELECT history.history_id,history.ID,history.createtime,student.Firstname,student.Lastname,student.ID,program.program_name,faculty.faculty_name,student.Mobile,student.Username,student.Password,phase.phase,symptom.symptom_name,trace.trace_name,history.sum_question2,history.sum_question9,history.symptom_id,nametitle.nametitle FROM (((((((history   INNER JOIN symptom ON history.symptom_id = symptom.symptom_id) INNER JOIN phase ON history.phase_id = phase.phase_id) INNER JOIN trace ON history.trace_id = trace.trace_id) INNER JOIN student ON history.ID = student.ID)INNER JOIN nametitle ON student.nametitle_id = nametitle.nametitle_id)INNER JOIN program ON student.program_id = program.program_id) INNER JOIN faculty ON program.faculty_id = faculty.faculty_id),(SELECT history_id,createtime,sum_question2,sum_question9,phase_id,trace_id,ID, MAX(createtime) as date FROM  history  GROUP BY ID )max_sales where history.ID=max_sales.ID and history.createtime=max_sales.date;`;
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});


//--------------------Get allUserActive ManagepageUser admin page---------------------
app.get("/getallUseractive", (req, res) => {
  let sql = `SELECT student.ID,student.Active ,nametitle.nametitle,student.Firstname,student.Lastname,student.Mobile,student.Username,student.Password,program.program_name,faculty.faculty_name
  FROM (((student
  INNER JOIN program ON student.program_id = program.program_id)
  INNER JOIN faculty ON program.faculty_id = faculty.faculty_id)
  INNER JOIN nametitle ON student.nametitle_id = nametitle.nametitle_id)
  WHERE student.role_id = 1;`;
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});







//get faculty หน้า  Signup
app.post("/insert_q2", requireJWTAuth, (req, res) => {
  let sql = ``;
  // console.log(req, body);
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    res.send(200, results);
    // console.log("success");
  });
});




//back end admin page 


// app.get("/getallyear", (req, res) => {
//   let sql = `SELECT year_id, year FROM year`;
//   let query = db.query(sql, (err, results) => {
//     if (err) throw err;
//     res.send(results);
//   });
// });

// app.get("/getallphase", (req, res) => {
//   let sql = `SELECT phase_id, phase, start, end, year_id FROM phase`;
//   let query = db.query(sql, (err, results) => {
//     if (err) throw err;
//     res.send(results);
//   });
// });

///----------------------เรียกชั้นปี 60 61 62 63 ตามรหัสประจำปีของนักศึกษา--------------
app.get("/getyearstudent", (req, res) => {
  let sql = `SELECT  Years FROM student GROUP BY Years HAVING COUNT(ID) >1;`;
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

///----------------------รอบการทำแบบสอบถาม phase --------------
app.get("/getallphase", (req, res) => {
  let sql = `SELECT  * FROM phase `;
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

///------------------------get update user
app.put("/updataUser", (req, res) => {
  const password = bcrypt.hashSync(req.body.password, 8)
  let sql = `UPDATE student SET ID ='${req.body.id}',username ='${req.body.username}',password='${password}',Firstname='${req.body.firstname}',Lastname='${req.body.lastname}',mobile='${req.body.mobile}',ID='${req.body.id}',program_id=${req.body.program_id},nametitle_id=${req.body.name_title} WHERE ID = '${req.body.id}'`;
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

///-------------------------delete user
app.delete("/deleteUser", (req, res) => {
  let sql = `DELETE FROM student WHERE ID = '${req.body.studnet_code}'`;
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

///------------------------------GetUserBYyear
app.post("/yearSelect", (req, res) => {
  console.log(req.body.phase)
  console.log(req.body.year)
  console.log(req.body.program)
  console.log(req.body.faculty)
  if (req.body.phase == "all" && req.body.year == "all" && req.body.faculty == "all" && req.body.program == "all") {
    let sql = `SELECT history.symptom_id,history.history_id,nametitle.nametitle,student.Firstname,student.Lastname,student.ID, faculty.faculty_name,program.program_name ,student.Mobile,student.Username,student.Password,student.Access,student.Active,history.sum_question2,history.sum_question9,symptom.symptom_name,trace.trace_name, phase.phase
    FROM (((((((history
    INNER JOIN symptom ON history.symptom_id = symptom.symptom_id)
    INNER JOIN phase ON history.phase_id = phase.phase_id)
    INNER JOIN student ON history.ID = student.ID)
    INNER JOIN program ON student.program_id = program.program_id)
    INNER JOIN nametitle ON student.nametitle_id = nametitle.nametitle_id)
    INNER JOIN faculty ON program.faculty_id = faculty.faculty_id)
    INNER JOIN trace ON history.trace_id = trace.trace_id)
    WHERE student.role_id = 1 `;
    let query = db.query(sql, (err, results) => {
      if (err) throw err;
      res.send(results);
    });
  } else if (req.body.phase != "all" && req.body.year == "all" && req.body.faculty == "all" && req.body.program == "all") {
    let sql = `SELECT history.symptom_id,history.history_id,nametitle.nametitle,student.Firstname,student.Lastname,student.ID, faculty.faculty_name,program.program_name ,student.Mobile,student.Username,student.Password,student.Access,student.Active,history.sum_question2,history.sum_question9,symptom.symptom_name,trace.trace_name, phase.phase
    FROM (((((((history
    INNER JOIN symptom ON history.symptom_id = symptom.symptom_id)
    INNER JOIN phase ON history.phase_id = phase.phase_id)
    INNER JOIN student ON history.ID = student.ID)
    INNER JOIN program ON student.program_id = program.program_id)
    INNER JOIN nametitle ON student.nametitle_id = nametitle.nametitle_id)
    INNER JOIN faculty ON program.faculty_id = faculty.faculty_id)
    INNER JOIN trace ON history.trace_id = trace.trace_id)
    WHERE student.role_id = 1 AND history.phase_id = ${req.body.phase}`;
    let query = db.query(sql, (err, results) => {
      if (err) throw err;
      res.send(results);
    });
  } else if (req.body.phase != "all" && req.body.year != "all" && req.body.faculty == "all" && req.body.program == "all") {
    let sql = `SELECT history.symptom_id,history.history_id,nametitle.nametitle,student.Firstname,student.Lastname,student.ID, faculty.faculty_name,program.program_name ,student.Mobile,student.Username,student.Password,student.Access,student.Active,history.sum_question2,history.sum_question9,symptom.symptom_name,trace.trace_name, phase.phase
    FROM (((((((history
    INNER JOIN symptom ON history.symptom_id = symptom.symptom_id)
    INNER JOIN phase ON history.phase_id = phase.phase_id)
    INNER JOIN student ON history.ID = student.ID)
    INNER JOIN program ON student.program_id = program.program_id)
    INNER JOIN nametitle ON student.nametitle_id = nametitle.nametitle_id)
    INNER JOIN faculty ON program.faculty_id = faculty.faculty_id)
    INNER JOIN trace ON history.trace_id = trace.trace_id)
    WHERE student.role_id = 1 AND history.phase_id = ${req.body.phase} AND student.Years = ${req.body.year}`;
    let query = db.query(sql, (err, results) => {
      if (err) throw err;
      res.send(results);
    });
  } else if (req.body.phase != "all" && req.body.year != "all" && req.body.faculty != "all" && req.body.program == "all") {
    let sql = `SELECT history.symptom_id,history.history_id,nametitle.nametitle,student.Firstname,student.Lastname,student.ID, faculty.faculty_name,program.program_name ,student.Mobile,student.Username,student.Password,student.Access,student.Active,history.sum_question2,history.sum_question9,symptom.symptom_name,trace.trace_name, phase.phase
    FROM (((((((history
    INNER JOIN symptom ON history.symptom_id = symptom.symptom_id)
    INNER JOIN phase ON history.phase_id = phase.phase_id)
    INNER JOIN student ON history.ID = student.ID)
    INNER JOIN program ON student.program_id = program.program_id)
    INNER JOIN nametitle ON student.nametitle_id = nametitle.nametitle_id)
    INNER JOIN faculty ON program.faculty_id = faculty.faculty_id)
    INNER JOIN trace ON history.trace_id = trace.trace_id)
    WHERE student.role_id = 1 AND history.phase_id = ${req.body.phase} AND student.Years = ${req.body.year} AND faculty.faculty_id = ${req.body.faculty}`;
    let query = db.query(sql, (err, results) => {
      if (err) throw err;
      res.send(results);
    });
  } else if (req.body.phase != "all" && req.body.year != "all" && req.body.faculty != "all" && req.body.program != "all") {
    let sql = `SELECT history.symptom_id,history.history_id,nametitle.nametitle,student.Firstname,student.Lastname,student.ID, faculty.faculty_name,program.program_name ,student.Mobile,student.Username,student.Password,student.Access,student.Active,history.sum_question2,history.sum_question9,symptom.symptom_name,trace.trace_name, phase.phase
    FROM (((((((history
    INNER JOIN symptom ON history.symptom_id = symptom.symptom_id)
    INNER JOIN phase ON history.phase_id = phase.phase_id)
    INNER JOIN student ON history.ID = student.ID)
    INNER JOIN program ON student.program_id = program.program_id)
    INNER JOIN nametitle ON student.nametitle_id = nametitle.nametitle_id)
    INNER JOIN faculty ON program.faculty_id = faculty.faculty_id)
    INNER JOIN trace ON history.trace_id = trace.trace_id)
    WHERE student.role_id = 1 AND history.phase_id = ${req.body.phase} AND student.Years = ${req.body.year} AND faculty.faculty_id = ${req.body.faculty} AND student.program_id = ${req.body.program}`;
    let query = db.query(sql, (err, results) => {
      if (err) throw err;
      res.send(results);
    });
  } else if (req.body.phase == "all" && req.body.year == "all" && req.body.faculty != "all" && req.body.program == "all") {
    let sql = `SELECT history.symptom_id,history.history_id,nametitle.nametitle,student.Firstname,student.Lastname,student.ID, faculty.faculty_name,program.program_name ,student.Mobile,student.Username,student.Password,student.Access,student.Active,history.sum_question2,history.sum_question9,symptom.symptom_name,trace.trace_name, phase.phase
    FROM (((((((history
    INNER JOIN symptom ON history.symptom_id = symptom.symptom_id)
    INNER JOIN phase ON history.phase_id = phase.phase_id)
    INNER JOIN student ON history.ID = student.ID)
    INNER JOIN program ON student.program_id = program.program_id)
    INNER JOIN nametitle ON student.nametitle_id = nametitle.nametitle_id)
    INNER JOIN faculty ON program.faculty_id = faculty.faculty_id)
    INNER JOIN trace ON history.trace_id = trace.trace_id)
    WHERE student.role_id = 1  AND faculty.faculty_id = ${req.body.faculty}`;
    let query = db.query(sql, (err, results) => {
      if (err) throw err;
      res.send(results);
    });
  } else if (req.body.phase == "all" && req.body.year == "all" && req.body.faculty != "all" && req.body.program != "all") {
    let sql = `SELECT history.symptom_id,history.history_id,nametitle.nametitle,student.Firstname,student.Lastname,student.ID, faculty.faculty_name,program.program_name ,student.Mobile,student.Username,student.Password,student.Access,student.Active,history.sum_question2,history.sum_question9,symptom.symptom_name,trace.trace_name, phase.phase
    FROM (((((((history
    INNER JOIN symptom ON history.symptom_id = symptom.symptom_id)
    INNER JOIN phase ON history.phase_id = phase.phase_id)
    INNER JOIN student ON history.ID = student.ID)
    INNER JOIN program ON student.program_id = program.program_id)
    INNER JOIN nametitle ON student.nametitle_id = nametitle.nametitle_id)
    INNER JOIN faculty ON program.faculty_id = faculty.faculty_id)
    INNER JOIN trace ON history.trace_id = trace.trace_id)
    WHERE student.role_id = 1  AND faculty.faculty_id = ${req.body.faculty} AND student.program_id = ${req.body.program}`;
    let query = db.query(sql, (err, results) => {
      if (err) throw err;
      res.send(results);
    });
  }
  else if (req.body.phase == "all" && req.body.year != "all" && req.body.faculty != "all" && req.body.program == "all") {
    let sql = `SELECT history.symptom_id,history.history_id,nametitle.nametitle,student.Firstname,student.Lastname,student.ID, faculty.faculty_name,program.program_name ,student.Mobile,student.Username,student.Password,student.Access,student.Active,history.sum_question2,history.sum_question9,symptom.symptom_name,trace.trace_name, phase.phase
    FROM (((((((history
    INNER JOIN symptom ON history.symptom_id = symptom.symptom_id)
    INNER JOIN phase ON history.phase_id = phase.phase_id)
    INNER JOIN student ON history.ID = student.ID)
    INNER JOIN program ON student.program_id = program.program_id)
    INNER JOIN nametitle ON student.nametitle_id = nametitle.nametitle_id)
    INNER JOIN faculty ON program.faculty_id = faculty.faculty_id)
    INNER JOIN trace ON history.trace_id = trace.trace_id)
    WHERE student.role_id = 1 AND student.Years = ${req.body.year} AND faculty.faculty_id = ${req.body.faculty} `;
    let query = db.query(sql, (err, results) => {
      if (err) throw err;
      res.send(results);
    });
  } else if (req.body.phase != "all" && req.body.year == "all" && req.body.faculty != "all" && req.body.program != "all") {
    let sql = `SELECT history.symptom_id,history.history_id,nametitle.nametitle,student.Firstname,student.Lastname,student.ID, faculty.faculty_name,program.program_name ,student.Mobile,student.Username,student.Password,student.Access,student.Active,history.sum_question2,history.sum_question9,symptom.symptom_name,trace.trace_name, phase.phase
    FROM (((((((history
    INNER JOIN symptom ON  history.symptom_id= symptom.symptom_id)
    INNER JOIN phase ON history.phase_id = phase.phase_id)
    INNER JOIN student ON history.ID = student.ID)
    INNER JOIN program ON student.program_id = program.program_id)
    INNER JOIN nametitle ON student.nametitle_id = nametitle.nametitle_id)
    INNER JOIN faculty ON program.faculty_id = faculty.faculty_id)
    INNER JOIN trace ON history.trace_id = trace.trace_id)
    WHERE student.role_id = 1 AND history.phase_id = ${req.body.phase}  AND faculty.faculty_id = ${req.body.faculty} AND student.program_id = ${req.body.program}`;
    let query = db.query(sql, (err, results) => {
      if (err) throw err;
      res.send(results);
    });
  } else if (req.body.phase == "all" && req.body.year != "all" && req.body.faculty == "all" && req.body.program == "all") {
    let sql = `SELECT history.symptom_id,history.history_id,nametitle.nametitle,student.Firstname,student.Lastname,student.ID, faculty.faculty_name,program.program_name ,student.Mobile,student.Username,student.Password,student.Access,student.Active,history.sum_question2,history.sum_question9,symptom.symptom_name,trace.trace_name, phase.phase
    FROM (((((((history
    INNER JOIN symptom ON  history.symptom_id= symptom.symptom_id)
    INNER JOIN phase ON history.phase_id = phase.phase_id)
    INNER JOIN student ON history.ID = student.ID)
    INNER JOIN program ON student.program_id = program.program_id)
    INNER JOIN nametitle ON student.nametitle_id = nametitle.nametitle_id)
    INNER JOIN faculty ON program.faculty_id = faculty.faculty_id)
    INNER JOIN trace ON history.trace_id = trace.trace_id)
    WHERE student.role_id = 1 AND student.Years = ${req.body.year}  `;
    let query = db.query(sql, (err, results) => {
      if (err) throw err;
      res.send(results);
    });
  } else if (req.body.phase == "all" && req.body.year != "all" && req.body.faculty != "all" && req.body.program != "all") {
    let sql = `SELECT history.symptom_id,history.history_id,nametitle.nametitle,student.Firstname,student.Lastname,student.ID, faculty.faculty_name,program.program_name ,student.Mobile,student.Username,student.Password,student.Access,student.Active,history.sum_question2,history.sum_question9,symptom.symptom_name,trace.trace_name, phase.phase
    FROM (((((((history
    INNER JOIN symptom ON  history.symptom_id= symptom.symptom_id)
    INNER JOIN phase ON history.phase_id = phase.phase_id)
    INNER JOIN student ON history.ID = student.ID)
    INNER JOIN program ON student.program_id = program.program_id)
    INNER JOIN nametitle ON student.nametitle_id = nametitle.nametitle_id)
    INNER JOIN faculty ON program.faculty_id = faculty.faculty_id)
    INNER JOIN trace ON history.trace_id = trace.trace_id)
    WHERE student.role_id = 1 AND student.Years = ${req.body.year} AND faculty.faculty_id = ${req.body.faculty} AND student.program_id = ${req.body.program} `;
    let query = db.query(sql, (err, results) => {
      if (err) throw err;
      res.send(results);
    });
  }
});

//--------------------Get allUserActive ManageActivepage admin page---------------------
app.get("/getallhistoryActive", (req, res) => {
  let sql = `SELECT history.history_id,history.createtime,nametitle.nametitle,student.Firstname,student.Lastname,student.ID, faculty.faculty_name,program.program_name ,student.Mobile,student.Username,student.Password,student.Access,student.Active,history.sum_question2,history.sum_question9,symptom.symptom_name,trace.trace_name, phase.phase
  FROM (((((((history
  INNER JOIN symptom ON history.symptom_id = symptom.symptom_id)
  INNER JOIN phase ON history.phase_id = phase.phase_id)
  INNER JOIN student ON history.ID = student.ID)
  INNER JOIN program ON student.program_id = program.program_id)
  INNER JOIN nametitle ON student.nametitle_id = nametitle.nametitle_id)
  INNER JOIN faculty ON program.faculty_id = faculty.faculty_id)
  INNER JOIN trace ON history.trace_id = trace.trace_id)
  WHERE student.role_id = 1`;
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

//--------------delete manageactive-------------
app.post("/deleteusermanageactive", (req, res) => {
  console.log(req.body.history_id)
  let sql = `DELETE FROM history WHERE history_id = ${req.body.history_id}`;
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    res.send(results);
    console.log(results)
  });
});

///--------------insert phase-----
app.post("/insertphase", (req, res) => {
  let sql = `INSERT INTO phase( phase, start, end) VALUES ('${req.body.round}','${req.body.start}','${req.body.end}')`;
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

app.get("/getphase", (req, res) => {
  let sql = `SELECT  phase, phase_id, start,end, created FROM phase`;
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

app.put("/updataphase", (req, res) => {
  let sql = `UPDATE phase SET phase ='${req.body.phase}',start='${req.body.start}',end='${req.body.end}' WHERE phase_id = ${req.body.phase_id}`;
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

app.delete("/deletephase", (req, res) => {
  let sql = `DELETE FROM phase WHERE phase_id = ${req.body.phase_id}`;
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

///-------------insert nametitle -------------
app.post("/insertnametitle", (req, res) => {
  let sql = `INSERT INTO nametitle(nametitle) VALUES ('${req.body.nametitle}')`;
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

app.put("/updatenametitle", (req, res) => {
  let sql = `UPDATE nametitle SET nametitle ='${req.body.nametitle}' WHERE nametitle_id = ${req.body.nametitle_id}`;
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});


app.delete("/deletenametitle", (req, res) => {
  let sql = `DELETE FROM nametitle WHERE nametitle_id = ${req.body.nametitle_id}`;
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});



///---------------insert faculty ----------------------------
app.post("/insertfaculty", (req, res) => {
  let sql = `INSERT INTO faculty (faculty_name) VALUES ('${req.body.faculty_name}')`;
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});


///----------------------------updatefaculty---------------------------- */
app.put("/updatefaculty", (req, res) => {
  let sql = `UPDATE faculty SET faculty_name ='${req.body.faculty_name}' WHERE faculty_id = ${req.body.faculty_id}`;
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

///------------------------deletefaculty--------------------------------------------//
app.delete("/deletefaculty", (req, res) => {
  let sql = `DELETE FROM faculty WHERE faculty_id = ${req.body.faculty_id}`;
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

///-----------------get program ------------
app.get("/getprogram", (req, res) => {
  let sql = `SELECT * FROM program `;
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});
///----------------------------------------------
app.post("/insertprogram", (req, res) => {
  let sql = `INSERT INTO program( program_name,  faculty_id) VALUES ('${req.body.program_name}',${req.body.faculty_id})`;
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

app.put("/updateprogram", (req, res) => {
  let sql = `UPDATE program SET program_name="${req.body.program_name}" WHERE program.program_id="${req.body.program_id}"`;
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

app.delete("/deleteprogram", (req, res) => {
  let sql = `DELETE FROM program WHERE program_id = ${req.body.program_id}`;
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

///-----------------get admin ------------
app.get("/getadmin", (req, res) => {
  let sql = `SELECT student.ID,student.Username, student.Password,student.Firstname,student.Lastname,student.Mobile,student.email,nametitle.nametitle
  FROM student
  INNER JOIN nametitle ON student.nametitle_id = nametitle.nametitle_id
  WHERE student.role_id = 2;`;
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

///-----------------------update admin -------------
// app.put("/updateadmin", (req, res) => {
//   let sql = `UPDATE student SET Username="${req.body.username}",Password="${req.body.password}",Firstname="${req.body.firstname}",Lastname="${req.body.lastname}",Mobile="${req.body.mobile}",nametitle_id=${req.body.nametitle},Email="${req.body.email}" WHERE student.ID ="${req.body.Id}"`;
//   let query = db.query(sql, (err, results) => {
//     if (err) throw err;
//     res.send(results);
//   });
// });
///------------------------get update user
app.put("/updataadmin", (req, res) => {
  const password = bcrypt.hashSync(req.body.password, 8)
  let sql = `UPDATE student SET ID ='${req.body.id}',username ='${req.body.username}',password='${password}',Firstname='${req.body.firstname}',Lastname='${req.body.lastname}',mobile='${req.body.mobile}',ID='${req.body.id}',nametitle_id=${req.body.name_title} WHERE ID = '${req.body.id}'`;
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

///-----------------get admin ------------
app.get("/getadlltrace", (req, res) => {
  let sql = `SELECT * FROM trace `;
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

///------------------------get trace
app.put("/updateadlltrace", (req, res) => {
  let sql = `UPDATE history SET trace_id= '${req.body.trace_id}' WHERE history.ID = '${req.body.id}'`;
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

app.put("/updatenametitle", (req, res) => {
  let sql = `UPDATE nametitle SET nametitle ='${req.body.nametitle}' WHERE nametitle_id = ${req.body.nametitle_id}`;
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});


app.post("/getdownloadalluseractive", (req, res) => {
  let sql = `SELECT history.history_id, student.ID, nametitle.nametitle,student.Firstname,student.Lastname,student.Mobile,history.sum_question2,history.sum_question9,symptom.symptom_name,history.createtime,phase.phase,trace.trace_name
  FROM (((((history
  INNER JOIN student ON history.ID = student.ID)
  INNER JOIN nametitle ON student.nametitle_id = nametitle.nametitle_id)
        INNER JOIN symptom ON history.symptom_id = symptom.symptom_id)
        INNER JOIN phase ON history.phase_id = phase.phase_id)
        INNER JOIN trace ON history.trace_id = trace.trace_id)
        WHERE history.ID = "${req.body.id}";`;
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});


app.listen(3000, () => {
  console.log("Serve start on port : 3000");
});


