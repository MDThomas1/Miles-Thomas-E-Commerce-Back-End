const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product }]
    })
    res.status(200).json(categoryData)
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }]
    })
    if (!categoryData) {
      res.status(404).json({ message: 'The category that you are searching for could not be found' })
    } 
    res.status(200).json(categoryData)
  } catch (err) {
    res.status(500).json(err)
  }
});

router.post('/', (req, res) => {
  // create a new category
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }]
    })
    if (!categoryData) {
      res.status(404).json({ message: 'The category that you are searching for could not be found' })
    } 
    res.status(200).json(categoryData)
  } catch (err) {
    res.status(500).json(err)
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!categoryData) {
      res.status(404).json({ message: 'The category you wish to delete could not be found.' });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
