import User from "../Model/user.js";



export const index = async (req, res) => {
  const users = User;
  try {
    const data = await users.find();

    res.status(200).json(data);
  } catch (error) {
    console.log(error.message);

    res.status(404).json({ error: error.message });
  }
};


export const login = async (req, res) => {
  const users = User;
  try {
    const user = await users.findOne({ email: req.body.email });

    if (!user)return res.status(404).json({ message: "credentials are not valid" });

    res.status(200).json(user);
  } catch (error) {
    console.log(error.message);

    res.json(error);
  }
};
  

export const signup = async (req, res) => {
  const user = req.body;
  try {
    const createUser = new User({ ...user });

    const saveUser = await createUser.save();

    res.status(404).json(saveUser);
  } catch (error) {
    console.log(error.message);

    res.status(404).json({ error: error.message });
  }
};
   

export const deleteProfile = async (req, res) => {
  const { id } = req.params;
  try {
    const deleteUser = await User.findOneAndDelete(id);

    res.status(200).json(deleteUser);
  } catch (error) {
    console.log(error.message);

    res.json(error);
  }
};