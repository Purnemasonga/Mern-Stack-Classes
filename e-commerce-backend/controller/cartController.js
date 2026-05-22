const CartProducts = require("../model/CartModel");
const mongoose = require("mongoose");
//addToCart
const addToCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    if (!userId || !productId) {
      res.status(401).json({ message: "missing required fields" });
    }

    const PriceDetails = await CartProducts.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(userId) } },
      { $unwind: "$productIds" },
      {
        $lookup: {
          from: "products",
          foreignField: "_id",
          localField: "productIds",
          as: "productDetails",
        },
      },
      { $unwind: "$productDetails" },
      {
        $group: {
          _id: "$userId",
          totalPrice: { $sum: "$productDetails.price" },
        },
      },
    ]);

    if (
      (await CartProducts.findOne({
        userId: new mongoose.Types.ObjectId(userId),
      })) === null
    ) {
      await CartProducts.create({
        userId: userId,
        productIds: [productId],
        totalPrice: PriceDetails.totalPrice,
      });
    } else {
      await CartProducts.updateOne(
        { userId: new mongoose.Types.ObjectId(userId) },
        {
          $push: { productIds: productId },
          $set: { totalPrice: PriceDetails.totalPrice },
        },
      );
    }
    res.status(200).json({ message: "add to cart successfull" });
  } catch (error) {
    res.status(500).json({ message: "Failed to add Cart", error });
  }
};

//get Cart Products
const getCartProducts = async (req, res) => {
  try {
    const { userId } = req.params;
    const AllProducts = await CartProducts.aggregate([
      { $match: { userId: await new mongoose.Types.ObjectId(userId) } },
      { $unwind: "$productIds" },
      {
        $lookup: {
          from: "products",
          foreignField: "_id",
          localField: "productIds",
          as: "Products_in_cart",
        },
      },
      {
        $project: { Products_in_cart: 1, _id: 0 },
      },
    ]);
    res.status(200).json({ AllProducts });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Internal server error", error });
  }
};

//remove Cart products based on ID
const removeCartProduct = async (req, res) => {
  try {
    const { userId, productId } = req.body;
    const removedProducts = await CartProducts.updateOne(
      { userId: new mongoose.Types.ObjectId(userId) },
      { $pull: { productIds: new mongoose.Types.ObjectId(productId) } },
    );

    res.status(200).json({ removedProducts });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

//remove All Cart Products

//set: initialize empty array all the fields
//un-set:
const removeAllProducts = async (req, res) => {
  try {
    const { userId } = req.query;
    const removeAll = await CartProducts.updateOne(
      { userId: new mongoose.Types.ObjectId(userId) },
      { $set: { productIds: [] } },
    );

    res.status(200).json({ removeAll });
  } catch (error) {
    res.status(500).json({ message: "Failed to remove all products", error });
  }
};

module.exports = {
  addToCart,
  getCartProducts,
  removeCartProduct,
  removeAllProducts,
};
