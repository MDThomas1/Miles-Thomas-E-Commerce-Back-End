const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// Gets all tags within the database
router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product }, { model: ProductTag }]
    })
    res.status(200).json(tagData)
  } catch (err) {
    res.status(500).json(err);
  }
  
});

// Gets one tag based on an id provided within the request parameters
router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }, { model: ProductTag }]
    })
    if (!tagData) {
      res.status(404).json({ message: 'The tag that you are searching for could not be found' })
    } 
    res.status(200).json(tagData)
  } catch (err) {
    res.status(500).json(err)
  }
});

// Creates a new tag
router.post('/', async (req, res) => {
  try {
    const tagData = await User.create(req.body);
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Finds a tag based on its id and updates its associated information
router.put('/:id', async (req, res) => {
  try {
    const tagData = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!tagData[0]) {
      res.status(404).json({ message: 'The tag that you are searching for could not be found.' });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Finds a tag based on its id and deletes it
router.delete('/:id', async (req, res) => {
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!tagData) {
      res.status(404).json({ message: 'The tag that you are searching for could not be found.' });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
