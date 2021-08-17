const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const tracksValidator = {
  addTrackValidator: {
    
    body: {
      name: Joi.string().required(),
      singer: Joi.string().required(),
      albumId: Joi.objectId(),
      categoryId: Joi.objectId(),
    },
  },
  editTrackValidator: {
    
    body: {
      name: Joi.string().min(2).required(),
      singer: Joi.string().required(),
      albumId: Joi.objectId(),
      categoryId: Joi.objectId(),
    },
  },
};

module.exports = tracksValidator;
