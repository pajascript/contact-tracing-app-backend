const express = require('express');
const router = express.Router();
const { saveAdmin, showAdmin } = require("../controllers/adminController");

router.post('/new-admin', saveAdmin);
router.get('/adminList', showAdmin);


module.exports = router;