const express = require("express")
const router = express.Router();
const fs = require('fs');

const taskRoutes = require('./tasks') // import task route
router.use(taskRoutes) // use task route

module.exports = router;