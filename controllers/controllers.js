require("dotenv").config();
const express = require("express");
let PayStack = require("paystack-node");

let APIKEY = process.env.PAYSTACK_SECRET_KEY;
const environment = process.env.NODE_ENV;

const paystack = new PayStack(APIKEY, environment);

const feesCalculator = new PayStack.Fees();
const feeCharge = feesCalculator.calculateFor(250000); // 2,500 Naira

const payStack = {
  acceptPayment: async (req, res) => {
    const { email, amount } = req.body;
    try {
      const response = await paystack.initializeTransaction({
        amount, // 5,000 Naira (remember you have to pass amount in kobo)
        email,
      });

      res.json({
        ...response.body.data,
      });
    } catch (error) {
      console.log("error", error);
    }
  },
  verifyPayment: async (req, res) => {
    try {
      const data = await paystack.verifyTransaction({
        reference: req.query.reference,
      });
      console.log(data.body);
      res.send(data.body.message);
    } catch (error) {
      console.log(error);
    }
  },

  listPaymentInvoices: async (req, res) => {
    try {
      const data = await paystack.listInvoices({
        customer: req.query.cus_code,
        status: "pending",
        paid: false,
        currency: "NGN",
      });

      res.send(data.body.message);
    } catch (error) {
      console.log(error);
    }
  },
};

const initializePayment = payStack;
module.exports = initializePayment;
