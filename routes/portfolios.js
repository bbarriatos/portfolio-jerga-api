const express = require('express');
const router = express.Router();
const {
  getPortfolios,
  getPortfolioById,
  createPortfolio,
  updatePortfolio,
  deletePortfolio,
} = require('../controllers/portfolios');
const { checkJwt, checkRole } = require('../controllers/auth');

router.get('', getPortfolios);
router.get('/:id', getPortfolioById);
router.patch('/:id', checkJwt, checkRole('admin'), updatePortfolio);
router.delete('/:id', checkJwt, checkRole('admin'), deletePortfolio);
router.post('', checkJwt, checkRole('admin'), createPortfolio);

module.exports = router;
