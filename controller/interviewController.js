// controllers/interviewController.js
const Interview = require('../models/interview');
const passport = require('passport');

// Render add interview form
exports.renderAddInterviewForm = (req, res) => {
  if (req.isAuthenticated()) {
    res.render('interview');
  } else {
    res.redirect('/users/sign-in'); // Redirect to the login page if the user is not authenticated
  }
};

// Handle the POST request to add a new interview
exports.addInterview = async (req, res) => {
  const { companyName, date } = req.body;

  try {
    const newInterview = new Interview({
      companyName,
      date,
      
    });

    await newInterview.save();
    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error saving interview data.');
  }
};

// Display all interviews
exports.displayInterviews = async (req, res) => {
  try {
    const interviews = await Interview.find({});
    res.render('home', { interviews }); // Change 'students' to 'interviews'
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving interviews.');
  }
};
// Render edit interview form
exports.renderEditInterviewForm = async (req, res) => {
  if (req.isAuthenticated()) {
    try {
      const interview = await Interview.findById(req.params.id);
      res.render('edit-interview', { interview });
    } catch (error) {
      console.error(error);
      res.status(500).send('Error retrieving interview data.');
    }
  } else {
    res.redirect('/users/sign-in'); // Redirect to the login page if the user is not authenticated
  }
};

// Handle the POST request to update an interview
exports.updateInterview = async (req, res) => {
  const { companyName, date } = req.body;

  try {
    await Interview.findByIdAndUpdate(req.params.id, { companyName, date });
    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating interview data.');
  }
};

// Handle the DELETE request to delete an interview
exports.deleteInterview = async (req, res) => {
  try {
    await Interview.findByIdAndRemove(req.params.id);
    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error deleting interview data.');
  }
};
