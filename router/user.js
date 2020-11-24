const express = require("express");
const router = express.Router();
const requireLogin = require("../middlewares/requireLogin");

const { getUser } = require("../controllers/user.controller");

/**
 * route : GET /api/user/user/:id
 * access : Private
 * desc: Get a user with id
 */
router.get("/user/:id", requireLogin, getUser);

// router.put("/follow", requireLogin, (req, res) => {
//   User.findByIdAndUpdate(
//     req.body.followId,
//     {
//       $push: { followers: req.user._id },
//     },
//     {
//       new: true,
//     },
//     (err, result) => {
//       if (err) {
//         return res.status(422).json({ error: err });
//       }
//       User.findByIdAndUpdate(
//         req.user._id,
//         {
//           $push: { following: req.body.followId },
//         },
//         { new: true }
//       )
//         .select("-password")
//         .then((result) => {
//           res.json(result);
//         })
//         .catch((err) => {
//           return res.status(422).json({ error: err });
//         });
//     }
//   );
// });

// router.put("/unfollow", requireLogin, (req, res) => {
//   User.findByIdAndUpdate(
//     req.body.unfollowId,
//     {
//       $pull: { followers: req.user._id },
//     },
//     {
//       new: true,
//     },
//     (err, result) => {
//       if (err) {
//         return res.status(422).json({ error: err });
//       }
//       User.findByIdAndUpdate(
//         req.user._id,
//         {
//           $pull: { following: req.body.unfollowId },
//         },
//         { new: true }
//       )
//         .select("-password")
//         .then((result) => {
//           res.json(result);
//         })
//         .catch((err) => {
//           return res.status(422).json({ error: err });
//         });
//     }
//   );
// });

// router.put("/updatepic", requireLogin, (req, res) => {
//   User.findByIdAndUpdate(
//     req.user._id,
//     { $set: { pic: req.body.pic } },
//     { new: true },
//     (err, result) => {
//       if (err) {
//         return res.status(422).json({ error: "pic canot post" });
//       }
//       res.json(result);
//     }
//   );
// });

// router.post("/search-users", (req, res) => {
//   let userPattern = new RegExp("^" + req.body.query);
//   User.find({ email: { $regex: userPattern } })
//     .select("_id email")
//     .then((user) => {
//       res.json({ user });
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

module.exports = router;
