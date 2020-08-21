const router = require('express').Router();
const Food = require('../../models/Food');

router.get('/', async (req, res, next) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 5;
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const results = {error: false};
        const foodsLength = await Food.countDocuments().exec();
        if (((page * limit) > foodsLength) && (page * limit) - foodsLength > limit) {
            return res.status(400).json({error: true, message: 'Invalid page'})
        }
        if (endIndex < foodsLength) {
            results.next = {
                page: page+1,
                limit,
            }
        }
        if (startIndex > 0) {
            results.previous = {
                page: page-1,
                limit,
            }
        }
        const allFoods = await Food.find().limit(limit).skip(startIndex);
        if (allFoods) results.foods = allFoods;
        return res.status(200).json(results);
    } catch (error) {
        console.log('Some Error Occured', error);
        return res.status(500).json({error: true, message: "Error occured while counting Entries"});
    }
})

module.exports = router;