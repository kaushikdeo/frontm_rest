const Order = require('../../models/Order');
const Food = require('../../models/Food');
const mongoose = require('mongoose');
const router = require('express').Router();

router.get('/', (req, res, next) => {
    res.status(200).json({msg: 'orders api endpoint'});
})

router.post('/', async (req, res, next) => {
    if (!req.body) {
        return res.status(400).json({messgae: 'Invalid input fields'});
    }
    const session = await mongoose.startSession();
    try {
        await session.withTransaction(async () => {
            const isValid = await Promise.all((req.body.map(async (foodItem) => {
                const isFoodQuantity = await Food.findOne({
                    _id: foodItem.foodItem,
                    inventory: {$gte: foodItem.itemCount}
                }).session(session);
                console.log('isFoodQuantity', isFoodQuantity);
                if (!isFoodQuantity) throw new Error('one of the food item out of stock');
                await Food.findOneAndUpdate({
                    _id: foodItem.foodItem,
                    inventory: {$gte: foodItem.itemCount}
                }, {
                    $inc: {
                        inventory: -foodItem.itemCount,
                    }
                })
            })))
            if (isValid) {
                const order = new Order({
                    orderItems: req.body,
                }, {_id: true, session});
                const savedOrder = await order.save();
                await session.commitTransaction();
                const totalTime = process.hrtime(req.queryStartTime);
                return res.status(200).json({savedOrder, totalExecutionTime: `${totalTime[0]} s ${totalTime[1]/1000000} ms`});
            }
        })
    } catch (error) {
        console.log('I am caught', error);
        await session.abortTransaction();
        return res.status(500).json({message: 'Error occured while saving new food item'});
    } finally {
        session.endSession();
    }
})

module.exports = router;