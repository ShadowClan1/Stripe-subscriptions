const { default: mongoose, Schema } = require("mongoose");

const planSchema = new Schema({
  sub_name: {
    type: String,
    required: true,
  },
  default_price_id: {
    type: Schema.Types.ObjectId,
    // required: true,
    ref: "Price",
  },
  price_ids: [
    {
      type: Schema.Types.ObjectId,
      ref: "Price",
    },
  ],
  prod_id: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  activatedAt: {
    type: Date,
  },
  retiredAt: {
    type: Date,
  },
  status: {
    type: String,
    required: true,
  },
});
const Plan = mongoose.model("Plan", planSchema);

const subSchema = new Schema({
  sub_id: {
    type: String,
    required: true,
  },
  price_id: {
    type: Schema.Types.ObjectId,
    // required: true,
    ref: "Price",
  },
  prod_id: {
    type: Schema.Types.ObjectId,
    // required: true,
    ref: "Plan",
  },
  customer_id: {
    type: String,
    required: true,
  },
  currency: {
    type: String,
    required: true,
  },
  collection_method: {
    type: String,
    required: true,
  },
  default_payment_method: {
    type: String,
    // required: true,
  },

  latest_invoice: {
    type: Schema.Types.ObjectId,
    ref: "Invoice",
  },
  invoices: [
    {
      type: Schema.Types.ObjectId,
      ref: "Invoice",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  current_period_start: {
    type: Date,
  },
  current_period_end: {
    type: Date,
  },
  activatedAt: {
    type: Date,
  },
  cancelAt: {
    type: Date,
  },
  status: {
    type: String,
    required: true,
  },
});

const Subscription = mongoose.model("Subscription", subSchema);

const priceSchema = new Schema({
  price_id: {
    type: String,
    required: true,
  },
  prod_id: {
    type: Schema.Types.ObjectId,
    ref: "Plan",
  },
  price: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const Price = mongoose.model("Price", priceSchema);

const invoiceSchema = new Schema({
  inv_id: {
    type: String,
    required: true,
  },
  amount_paid: {
    type: Number,
    required: true,
  },
  attempted_count: {
    type: Number,
    required: true,
  },
  
  price_id: {
    type: Schema.Types.ObjectId,
    // required: true,
    ref: "Price",
  },
  prod_id: {
    type: Schema.Types.ObjectId,
    // required: true,
    ref: "Plan",
  },
  amount_due: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  amount_due: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  activatedAt: {
    type: Date,
  },
  cancelAt: {
    type: Date,
  },
  status: {
    type: String,
    required: true,
  },
});

const Invoice = mongoose.model("Invoice", invoiceSchema);

module.exports = { Invoice, Subscription, Plan, Price };
