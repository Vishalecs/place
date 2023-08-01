const Student = require('../models/student');
const Interview = require('../models/interview');
const mongoose = require('mongoose');

// Render add student form
exports.renderAddStudentForm = (req, res) => {
  res.render('add_student');
};


// Handle the POST request to create a new student
exports.addStudent = async (req, res) => {
  const {
    name,
    email,
    batch,
    college,
    dsaScore,
    webdScore,
    reactScore,
    placed,
    selectedInterviews // Assuming the selected interviews are sent as an array
  } = req.body;

  try {
    const newStudent = new Student({
      name,
      email,
      batch,
      college,
      dsaScore,
      webdScore,
      reactScore,
      placed,
    });

    // Save the new student
    await newStudent.save();

    if (Array.isArray(selectedInterviews)) {
      // Associate the selected interviews with the student
      for (const interviewId of selectedInterviews) {
        const interview = await Interview.findById(interviewId);
        if (interview) {
          newStudent.interviews.push(interview);
        }
      }
    }

    // Save the updated student with the associated interviews
    await newStudent.save();

    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error saving student data.');
  }
};


// Display student details
exports.displayStudentDetails = async (req, res) => {
  try {
    const studentId = req.params.id; // Assuming the studentId is passed as a parameter

    if (!mongoose.Types.ObjectId.isValid(studentId)) {
      return res.status(400).json({ error: 'Invalid studentId' });
    }

    const student = await Student.findById(studentId).populate('interviews');
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    // Fetch all interviews to populate the select options
    const interviews = await Interview.find();

    // Return the student and interview details to the view
    res.render('student_detail', { student, interviews });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


// Select an interview for a student
exports.selectInterview = async (req, res) => {
  const studentId = req.params.id;
  const { selectedInterview } = req.body;

  // Check if selectedInterview is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(selectedInterview)) {
    return res.status(400).send('Invalid interview ID');
  }

  try {
    const student = await Student.findById(studentId);

    const interview = await Interview.findById(selectedInterview);
    if (!interview) {
      return res.status(404).send('Interview not found');
    }

    student.interviews.push(interview._id);
    await student.save();

    // Redirect back to the student detail page
    res.redirect(`/student/${studentId}`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error selecting interview for student.');
  }
};
// Delete a student
exports.deleteStudent = async (req, res) => {
  try {
    const studentId = req.params.id;
    await Student.findByIdAndDelete(studentId);
    res.redirect('/'); // Redirect to the home page
  } catch (error) {
    res.status(500).send('An error occurred while deleting the student');
  }
};

// Render edit student form
exports.renderEditStudentForm = async (req, res) => {
  try {
    const studentId = req.params.id;

    // Find the student by ID
    const student = await Student.findById(studentId);

    if (!student) {
      // If the student is not found, handle the error appropriately
      return res.status(404).json({ error: 'Student not found' });
    }

    // Render the edit student form template
    res.render('edit_student', { student });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Handle the POST request to update a student
exports.updateStudent = async (req, res) => {
  const studentId = req.params.id;

  try {
    const {
      name,
      email,
      batch,
      college,
      dsaScore,
      webdScore,
      reactScore,
      placed,
    } = req.body;

    if (!mongoose.Types.ObjectId.isValid(studentId)) {
      return res.status(400).json({ error: 'Invalid studentId' });
    }

    const updatedStudent = await Student.findByIdAndUpdate(
      studentId,
      {
        name,
        email,
        batch,
        college,
        dsaScore,
        webdScore,
        reactScore,
        placed,
      },
      { new: true }
    );

    if (!updatedStudent) {
      return res.status(404).json({ error: 'Student not found' });
    }

    res.redirect(`/student/${studentId}`);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
