const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  const categories = await Category.findAll();
  res.json(categories);
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  const { id } = req.params;
  const category = await Category.findAll({
    where: {
      id,
    }
  })
  res.json(category)
});

router.post('/', async (req, res) => {
  // create a new category
  const { category_name } = req.body;
  const category = Category.create({ category_name });
  res.json(category);
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
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

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  const { id } = req.params;
  const category = await Category.destroy({
    where: {
      id,
    }
  })
  res.json(category);
});

module.exports = router;
