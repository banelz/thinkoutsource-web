const express = require('express');
const router = express.Router();
const formController = require('../controllers/formController');

// Support both / and /api variants through express app mounting or direct definition
router.post('/submit_contact', formController.submitContact);
router.post('/submit_career', formController.submitCareer);
router.post('/submit_debt', formController.submitDebt);

module.exports = router;
