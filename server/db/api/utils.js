const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../../secrets')

const authRequired = (req, res, next) => {
  const token = req.get('Authorization').split(' ')[1];
  console.log(token);

  try {
    jwt.verify(token, JWT_SECRET);
  } catch (error) {
    res.status(401).send({
      loggedIn: false,
      message: 'Unauthorized',
    })
    throw new Error('Token invalid');
  }
  next()
}

module.exports = { authRequired }