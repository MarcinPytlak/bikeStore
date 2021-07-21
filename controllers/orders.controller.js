const Order = require('../models/Order.models');

exports.postOrder = async(req,res) => {
    try {
        const {_id, name, surname, email, phone, address, address2, city, postalCode, orderData, finalAmount} = req.body;
        const newOrder = new Order ({_id: _id, name: name,surname: surname, email:email,phone:phone, address: address, address2:address2, city:city, postalCode:postalCode, orderData: orderData, finalAmount: finalAmount});
        await newOrder.save();
        res.json({message : 'New order arrived!'});
    } catch(err){
        res.status(500).json(err);
    }
};

exports.getOrder = async(req,res) => {
    try{
        res.json(await Order.find());
    } catch(err){
        res.status(500).json(err);
    }
};