const router = require('express').Router();

router.get('/', (req, res, next) => {
    res.status(200).json({message: 'this is the food api endpoint'});
})

module.exports = router;