const express = require('express');
const router = express.Router();
const { viewVisits, logVisit } = require('../controllers/visitsController');

router.get('/visits', viewVisits);

router.post('/newVisit', logVisit);

module.exports = router;