const Sale = require('../models/sale');


// Create a new Sales
exports.createSale = async (req, res) => {
  const { product, quantity, price } = req.body;

  try {
    // Create a new product
    const newSale = new Sale({
      product: product,
      quantity: quantity,
      price: price
    });

    // Save the product to the database
    const savedSale = await newSale.save();
    console.log('Product saved successfully:', savedSale);

    // Send a response back to the client
    res.status(200).json(savedSale);
  } catch (error) {
    console.error('Error saving product:', error);
    // Send an error response back to the client
    res.status(500).json({ error: 'An error occurred while saving the product.' });
  }
};
