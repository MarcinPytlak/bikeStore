const Category = require('../models/Category.models');

exports.getAllCategories = async(req,res) => {
    try {
        res.json(await Category.find());
    } catch(err){
        res.status(500).json(err);
    }
};