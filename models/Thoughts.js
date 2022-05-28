const { Schema, model, Types} = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ThoughtsSchema = new Schema (
    {
        thoughtsText: {
            type: String,
            required: true,
            minlength: 1, 
            maxlength: 280,
        },
        username: {
            type: String,
            required: true,
            ref: 'User',
        },
        reaction: [ReactionsSchema],
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        },
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
)

const ReactionsSchema = new Schema (
    {
        reactionsID: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionsBody: {
            type: String,
            required: true,
            trim: true,
            minlength: 1,
            maxlength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal),
        },
    },
    {
        toJSON: {
            getters: true,
        },
    },
);

const Thoughts = model('Thoughts', ThoughtsSchema);

module.exports = Thoughts;