const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

//
const Course = new Schema({
    name: { type: String },
    description: { type: String },
    image: { type: String },
    videoID: { type: String },
    createdTime: { type: Date, default: Date.now },
    updatedTime: { type: Date, default: Date.now },
    slug: { type: String, slug: 'name', unique: true },
});

mongoose.plugin(slug);
Course.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: true,
});

module.exports = mongoose.model('Course', Course);
