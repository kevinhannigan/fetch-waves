import express from 'express'
import asyncHandler from 'express-async-handler'
import User from '../models/UserModel.js'

const router = express.Router()
// @desc Fetch all users
// @route GET api/users/
router.get('/', asyncHandler(async (req, res) => {
    const users = await User.find({})
    
    if(users) {
        res.json(users)
    } else {
        res.status(404).json({message: 'No Users Found'})
    }
}))

// @desc Fetch specific safety location
// @route GET api/users/id
router.get('/:id', asyncHandler(async (req, res) => {
    const user = await User.findOne({_id: req.params.id})
    if(user) {
        res.json(user)
    } else {
        res.status(404).json({message: 'User Not Found'})
    }
}))

// @desc Fetch specific safety location
// @route GET api/users/id
router.get('/admin/current', asyncHandler(async (req, res) => {
  let user_id = req.session.user_id;
  if (!user_id) {
    console.log("user_id was undefined");
    res.status(200).send(undefined);
    return;
  }
  User.findOne({ _id: user_id }, (_, user) => {
    if (!user) {
      console.log("id was not recognized");
      res.status(400).send("id was not recognized");
      return;
    }

    let { _id, loginName } = user;
    let newUser = { _id, loginName };
    res.status(200).send(newUser);
  });
}))



// @desc login a specific user and return a session ID
// @route POST api/users/admin/login
router.post("/admin/login", function(request, response) {
  //request.session is an object you can read or write
  //parameter in request body is accessed using request.body.parameter_name
  let loginName = request.body.login_name;
  let password_attempt = request.body.password;
  User.findOne({ login_name: loginName }, (err, user) => {
    if (err || !user) {
      console.log("User with login_name:" + loginName + " not found.");
      response.status(400).send("Login name was not recognized");
      return;
    }
    if (user.password != password_attempt) {
      response.status(400).send("Wrong password");
      return;
    }
    request.session.login_name = loginName;
    request.session.user_id = user._id;
    // request.session.cookie.user_id = user._id;
    let { _id, first_name, last_name, login_name } = user;
    let newUser = { _id, first_name, last_name, login_name };

    response.status(200).send(newUser);
  });
  //store into request.session.user_id so that others can read.
});


// @desc login a specific user and return a session ID
// @route POST api/users/admin/logout
router.post("/admin/logout", function(request, response) {
  //request.session is an object you can read or write
  request.session.destroy(function(err) {
    if (err) {
      console.log(err);
      response.status(400).send("unable to logout");
      return;
    }
    response.status(200).send("successfully logged out");
  });
});

export default router