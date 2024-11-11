const userModel = require("../Models/user_model");

exports.getUsers = async (req, res) => {
  try {
    const users = await userModel.getAllUsers()
    res.json(users)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

exports.setUser = async (req, res) => {
  try {
    const createEmail = req.body.email;
    const createPWD = req.body.password;

    // const test = req.body
    // console.log(test);
    // const {email, password} = req.body //need to be the same with the name of variable
    // console.log(email, password);

    // const { name } = req.body  // {} is for destructuring  json body, might not require if directly accessed
    // if (!name) {
    //   return res.status(400).json({ error: 'Name is required' })
    // }
    
    const result = await userModel.createUser(createEmail, createPWD)
    console.log(result);
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

// exports.setUser = (req, res) => {
//   const createEmail = req.body.email;
//   const createPWD = req.body.password;

//   const sqlCreate = "INSERT INTO users (email, password) VALUES (?,?)";
//   user.query(sqlCreate, [createEmail, createPWD], (err, result) => {
//       console.log(result);
//   });
// }


exports.deleteUser = async (req, res) => {
  const {userID} = req.params;
  //console.log(userID);
  try {
    const deleted = await userModel.removeUser(userID);
    if (deleted) {
      res.status(200).json({ message: 'User deleted successfully' });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal Server Error' });
  }
}