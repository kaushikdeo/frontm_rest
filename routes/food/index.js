const router = require('express').Router();
const mongoose = require('mongoose');
const Food = require('../../models/Food');
const validator = require('validator');

router.get('/', async (req, res, next) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 5;
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const sortBy = req.query.sortBy ? req.query.sortBy.toString() : 'itemName' ;
        const orderBy = Number(req.query.orderBy) === 1 ? 1 : -1;
        const filterString = req.query.filter ? req.query.filter.toString() : '';
        const results = {error: false};
        const sortQuery = {
            [sortBy]: orderBy,
        };
        const filterQuery = {
            itemName: new RegExp(filterString, 'i')
        }
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
        const allFoods = await Food.find(filterQuery).limit(limit).skip(startIndex).sort(sortQuery);
        if (allFoods) results.foods = allFoods;
        const totalTime = process.hrtime(req.queryStartTime);
        results.totalExecutionTime = `${totalTime[0]} s ${totalTime[1]/1000000} ms`;
        return res.status(200).json(results);
    } catch (error) {
        console.log('Some Server Error Occured', error);
        return res.status(500).json({error: true, message: "Error occured while fetching Entries"});
    }
})

router.post('/', async (req, res, next) => {
    if (!req.body) {
        return res.status(400).json({messgae: 'Invalid input fields'});
    }
    const itemName = validator.escape(req.body.itemName);
    const foodType = validator.escape(req.body.foodType);
    const cusineType = validator.escape(req.body.cusineType);
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const food = new Food({
            itemName,
            cost: req.body.cost,
            foodType,
            cusineType,
            inventory: req.body.inventory,
        }, { _id: true, session });
        const savedFood = await food.save();
        if (savedFood) {
            await session.commitTransaction();
            session.endSession();
            const totalTime = process.hrtime(req.queryStartTime);
            return res.status(200).json({error: false, savedFood, totalExecutionTime: `${totalTime[0]} s ${totalTime[1]/1000000} ms`});
        }
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        console.log('error while saving food item', err);
        return res.status(500).json({error: true, message: 'Error occured while saving new food item'});
    }
})

module.exports = router;