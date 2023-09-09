const Sale = require('../models/sale');

exports.getTotalRevenue = async (req, res) => {
  try {
    const totalRevenue = await Sale.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: { $multiply: ['$quantity', '$price'] } },
        },
      },
    ]);

    res.json({ totalRevenue: totalRevenue[0].total });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};




exports.getQuantityByProduct = async (req, res) => {
  try {
    const quantityByProduct = await Sale.aggregate([
      {
        $group: {
          _id: '$product',
          totalQuantity: { $sum: '$quantity' },
        },
      },
    ]);

    res.json(quantityByProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};




exports.getTopProducts = async (req, res) => {
  try {
    const topProducts = await Sale.aggregate([
      {
        $group: {
          _id: '$product',
          totalRevenue: { $sum: { $multiply: ['$quantity', '$price'] } },
        },
      },
      {
        $sort: { totalRevenue: -1 },
      },
      {
        $limit: 5,
      },
    ]);

    res.json(topProducts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};




exports.getAveragePrice = async (req, res) => {
  try {
    const averagePrice = await Sale.aggregate([
      {
        $group: {
          _id: null,
          averagePrice: { $avg: '$price' },
        },
      },
    ]);

    res.json({ averagePrice: averagePrice[0].averagePrice });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};





exports.getRevenueByMonth = async (req, res) => {
  try {
    const revenueByMonth = await Sale.aggregate([
      {
        $group: {
          _id: {
            year: { $year: '$date' },
            month: { $month: '$date' },
          },
          totalRevenue: { $sum: { $multiply: ['$quantity', '$price'] } },
        },
      },
      {
        $project: {
          _id: 0,
          year: '$_id.year',
          month: '$_id.month',
          totalRevenue: 1,
        },
      },
    ]);

    res.json(revenueByMonth);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};





exports.getHighestQuantitySold = async (req, res) => {
  try {
    const highestQuantitySold = await Sale.findOne().sort('-quantity');

    res.json(highestQuantitySold);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};




// exports.getDepartmentSalaryExpense = async (req, res) => {
//   try {
//     const departmentSalaryExpense = await Department.aggregate([
//       {
//         $group: {
//           _id: '$name',
//           totalSalaryExpense: { $sum: '$salary' },
//         },
//       },
//     ]);

//     res.json(departmentSalaryExpense);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };
