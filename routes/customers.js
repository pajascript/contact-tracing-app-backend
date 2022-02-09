const express = require('express');
const router = express.Router();
const { saveCustomer, loginCustomer } = require('../controllers/customersController');



router.post('/register', saveCustomer);

router.post('/login', loginCustomer);

module.exports = router