var express = require('express');
const passport = require('passport');
var router = express.Router();
const userModel = require("./users");
const productModel = require("./product");
const localStrategy = require("passport-local");
const multer = require("multer");


passport.use(new localStrategy(userModel.authenticate()));


function fileFilter(req, file, cb) {
  if (file.mimetype === "image/jpg" || file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true)
  } else {
    cb(new Error("Second Time Try Karna"))
  }
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images/uploads')
  },
  filename: function (req, file, cb) {
    const fn = Date.now() + Math.floor(Math.random()) * 10000000 + file.originalname;
    cb(null, fn)
  }
})
const upload = multer({ storage: storage, fileFilter })

router.post("/photo", upload.single("image"), async function (req, res) {
  const data = await productModel.find();
  data[0].productPic = `./images/uploads/${req.file.filename}`
  await data[0].save()
  res.redirect("/product");
})

router.get('/', function (req, res, next) {
  res.render('index');
});


router.get('/login', function (req, res, next) {
  res.render('login');
});


router.post('/login', passport.authenticate("local", {
  successRedirect: "/profile",
  failureRedirect: "/login"
}), function (req, res) { })


function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  } else {
    res.redirect("/login")
  }
}


router.get('/logout', function (req, res, next) {
  req.logout(function (err) {
    if (err) throw err;
    res.redirect("/")
  });
});


router.get('/register', function (req, res, next) {
  res.render('register');
});


router.post('/register', function (req, res, next) {
  const userData = new userModel({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    mobile: req.body.mobile
  })
  userModel.register(userData, req.body.password)
    .then(function () {
      passport.authenticate("local")(req, res, function () {
        res.redirect("/profile")
      })
    }).catch(function (e) {
      res.redirect("/login")
    })
});


router.get('/profile', isLoggedIn, async function (req, res, next) {
  const User = await userModel.findOne({ username: req.session.passport.user })
  res.render("profile", { User })
});

router.post("/cards", function (req, res) {
  productModel.create({
    productname: req.body.productname,
    product_id: req.body.product_id,
    price: req.body.price,
    productPic: req.body.productPic,
    store_id: req.body.store_id
  }).then(function (data) {
    res.redirect("/product")
  }).catch(function (e) {
    res.send(e)
  })
})


router.get("/cards", function (req, res) {
  productModel.find()
    .then(function (data) {
      res.render("cards", { data })
    })
})

router.get('/cards', function (req, res, next) {
  res.render("cards");
});

router.get("/product", function (req, res) {
  productModel.find()
    .then(function (data) {
      res.render("product", { data })
    })
})


router.get('/delete/:id', function (req, res, next) {
  productModel.findOneAndDelete({ _id: req.params.id })
    .then(function (data) {
      res.redirect(req.headers.referer)
    })
});


router.get("/product/:product_id", async function (req, res) {
  productModel.findOne({ product_id: req.params.product_id })
    .then(function (data) {
      res.render("addCard", { data })
    }).catch(function (e) {
      res.redirect("/product")
    })
})




router.get("/check/:username", async function (req, res) {
  let user = await userModel.findOne({ username: req.params.username })
  res.json({ user })
})

module.exports = router;
