import User from "../models/user.model.js";
import bcrypt from 'bcryptjs';
import createTokenAndSaveCookie from "../jwt/generateToken.js";
  
export const signup = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    if (password != confirmPassword) {
      return res.status(400).json({ message: "password do not match" });  
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" }); 
    }

    const HashedPassword = await bcrypt.hash(password, 10);
    const newUser = await new User({
      name,
      email,
      password: HashedPassword,
    });

    await newUser.save();

    if (newUser) {
      createTokenAndSaveCookie(newUser._id, res);
      return res.status(200).json({ message: "register successfully", 
         _id: newUser._id,
        name: newUser.name,
        email: newUser.email,

       });  
    }

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error" });
  }
};

// login controller

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    const isMatch = await bcrypt.compare(password, user.password);

    

    if (!user || !isMatch) {
      return res.status(400).json({ error: "Invalid user name or password" });
    }

    createTokenAndSaveCookie(user._id, res);
    res.status(201).json({
      message: "User logged in successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.log(error);
   
    res.status(500).json({ error: "Invalid user name or password" });
  }
};


// logout controller 

export const logout = async (req, res) => {
  try {
    res.clearCookie("jwt");
    return res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error" });
  }
}

export const getUserProfile = async (req, res) => {
  try {
    const loggedInUser = req.user._id;

    const allUsers = await User.find({
      _id: { $ne: loggedInUser }
    }).select("-password");

    res.status(201).json({ allUsers });
  } catch (error) {
    console.log("error in user fetch: " + error);
    res.status(500).json({ message: "User not fetched. Server Error." });
  }
};
