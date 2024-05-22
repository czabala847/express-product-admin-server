import { Request, Response } from "express";
// import { check, validationResult } from "express-validator";
import Product from "../models/Product.module";

export const getProductsById = async (req: Request, res: Response) => {
  try {
    const productId = req.params.id;
    const product = await Product.findByPk(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ data: product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.findAll({
      order: [["price", "ASC"]],
    });
    res.json({ data: products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  //Validación en el controlador -> se mueve a la ruta
  // await check("name").notEmpty().withMessage("Name is required").run(req);
  // await check("price")
  //   .isNumeric()
  //   .withMessage("Price must be numeric")
  //   .notEmpty()
  //   .withMessage("Price is required")
  //   .custom((value) => value > 0)
  //   .withMessage("Price must be greater than 0")
  //   .run(req);

  //Validación en el controlador -> se mueve a un middleware
  // let errors = validationResult(req);

  // if (!errors.isEmpty()) {
  //   return res.status(400).json({ errors: errors.array() });
  // }

  try {
    const product = await Product.create(req.body);
    res.json({ data: product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const productId = req.params.id;
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    await product.update(req.body);
    await product.save();
    res.json({ data: product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProductAvailability = async (
  req: Request,
  res: Response
) => {
  try {
    const productId = req.params.id;
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.availability = !product.dataValues.availability;
    await product.save();

    res.json({ data: product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const productId = req.params.id;
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await product.destroy();
    res.json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
