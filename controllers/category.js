const Category = require('../models/category');
const Position = require('../models/position');
const errorHandler = require('../utils/errorHandler');

module.exports.getAllCategories =  async (req, res) => {
    try {
        const categories = await Category.find({user: req.user.id});
        res.status(200).json(categories);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        res.status(200).json(category);

    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.createCategory = async (req, res) => {
    try {
        console.log(req.file);
        const category = await new Category({
            name: req.body.name,
            user: req.user.id,
            imageSrc: req.file ? req.file.path : ''
        }).save();

        res.status(200).json(category);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.updateCategory = async (req, res) => {
    try {
        const uploaded = {
            name: req.body.name
        };

        if (req.file) {
            uploaded.imageSrc = req.file.path;
        }

        const category = await Category.findOneAndUpdate(
            {_id: req.params.id},
            {$set: uploaded},
            {new: true}
        );

        res.status(200).json(category);

    } catch (e) {
        errotHandler(res, e);
    }
};

module.exports.deleteCategory = async (req, res) => {
    try {
        await Category.deleteOne({_id: req.params.id});
        await Position.deleteMany({category: req.params.id});
        res.status(200).json({
            message: "Категория удалена"
        });
    } catch (e) {
        errotHandler(res, e);
    }
};