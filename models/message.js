const mongoose = require('mongoose');
const { DateTime } = require('luxon')

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    name: { type: String, required: true, maxLength: 50},
    msg: { type: String, required: true, maxLength: 300},
});

MessageSchema.virtual('date').get(function() {
    return this.creation_date ? DateTime.fromJSDate(this.creation_date).toLocaleString(DateTime.DATE_MED) : '';
});

module.exports = mongoose.model('message', MessageSchema)