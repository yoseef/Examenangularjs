var router = require('express').Router();
var Producte = require("../../models/producte")
  //URI api/llibres
router.get("/", function(req, res, next) {
  console.log('estic al get');
  Producte.find(function(err, productee) {
    console.log(productee);
    if (err) {
      return next(err);
    }
    res.status(201).json(productee);
  });
});
router.post("/", function(req, res, next) {
  console.log(req.body);
  var productee = new Producte(req.body);
  productee.save(function(err) {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.status(201).send("El producte s'ha creat!!");
  });

});
router.put("/", function(req, res, next) {
  console.log("this is put " + req.body);
  Producte.findByIdAndUpdate(req.body._id, req.body, function(err) {
    if (err) {
      return next(err);
    } else {
      res.status(201).json("put correcte" + req.body);
    }
  });
});

//URL api/llibres/:id
router.get("/:id", function(req, res, next) {
  Producte.find({
    "codi": req.params.id
  }, function(err, productee) {
    if (err) {
      return next(err);
    }
    res.status(201).json(productee);
    producteecanvia = productee
  });
});

router.post("/:id", function(req, res, next) {
  return res.status(400).send("Error you cant  Post!!");
});

router.put("/:id", function(req, res, next) {
  console.log("put " + req.params.id)
  Producte.update({
    "codi": req.params.id
  }, {
    "codi": req.body.isbn
  }, function(err) {
    if (err) {
      return next(err);
    }
    return res.status(201).send("nou codi " + req.body.codi);
  });
});

router.delete("/:id", function(req, res, next) {
  console.log(req.params);
  Producte.remove({
    codi: req.params.id
  }, function(err) {
    if (err) {
      return next(err);
    } else {
      return res.status(201).send(req.params.id + " Deleted!!");
    }
  });
});

module.exports = router
