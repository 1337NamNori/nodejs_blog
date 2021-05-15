module.exports = {
    multipleMongooseToObject: (mongooseArray) =>
        mongooseArray.map((mongoose) => mongoose.toObject()),
    mongooseToObject: (mongoose) => (mongoose ? mongoose.toObject() : mongoose),
};
