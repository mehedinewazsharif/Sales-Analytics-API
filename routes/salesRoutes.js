const express = require('express');
const router = express.Router();
const salesController = require('../controllers/salesController');


router.get('/total-revenue', salesController.getTotalRevenue);

router.get('/quantity-by-product', salesController.getQuantityByProduct);

router.get('/top-products', salesController.getTopProducts);

router.get('/average-price', salesController.getAveragePrice);

router.get('/revenue-by-month', salesController.getRevenueByMonth);

router.get('/highest-quantity-sold', salesController.getHighestQuantitySold);

// Department Salary Collection is not here

//router.get('/department-salary-expense', salesController.getDepartmentSalaryExpense);



module.exports = router;
