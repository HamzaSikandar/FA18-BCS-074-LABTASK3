var mongoose = require("mongoose");
const joi = require("@hapi/joi");
const Joi = require("@hapi/joi");
var customerSchema = mongoose.Schema({
  name: String,
  Mobile_no: Number,
  email: String,
  NumberofPersons: Number,
  Timings: String,
});

var Customer = mongoose.model("Customer", customerSchema);
function validateCustomer(data) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(20).required(),
    Mobile_no: joi.number().min(13).required(),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required(),
    NumberofPersons: Joi.string().min(1).required(),
    Timings: joi.string().required(),
  });
  return schema.validate(data, { abortEarly: false });
}
module.exports.Customer = Customer;
module.exports.validate = validateCustomer;
