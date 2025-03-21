import { AddressModel } from "../Models/Address.js";

// ADD USER ADDRESS.
export const addAddress = async (req, res) => {
  try {
    const { userId } = req;
    const { fullName, address, city, state, country, pinCode, phoneNumber } =
      req.body;

    let userAddress = await AddressModel.create({
      userId,
      fullName,
      address,
      city,
      state,
      country,
      pinCode,
      phoneNumber,
    });
    res
      .status(201)
      .json({ success: true, message: "Address added", data: userAddress });
  } catch (e) {
    res.status(400).json({ success: false, message: e.message });
  }
};

// GET THE LATEST ADDRESS OF USER.
export const getAddress = async (req, res) => {
  try {
    const { userId } = req;
    let userAddress = await AddressModel.find({ userId: userId }).sort({
      createdAt: -1,
    });
    if (!userAddress) {
      return res
        .status(404)
        .json({ success: false, message: "No Address found" });
    }
    res.status(200).json({
      success: true,
      message: "User Address fetched",
      data: userAddress[0],
    });
  } catch (e) {
    res.status(400).json({ success: false, message: e.message });
  }
};
