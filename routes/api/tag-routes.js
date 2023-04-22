const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: [
        {
          model: Product,
          through: ProductTag,
          as: "tagged_products",
        },
      ],
    });
    res.status(200).json(tagData);
  } catch (error) {
    res.send(500).json(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const tagData = await Tag.finByPk(req.params.id, {
      include: [
        {
          model: Product,
          through: ProductTag,
          as: "tagged_products",
        },
      ],
    });

    if (!tagData) {
      res.status(404).json({ message: "Product with that ID doesn't exist" });
      return;
    } else {
      res.status(200).json(tagData);
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const tagData = await Tag.create({
      tag_name: req.body.tag_name,
    });
    res.status(200).json(tagData);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const tagData = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (!tagData) {
      res.status(404).json({ message: "Tag with that ID doesn't exist" });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!tagData) {
      res.status(404).json({ message: "Tag with that ID doesn't exist" });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
