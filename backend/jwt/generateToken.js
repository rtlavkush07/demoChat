import jwt from 'jsonwebtoken';

const createTokenAndSaveCookie = (userId, res) => {
    const token = jwt.sign({ id: userId }, process.env.JWT_TOKEN, {
        expiresIn: '5d',
    });
    
   res.cookie("jwt", token, {
    httpOnly: true, // protects from XSS
    secure: true,   // required when sameSite is "none"
    sameSite: "none", // REQUIRED to allow Vercel to talk to Render
   });
};

export default createTokenAndSaveCookie;
