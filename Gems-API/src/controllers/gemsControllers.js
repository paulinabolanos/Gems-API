const GemModel = require('../models/gem');
const Random = require('meteor-random');
const cloudinary = require('cloudinary').v2

cloudinary.config({
    cloud_name: 'dek624r7v',
    api_key: "778191471929466",
    api_secret: "eP1e-BWsppUZDjq2odyp1KxI4wc"
})
const fs = require('fs')

module.exports = {
    createGem,
    getAllGems,
    getGem,
    getGemPost,
    updateGem,
    deleteGem,
    addReview,
    addImage
}

async function createGem(req, res) {
    console.log('user entry', req.body);
    const {name,description,long_description,price,size,specs,reviews} = req.body;
    const newGem = new GemModel({name,description,long_description,price,size,specs,reviews});
    let id = Random.id();
    newGem._id = id;
    console.log(newGem);
    await newGem.save();
    res.status(201).send({ _id: id,'success_msg': 'New Gem Created Successfully'});
}

async function getAllGems(req, res) {
    let gems = await GemModel.find({});
    let total = gems.length;
    res.status(200).send({gems: gems,total: total})
}

async function getGem(req, res) {
    let gem = await GemModel.findOne({_id: req.params._id});
    res.status(200).send({gem: gem});
}

async function getGemPost(req, res) {
    let gem = await GemModel.findOne({_id: req.body._id});
    res.status(200).send({gem: gem});
}

async function updateGem(req, res) {
    const _id = req.body;
    let update = req.body.gem
    await GemModel.update({ _id: _id}, 
        {$set: update})
    res.status(202).send({'success_msg': 'Gem Updated Succesfully'});
}

async function deleteGem(req, res) {
    await GemModel.findByIdAndDelete({_id: req.params._id})
    res.status(202).send({'success_msg': 'Gem Removed Succesfully'})
}

async function addReview(req, res) {
    let _id = req.body._id;
    let update = req.body.review;
    await GemModel.findByIdAndUpdate(_id, {
        "$push": {
            "reviews": update
        },
    }, {
        "new": false,
        "upsert": false
    })
    res.status(202).send({'success_msg': 'Review inserted successfully'})
}

async function addImage(req, res) {
    let _id = req.body._id;
    let file = req.files.file;
    let key = new Date().toISOString();

    cloudinary.uploader.upload(file.path, {
        public_id: `gems/${key}`,
        tag: 'gems'
    }, function (err, img) {
        if (err) return res.send(err)
        console.log("File uploaded to Cloudinary")
        fs.unlinkSync(file.path)
        updateImages(_id, img.url, res)
        res.json(img)
    })

    
}

async function updateImages(_id, url, res) {
    let conceptId = _id;
    let update = url;
    let conceptUpdated = await GemModel.findByIdAndUpdate(conceptId, {
        "$push": {
            "images": update
        },
    }, {
        "new": false,
        "upsert": false
    })
    res.status(200).send({
        message: conceptUpdated
    })

}