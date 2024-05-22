import { Router } from "express";
import { body, param } from "express-validator";
import {
  createProduct,
  deleteProduct,
  getProducts,
  getProductsById,
  updateProduct,
  updateProductAvailability,
} from "./handlers/product";
import { handleInputErrors } from "./middleware";
const router = Router();

//Routing
router.get("/", getProducts);
router.get(
  "/:id",
  param("id").isInt().withMessage("Invalid ID"),
  handleInputErrors,
  getProductsById
);

router.post(
  "/",
  // validacion en la ruta
  body("name").notEmpty().withMessage("Name is required"),
  body("price")
    .isNumeric()
    .withMessage("Price must be numeric")
    .notEmpty()
    .withMessage("Price is required")
    .custom((value) => value > 0)
    .withMessage("Price must be greater than 0"),
  handleInputErrors,
  createProduct
);

router.put(
  "/:id",
  param("id").isInt().withMessage("Invalid ID"),
  body("name").notEmpty().withMessage("Name is required"),
  body("price")
    .isNumeric()
    .withMessage("Price must be numeric")
    .notEmpty()
    .withMessage("Price is required")
    .custom((value) => value > 0)
    .withMessage("Price must be greater than 0"),
  body("availability").isBoolean().withMessage("Availability must be boolean"),
  handleInputErrors,
  updateProduct
);

router.patch(
  "/:id",
  param("id").isInt().withMessage("Invalid ID"),
  handleInputErrors,
  updateProductAvailability
);

router.delete(
  "/:id",
  param("id").isInt().withMessage("Invalid ID"),
  handleInputErrors,
  deleteProduct
);

export default router;
