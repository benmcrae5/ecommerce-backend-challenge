const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // be sure to include its associated Product data
  const tags = await Tag.findAll();
  res.json(tags);
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  const { id } = req.params;
  const tags = await Tag.findAll({
    where: {
      id
    },
    include: {
      model: Product
    }
  });
  res.json(tags);

});

router.post('/', async (req, res) => {
  // create a new tag
  const { tag_name } = req.body; 
  const tag = await Tag.create({
    tag_name
  })
  res.json(tag);
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  const { id, tag_name } = req.body;
  const tag = await Tag.update(
    {
      tag_name,
    },
    {
      where: { id },
    }
  );
  res.json(tag);
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  const { id } = req.params;
  const tag = await Tag.destroy({
      where: { 
        id
      },
    });
  res.json(tag);
});

module.exports = router;
