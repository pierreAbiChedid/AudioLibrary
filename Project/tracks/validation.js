const Joi = require('joi');
Joi.objectID = require('joi-objectid')(Joi);

const tracksValidator = {

    addTrackValidator: {
        options: {
            allowUnknownBody: false,
            status: 400
        },
        body: {
            name: Joi.string().min(2).required(),
            singer: Joi.string().required()
        }
    },
    editTrackValidator: {
        options: {
            allowUnknownBody: false,
            status: 400
        },
        body: {
            name: Joi.string().min(2).required(),
            singer: Joi.string().required()
        }
    },
    deleteTrackValidator: {
        options: {
            allowUnknownBody: false,
            status: 400
        },
        body: {
            name: Joi.string().min(2).required(),
            singer: Joi.string().required()
        }
    }
}

module.exports = tracksValidator;
