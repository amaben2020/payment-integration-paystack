const express = require("express");
const router = express.Router();
const initializePayment = require("../Controllers/controllers"); // import the controller

router.post("/acceptpayment", initializePayment.acceptPayment);
router.get("/verify-payment", initializePayment.verifyPayment);
router.get("/list-payment-invoices", initializePayment.listPaymentInvoices);

module.exports = router;
