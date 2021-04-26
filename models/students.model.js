const sql = require("./db.js");

// constructor
const Students = function(students) {
  this.user_id = students.user_id
  this.studyCentre = students.studyCentre;
  this.preferred = students.preferred;
  this.surname = students.surname;
  this.mname= students.mname;
  this.fname = students.fname;
  this.dob  = students.dob;
  this.gender  = students.gender;
  this.state_origin = students.state_origin;
  this.religion = students.religion;
  this.maritalStatus = students.maritalStatus;
  this.home_add = students.home_add;
  this.postal_add = students.postal_add;
  this.personal_phone = students.personal_phone;
  this.email = students.email;
  this.nokName = students.nokName;
  this.nokRel = students.nokRel;
  this.nokContact = students.nokContact;
  this.nokPhoneNo = students.nokPhoneNo;
  this.nokEmail = students.nokEmail;
  this.institution1 = students.institution1;
  this.qualification1 = students.qualification1;
  this.qualificationDate1 = students.qualificationDate1;
  this.institution2 = students.institution2;
  this.qualification2 = students.qualification2;
  this.qualificationDate2 = students.qualificationDate2;
  this.institution3 = students.institution3;
  this.qualification3 = students.qualification3;
  this.qualificationDate3 = students.qualificationDate3;
  this.institution4 = students.institution4;
  this.qualification4 = students.qualification4;
  this.qualificationDate4 = students.qualificationDate4;
  this.institution5 = students.institution5;
  this.qualification5 = students.qualification5;
  this.qualificationDate5 = students.qualificationDate5;
  this.photo = students.photo;
  this.employer = students.employer;
  this.designation = students.designation;
  this.job_descr = students.job_descr;
  this.why_interested = students.why_interested;
  this.expectation_on_completion = students.expectation_on_completion;
  this.photo_path = students.photo_path; 
  this.photo_mimetype = students.photo_mimetype;
  this.submit_status = students.submit_status;
  this.session = students.session;
  this.scienceornot = students.scienceornot;
  this.general_mathematics = students.general_mathematics;
  this.english_language = students.english_language;
  this.noofsittings = students.noofsittings;
};

Students.create = (newStudents, result) => {
  sql.query("INSERT INTO students SET ?", newStudents, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created students: ", { id: res.insertId, ...newStudents });
    result(null, { id: res.insertId, ...newStudents });
  });
};


Students.findById = (student_id, result) => {
  sql.query(`SELECT * FROM students WHERE student_id = ?`, [student_id], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found students: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Students with the id
    result({ kind: "not_found" }, null);
  });
};

Students.findByUserId = (studentsId, result) => {
  sql.query(`SELECT * FROM students WHERE user_id = ?`, [studentsId], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found students: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Students with the id
    result({ kind: "not_found" }, null);
  });
};
// SELECT `surname`, `mname`, `fname`, `studyCentre`, `preferred`, `dob`, `gender`, `state_origin`, `religion`, `maritalStatus`, `home_add`, `postal_add`, `personal_phone`, `email`, `nokName`, `nokRel`, `nokContact`, `nokPhoneNo`, `nokEmail`, `institution1`, `qualification1`, `qualificationDate1`, `institution2`, `qualification2`, `qualificationDate2`, `institution3`, `qualification3`, `qualificationDate3`, `institution4`, `qualification4`, `qualificationDate4`, `institution5`, `qualification5`, `qualificationDate5`, `photo`, `employer`, `designation`, `job_descr`, `why_interested`, `expectation_on_completion` FROM `students`
Students.excelExport = (students, result) => {
  sql.query("SELECT surname, mname, fname, studyCentre, preferred, dob, gender, state_origin, religion FROM students WHERE session = ? AND preferred = ?", 
  [students.session, students.preferred], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("students: ", res);
    result(null, res);
  });
};

Students.rankedApplicants = (students, result) => {
  sql.query("SELECT surname, mname, fname, studyCentre, preferred, dob, gender, state_origin, religion, job_descr, english_language, general_mathematics, scienceornot, noofsittings FROM students WHERE preferred = ? ORDER BY  english_language", 
  [students.preferred], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("students: ", res);
    result(null, res);
  });
};

Students.getAll = (students, result) => {
  sql.query("SELECT * FROM students  WHERE preferred = ?", [students.preferred], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("students: ", res);
    result(null, res);
  });
};

// queryString
const qstring =( step) => {
  switch(step){
    case 'preference':
      return `UPDATE students SET studyCentre = ?, preferred= ? WHERE student_id = ?`
    case 'personal': 
      return `UPDATE students SET surname = ?, mname= ?, fname = ?, dob = ?, gender = ?, state_origin = ?, religion = ?, maritalStatus = ? WHERE student_id = ?`
    case 'pcontact':
      return `UPDATE students SET home_add = ?, postal_add = ?, personal_phone = ?, email= ? WHERE student_id = ?`
    case 'nokdetails':
      return `UPDATE students SET nokName = ?, nokRel = ?, nokContact = ?, nokPhoneNo = ?, nokEmail = ? WHERE student_id = ?`
    case 'education':
      return `UPDATE students SET institution1 = ?, qualification1 = ?, qualificationDate1 = ?,
      institution2 = ?, qualification2 = ?, qualificationDate2 = ?, 
      institution3 = ?, qualification3 = ?, qualificationDate3 = ?, 
      institution4 = ?, qualification4 = ?, qualificationDate4 = ?,
      institution5 = ?, qualification5 = ?, qualificationDate5 = ?,
      scienceornot = ?, general_mathematics = ?, english_language = ?,
      noofsittings = ? WHERE student_id = ?` 
    case 'experience':
      return `UPDATE students SET employer = ?, designation = ?, job_descr = ?, why_interested = ?, expectation_on_completion = ? WHERE student_id = ?`
    case 'submit_status':
      return `UPDATE students SET submit_status = ? WHERE student_id = ?`
    default:
      return ''
  }
}

Students.updateById = (id, step, students, result) => {
  sql.query(qstring(step), 
  step === 'personal' ? [students.surname, students.mname, students.fname, students.dob, students.gender, students.state_origin, students.religion, students.maritalStatus, id] : 
  step === 'preference' ? [students.studyCentre, students.preferred, id] : 
  step === 'pcontact' ? [students.home_add, students.postal_add, students.personal_phone, students.email, id]:
  step === 'nokdetails' ? [students.nokName, students.nokRel, students.nokContact, students.nokPhoneNo, students.nokEmail, id]:
  step === 'education' ? [students.institution1, students.qualification1, students.qualificationDate1, 
    students.institution2, students.qualification2, students.qualificationDate2, 
    students.institution3, students.qualification3, students.qualificationDate3, 
    students.institution4, students.qualification4, students.qualificationDate4, 
    students.institution5, students.qualification5, students.qualificationDate5,
    students.scienceornot, students.general_mathematics, students.english_language, 
    students.noofsittings, id]: 
  step === 'experience' ? [students.employer, students.designation, students.job_descr, 
    students.why_interested, students.expectation_on_completion, id]:
  step === 'submit_status' ? [students.submit_status, id]: 
  null,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Students with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated students: ", { id: id, ...students });
      result(null, { id: id, ...students });
    }
  );
};

Students.updatePhoto = (id, students, result) => {
  sql.query(`UPDATE students SET photo_path = ?, photo_mimetype= ? WHERE student_id = ?`,
  [students.photo_path, students.photo_mimetype, id],
  (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Students with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("updated students: ", { id: id, ...students });
    result(null, { id: id, ...students });
  }
);
}


Students.UploadCredentials = (id, students, result) => {
  sql.query(
    "UPDATE students SET photo_path = ?, photo_mimetype= ? WHERE student_id = ?",
    [students.photo_path, students.photo_mimetype, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Students with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated students: ", { id: id, ...students });
      result(null, { id: id, ...students });
    }
  );
};



Students.remove = (id, result) => {
  sql.query("DELETE FROM students WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Students with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted students with id: ", id);
    result(null, res);
  });
};

Students.removeAll = result => {
  sql.query("DELETE FROM students", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} students`);
    result(null, res);
  });
};

module.exports = Students;