const Admin = require("../model/Admin");

const handleLogin = async (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);

  if (!username || !password) {
    return res
      .send({ message: "Username and Password are required" });
  }

  const user = await Admin.findOne({ userName: username});

  if (!user) {
    return res.status(401).json({ message: "User not found" });
  }

  if (username == user.userName && password == user.password) {
      res.json({ success: true, message: "Login successful" });
  } else {
    return res.status(401).json({ message: "Incorrect Password" });
  }

};

const changePassword = async (req,res) => {
  const { password, username } = req.body;

  if (!password) {
    return res.send({ message: "Password is required" });
  }

  const user = await Admin.findOne({ userName: username});

  if (!user) {
    return res.status(401).json({ message: "User not found" });
  }

  user.password = password;
  await user.save();

  res.json({ success: true, message: "Password changed successfuly" });

  console.log(user);
};

module.exports = {handleLogin, changePassword};
