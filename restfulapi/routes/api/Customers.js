const express = require("express");
let router = express.Router();
var { Customer } = require("../../models/customer");
const validateCustomer = require("../../middleware/validatecustomer");
//get all customers
router.get("/", async (req, res) => {
  let customers = await Customer.find();
  return res.send(customers);
});

//get single customer
router.get("/:id", async (req, res) => {
  try {
    let customer = await Customer.findById(req.params.id);
    return res.send(customer);
  } catch (err) {
    return res.status(400).send("Invalid ID");
  }
});

//update a record
router.put("/:id", validateCustomer, async (req, res) => {
  let customer = await Customer.findById(req.params.id);
  customer.name = req.body.name;
  customer.Mobile_no = req.body.Mobile_no;
  customer.email = req.body.email;
  customer.NumberofPersons = req.body.NumberofPersons;
  customer.Timings = req.body.Timings;
  await customer.save();
  return res.send(customer);
});

//deleting a record
router.delete("/:id", async (req, res) => {
  let customer = await Customer.findByIdAndDelete(req.params.id);
});

//inserting a record
router.post("/", validateCustomer, async (req, res) => {
  let customer = new Customer();
  customer.name = req.body.name;
  customer.Mobile_no = req.body.Mobile_no;
  customer.email = req.body.email;
  customer.NumberofPersons = req.body.NumberofPersons;
  customer.Timings = req.body.Timings;
  await customer.save();
  return res.send(customer);
});

module.exports = router;
