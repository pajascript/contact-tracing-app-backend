const express = require('express');
const router = express.Router();
const { saveAdmin } = require("../controllers/adminController");

router.post('/new-admin', saveAdmin);


module.exports = router;