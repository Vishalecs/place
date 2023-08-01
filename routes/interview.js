const express = require('express');
const router = express.Router();

const interviewController = require('../controller/interviewController');

router.get('/add', interviewController.renderAddInterviewForm);
router.post('/add', interviewController.addInterview);
router.get('/edit/:id', interviewController.renderEditInterviewForm);
router.post('/edit/:id', interviewController.updateInterview);
router.delete('/delete/:id', interviewController.deleteInterview);
router.get('/interviews', interviewController.displayInterviews);

module.exports = router;
