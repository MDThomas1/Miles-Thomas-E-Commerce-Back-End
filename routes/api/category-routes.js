// Imports necessary information for routes to be used on this page
const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// Gets all categories in the database
router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product }]
    })
    res.status(200).json(categoryData)
  } catch (err) {
    res.status(500).json(err);
  }
});

// Gets one category based on an id provided within the parameters
router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }]
    })
    if (!categoryData) {
      res.status(404).json({ message: 'The category that you are searching for could not be found.' })
    } 
    res.status(200).json(categoryData)
  } catch (err) {
    res.status(500).json(err)
  }
});

// Creates a new original category
router.post('/', async (req, res) => {
  try {
    const categoryData = await User.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Finds a category through its id and updates the information within it
router.put('/:id', async (req, res) => {
  try {
    const categoryData = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!categoryData[0]) {
      res.status(404).json({ message: 'The category that you are searching for could not be found.' });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Finds a category based on its id and deletes it
router.delete('/:id', async (req, res) => {
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!categoryData) {
      res.status(404).json({ message: 'The category that you are searching for could not be found.' });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Exports all the routes within the page
module.exports = router;
