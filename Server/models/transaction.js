const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
 text: {
   type: String,
   trim: true,
   required: [true, 'Please add some text']
 },
    amount: {
    type: Number,
    required: [true, 'Please add a positive or negative number']
    },
    category: {
      type: String,
      trim: true,
      required: [true, 'Please add a category'] // Ensures category is always provided
    },
    createdAt: {
    type: Date,
    default: Date.now
    }
});

module.exports = mongoose.model('Transaction', TransactionSchema);