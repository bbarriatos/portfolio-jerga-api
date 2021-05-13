const express = require('express');
const router = express.Router();
const {
  getPortfolios,
  getPortfolioById,
  createPortfolio,
} = require('../controllers/portfolios');
const { checkJwt } = require('../controllers/auth');

router.get('', getPortfolios);
router.get('/:id', getPortfolioById);

router.post('', checkJwt, createPortfolio);

module.exports = router;
