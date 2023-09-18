const express = require("express");

const router = express.Router();

const { contactusEndpoint } = require("../controllers/ContactUs")

router.post("/contactusEndpoint", contactusEndpoint);

module.exports = router;