const router = require('express').Router();
const Food = require('../../models/Food');

router.get('/', async (req, res, next) => {
    try {
        const allFoods = await Food.find();
        return res.status(200).json(allFoods);
    } catch (error) {
        
    }
})

module.exports = router;