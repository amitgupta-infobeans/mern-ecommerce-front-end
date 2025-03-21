import { CartModel } from "../Models/Cart.js";

// ADD TO USER CART.
export const addToCart = async (req, res) => {
  try {
    const { productId, name, qty, price, picture } = req.body;
    const { userId } = req

    let userCart = await CartModel.findOne({ userId });
    if (!userCart) {
      userCart = new CartModel({ userId, items: [] });
    }
    let findIndexOfProduct = userCart.items.findIndex(
      (product) => product.productId.toString() === productId
    );
    if (findIndexOfProduct > -1) {
      userCart.items[findIndexOfProduct].qty += qty;
      userCart.items[findIndexOfProduct].price += qty * price;
    } else {
      userCart.items.push({ productId, name, qty, price, picture });
    }
    await userCart.save();
    res.status(201).json({
      success: true,
      message: "Item added to cart",
      data: userCart,
    });
  } catch (e) {
    res.status(400).json({ success: false, message: e.message });
  }
};

// GET USER CART.
export const getUserCart = async (req, res) => {
  try {
    const { userId } = req
    const getUserCart = await CartModel.findOne({ userId });
    if (!getUserCart) {
      return res
        .status(404)
        .json({ success: false, message: "No item found in cart" });
    }
    res
      .status(200)
      .json({ success: true, message: "User cart fetched", data: getUserCart });
  } catch (e) {
    res.status(400).json({ success: false, message: e.message });
  }
};

// MINUS QTY OF ITEM.
export const minusQtyOfProduct = async (req, res) => {
  try {
    const { qty, productId } = req.body;
    const { userId } = req
    let userCart = await CartModel.findOne({ userId });
    if (!userCart) {
      return res
        .status(404)
        .json({ success: false, message: "No item in cart" });
    }
    let findIndexOfProduct = userCart.items.findIndex(
      (product) => product.productId.toString() === productId
    );
    if (findIndexOfProduct === -1) {
      res.status(404).json({
        success: false,
        message: "invalid product id",
      });
    }

    let itemData = userCart.items[findIndexOfProduct];
    if (itemData.qty > qty) {
      let pricePerItem = itemData.price / itemData.qty;
      userCart.items[findIndexOfProduct].qty -= qty;
      userCart.items[findIndexOfProduct].price -= pricePerItem * qty;
    } else {
      userCart.items.splice(findIndexOfProduct, 1);
    }
    await userCart.save();
    res.status(201).json({
      success: true,
      message: "Item updated",
      data: userCart,
    });
  } catch (e) {
    res.status(400).json({ success: false, message: e.message });
  }
};

// REMOVE PRODUCT FROM CART.
export const removeProduct = async (req, res) => {
  try {
    let { productId } = req.params;
    const { userId } = req
    let userCart = await CartModel.findOne({ userId });

    if (!userCart) {
      return res
        .status(404)
        .json({ success: false, message: "No Item found." });
    }

    let findIndexOfProduct = userCart.items.findIndex(
      (product) => product.productId.toString() === productId
    );
    // CHECK IF PRODUCT ID NOT FOUND IN USER CART.
    if (findIndexOfProduct === -1) {
      return res.status(404).json({
        success: false,
        message: "product not found.",
      });
    }
    // UPDATE USER CART.
    let updatedCart = userCart.items.filter(
      (product) => product.productId.toString() !== productId
    );
    userCart.items = updatedCart;
    await userCart.save();
    res
      .status(200)
      .json({ success: true, message: "Item removed", data: userCart });
  } catch (e) {
    res.status(400).json({ success: false, message: e.message });
  }
};

// EMPTY CART IN ONE CLICK.
export const emptyCart = async (req, res) => {
  const { userId } = req
  let userCart = await CartModel.findOne({ userId });
  if (!userCart) {
    userCart = new CartModel({ userId, items: [] });
  } else {
    userCart.items = [];
  }
  await userCart.save();
  res
    .status(200)
    .json({ success: true, message: "Cart is empty now", data: [] });
};
