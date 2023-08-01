// downloadData.js
const Student = require('../models/student');
const { parseAsync } = require('json2csv');

// Download student data with interview details in CSV format
exports.downloadStudentData = async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/users/sign-in'); 
  }
  try {
    const students = await Student.find().populate('interviews');

    // Convert students and interview data into CSV format
    const csvData = [];
    students.forEach((student) => {
      const { name, email, batch, college, dsaScore, webdScore, reactScore, placed, interviews } = student;
      interviews.forEach((interview) => {
        const { companyName, date } = interview;
        csvData.push({ name, email, batch, college, dsaScore, webdScore, reactScore, placed, companyName, date });
      });
    });

    const fields = ['name', 'email', 'batch', 'college', 'dsaScore', 'webdScore', 'reactScore', 'placed', 'companyName', 'date'];
    const opts = { fields };
    const csv = await parseAsync(csvData, opts);

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=student_data.csv');
    res.status(200).send(csv);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error downloading student data.');
  }
};
