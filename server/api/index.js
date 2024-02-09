const express = require('express');
const router = express.Router();

//GET /api/health
router.get('/health', (req, res, next) => {
    res.send('OK');
});

//ROUTER: /api/exercises
router.use('/exercises', require('./exercises'));
router.use('/users', require('./users'));
router.use('/recipes', require('./recipes'));
router.use('/calendars', require('./calendars'));
router.use('/selfCare', require('./selfCare'));
router.use('/favoriteRecipes', require('./favoriteRecipes'));
router.use('/favoriteExercises', require('./favoriteExercises'));
router.use('/favoriteSelfCare', require('./favoriteSelfCare'));


module.exports = router;