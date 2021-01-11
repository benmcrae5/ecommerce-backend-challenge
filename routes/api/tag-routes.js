const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

//find all tags
router.get('/', async (req, res) => {
  const tags = await Tag.findAll();
  res.json(tags);
});

// find a single tag by its `id`
router.get('/:id', async (req, res) => {
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

// create a new tag
router.post('/', async (req, res) => {
  const { tag_name } = req.body; 
  const tag = await Tag.create({
    tag_name
  })
  res.json(tag);
});

// update a tag's name by its `id` value
router.put('/:id', async (req, res) => {
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

// delete on tag by its `id` value
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const tag = await Tag.destroy({
      where: { 
        id
      },
    });
  res.json(tag);
});

module.exports = router;
