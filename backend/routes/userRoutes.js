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

// @desc Fetch specific user id
// @route GET api/users/id
router.get('/:id', asyncHandler(async (req, res) => {
    const user = await User.findOne({_id: req.params.id})
    if(user) {
        res.json(user)
    } else {
        res.status(404).json({message: 'User Not Found'})
    }
}))

// @desc Fetch current user ID
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

    let { _id, login_name } = user;
    let newUser = { _id, login_name };
    res.status(200).send(newUser);
  });
}))



// @desc login a specific user and return a session ID
// @route POST api/users/admin/login
router.post("/admin/login", function(req, res) {
  let loginName = req.body.login_name;
  let password_attempt = req.body.password;
  User.findOne({ login_name: loginName }, (err, user) => {
    if (err || !user) {
      res.status(400).send("Login name not recognized");
      return;
    }
    if (user.password != password_attempt) {
      res.status(400).send("Incorrect password");
      return;
    }
    req.session.login_name = loginName;
    req.session.user_id = user._id;
    // req.session.cookie.user_id = user._id;
    let { _id, login_name } = user;
    let newUser = { _id, login_name };

    res.status(200).send(newUser);
  });
});


// @desc login a specific user and return a session ID
// @route POST api/users/admin/logout
router.post("/admin/logout", function(req, res) {
  req.session.destroy(function(err) {
    if (err) {
      console.log(err);
      res.status(400).send("unable to logout");
      return;
    }
    res.status(200).send("successfully logged out");
  });
});

router.post("/admin/new", function(req, res) {
  let {
    login_name,
    password
  } = req.body;
  if (!password) {
    console.log("password cannot be blank");
    res.status(400).send("Password cannot be blank");
    return;
  } else if (login_name.split(" ").join("").length < 4) {
      res.status(400).send("Login must be at least 4 characters");
      return;
  } else {
    User.findOne({ login_name }, function(err, user) {
      if (user) {
        res.status(400).send("Username is already taken.");
        return;
      }
      User.create(
        {
          login_name,
          password
        },
        function(_, newUser) {
          req.session.login_name = login_name;
          req.session.user_id = newUser._id;
          let curr_user = {
            _id: newUser._id,
            login_name
          };
          res.status(200).send(curr_user);
        }
      );
    });
  }
});



export default router