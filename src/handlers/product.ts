import { Request, Response } from "express";
import Product from "../models/Product.module";

export const createProduct = async (req: Request, res: Response) => {
  //   const product = new Product(req.body);
  //   const savedProduct = await product.save();
  const product = await Product.create(req.body);
  res.json({ data: product });
};
