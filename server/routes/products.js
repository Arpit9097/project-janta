const router = express.Router();
const { protect, admin } = require('../middleware/auth');
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');
const upload = require('../middleware/upload');

router.route('/')
  .get(getProducts)
  .post(protect, admin, upload.array('images', 5), createProduct);

router.route('/:id')
  .get(getProductById)
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct);

module.exports = router; 