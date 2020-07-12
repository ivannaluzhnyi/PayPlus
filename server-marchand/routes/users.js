var express = require('express');
var router = express.Router();

/* GET users listing. */
const Router = require("express").Router;
const { User } = require("../models/user");
const router = Router();

/** Collection Routes  **/
// CGET
// or[username]=kmarques&or[password]=test&lastname=null
// and[0][or][A]=kmarques&and[0][or][B]=test&and[1][or][C]=kmarques&and[1][or][D]=test
router.get("/", (req, res) => {
  console.log(req.query);
  const {
    and,
    or,
    password,
    username,
    ...conditions
  } = req.query;
  if (or) {
    // [ [key, value], [username, kmarques], [password, test] ]
    // => { [Op.or]: [{username: kmarques, password: pass}, {password: test}] }
    conditions[Op.or] = Object.entries(or).map(([key, value]) => ({
      [key]: value,
    }));
  }

  if (password) {
    conditions.password = Array.isArray(password)
      ? { [Op.in]: password }
      : password;
  }

  if (username) {
    conditions.username = { [Op.iLike]: username };
  }

  User.findAll({
    where: conditions,
    paranoid: false,
  })
    .then((result) => res.json(result))
    .catch((error) => console.error(error) || res.sendStatus(500));
});

/** Item Routes  **/
router.get("/:id", (req, res) => {
  User.findByPk(req.params.id)
    .then((data) => (data ? res.json(data) : res.sendStatus(404)))
    .catch(() => res.sendStatus(500));
});

router.put("/:id", (req, res) => {
  User.update(req.body, {
    returning: true,
    where: { id: req.params.id },
  })
    .then(([nbUpdate, data]) =>
      nbUpdate === 1 ? res.json(data) : res.sendStatus(404)
    )
    .catch((err) => {
      if (err.name === "SequelizeValidationError") {
        res.status(400).json(prettifyErrors(Object.values(err.errors)));
      } else {
        res.sendStatus(500);
      }
    });
});

router.delete("/:id", (req, res) => {
  User.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((nbDelete) => (nbDelete ? res.sendStatus(204) : res.sendStatus(404)))
    .catch((err) => res.sendStatus(500));
});

const prettifyErrors = (errors) => {
  return errors.reduce((acc, item) => {
    acc[item.path] = [...(acc[item.path] || []), item.message];

    return acc;
  }, {});
};

module.exports = router;

module.exports = router;
