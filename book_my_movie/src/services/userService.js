import { UserModel } from "@/models/auth/userModel";

// create user
export const createUser = async (userData) => {
    const newUser = new UserModel(userData);
    await newUser.save();
    return newUser;
}

// get all users

export const getAllUsers = async () => {
    const users = await UserModel.find();
    return users;
}

// get user by id
export const getUserById = async (userId) => {
    const user = await UserModel.findById(userId);
    return user;
}

// get user by email
export const getUserByEmail = async (email) => {
    const user = await UserModel.findOne({ email });
    return user;
}   

// activate user

export const activateUser = async (userId, updateData) => {
    const updatedUser = await UserModel.findByIdAndUpdate(
    userId,
    { ...updateData, activeUser: true }, // merge here
    { new: true }
  );
  
    if(!updatedUser) {
        throw new Error("User not found");
    }
    return updatedUser;
}