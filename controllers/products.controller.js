const Product = require('../models/Product.model');

exports.getAllProducts = async (req,res) => {
  try {
    res.json(await Product.find());
  } catch(err){
    res.status(500).json(err);
  }
};

exports.getProductById = async (req,res) => {
  try{
    const product = await Product.findById(req.params.id);
    if(!product) res.status(404).json({product: 'Not Found!!'});
    else res.json(product);
  }catch(err){
    res.status(500).json(err);
  }
};