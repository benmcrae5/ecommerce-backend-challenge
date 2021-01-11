const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products
router.get('/', async (req, res) => {
  // be sure to include its associated Category and Tag data
  const products = await Product.findAll({
    include: {
      model: Category
    },
    include: {
      model: Tag
    }
  });
  res.json(products);
});

// get one product
router.get('/:id', async (req, res) => {
  // find a single product by its `id`
  // be sure to include its associated Category and Tag data
  const { id } = req.params;
  const product = await Product.findAll({
    where: {
      id
    },
    include: Category,
    include: Tag
  });
  res.json(product);
});

// create new product
router.post('/', async (req, res) => {
  /* req.body should look like this:
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      tagIds: [1, 2, 3, 4]
    }
  */
  const product = await Product.create(req.body)
    try {
      // if there's product tags, we need to create pairings to bulk create in the ProductTag model
      if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        const productTagIds = await ProductTag.bulkCreate(productTagIdArr);
        res.status(200).json(productTagIds);
      } else {
        // if no product tags, just respond
        res.status(200).json(product);
      }
    }
    catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
});



// update product
router.put('/:id', async (req, res) => {
  // update product data
  try{
    const { id } = req.params;
    const product = await Product.update(req.body, {
      where: {
        id,
      },
    })
    res.json(product);

    
    // find all associated tags from ProductTag
    const productTags = await ProductTag.findAll({ 
      where: { 
        product_id: id 
      } 
    });
    // get list of current tag_ids
    const productTagIds = productTags.map(({ tag_id }) => tag_id);
    // create filtered list of new tag_ids
    const newProductTags = req.body.tagIds
      .filter((tag_id) => !productTagIds.includes(tag_id))
      .map((tag_id) => {
        return {
          product_id: id,
          tag_id,
        };
      });
    // figure out which ones to remove
    const productTagsToRemove = productTags
      .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
      .map(({ id }) => id);

    // run both actions
    await ProductTag.destroy({ where: { id: productTagsToRemove } }),
    await ProductTag.bulkCreate(newProductTags),
    res.json(updatedProductTags);
  }
   catch (err) {
      // console.log(err);
      res.status(400).json(err);
    }
});




router.delete('/:id', async (req, res) => {
  // delete one product by its `id` value
  const { id } = req.params;
  const product = await Category.destroy({
    where: {
      id
    }
  })
});

module.exports = router;
