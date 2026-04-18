import jwt from "jsonwebtoken";
import { RefreshTokenModel } from "../../models/auth/refreshTokenModel.js";



// generate token
export const generateToken = (payload) => {
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn : process.env.ACCESS_TOKEN_EXPIRATION });
    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn : process.env.REFRESH_TOKEN_EXPIRATION });

    return { accessToken, refreshToken };
}

// store refresh token
export const storeRefreshToken = async (userId, refreshToken) => {
    try {
        await RefreshTokenModel.create({ userId, token : refreshToken });
    } catch (error) {
        throw error;
    }
}

// verify access token
export const verifyAccessToken = async (token) => {
    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        
        
        return decoded;
    } catch (error) {
        throw error;
    }
}
// verify refresh token
export const verifyRefreshToken = async (token) => {
    try {
        const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
        return decoded;
    } catch (error) {
        throw error;
    }
}

// db operations on token 
export const findRefreshToken = async (userId, token) => {
    return await RefreshTokenModel.findOne({ userId, token });
}

export const deleteRefreshToken = async (token) => {
    return await RefreshTokenModel.findOneAndDelete({ token });
}

export const updateRefreshToken = async (userId, newToken) => {
    try {
        return await RefreshTokenModel.findOneAndUpdate({ userId }, { token : newToken }, { upsert : true });
    } catch (error) {
        throw error;
    }
}