const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// find all categories
router.get('/', async (req, res) => {
  const categories = await Category.findAll({
    include: [{
      model: Product
    }]
  });
  res.json(categories);
});

// find one category by its `id` value
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const category = await Category.findAll({
    where: {
      id,
    },
    include: [{
      model: Product
    }]
  })
  res.json(category)
});

// create a new category
router.post('/', async (req, res) => {
  const { category_name } = req.body;
  const category = Category.create({ category_name });
  res.json(category);
});

// update a category by its `id` value
router.put('/:id', async (req, res) => {
  const { id, category_name } = req.body;
  const category = await Category.update(
    {
      category_name,
    },
    {
      where: { id },
    }
  );
  res.json(category);
});

// delete a category by its `id` value
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const category = await Category.destroy({
    where: {
      id,
    }
  })
  res.json(category);
});

module.exports = router;
