import jwt from 'jsonwebtoken';

const createTokenAndSaveCookie = (userId, res) => {
    const token = jwt.sign({ id: userId }, process.env.JWT_TOKEN, {
        expiresIn: '5d',
    });
   res.cookie("jwt",token,{
    httpOnly: true, // xss se protect
    secure: true,
    sameSite: "strict", // csrf se protect
   });
};

export default createTokenAndSaveCookie;