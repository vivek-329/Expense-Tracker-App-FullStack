const Transaction = require('../models/transaction');

// @desc Get all transactions
// @route GET /api/v1/transactions
// @access Public
exports.getTransactions = async(req, res, next) => {
    try {
        const transactions = await Transaction.find();
        return res.status(200).json({
            success: true,
            count: transactions.length,
            data: transactions
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
}    


// @desc Post all transactions
// @route Post /api/v1/transactions
// @access Public
exports.addTransactions = async(req, res, next) => {
  try {
    const { text, amount, category } = req.body;
    const transaction = await Transaction.create(req.body);
    return res.status(201).json({
      success: true,
      data: transaction
    });
  } catch (err) {   
    if(err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        error: messages
      });
    } else {
      return res.status(500).json({
        success: false,
        error: 'Server Error'
        }); 
    }
}; 
}    

// @desc Delete transactions
// @route Delete /api/v1/transactions:id
// @access Public
exports.deleteTransactions = async (req, res, next) => {
    try {
        const { id } = req.params;

        // Validate the ID
        if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({
                success: false,
                error: 'Invalid transaction ID',
            });
        }

        // Find and delete the transaction by ID
        const transaction = await Transaction.findByIdAndDelete(id);

        if (!transaction) {
            return res.status(404).json({
                success: false,
                error: 'Transaction not found',
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Transaction deleted successfully',
        });
    } catch (err) {
        console.error(`Error deleting transaction: ${err.message}`);
        return res.status(500).json({
            success: false,
            error: 'Server error',
        });
    }
};
