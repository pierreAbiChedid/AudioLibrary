const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const tracksValidator = {
  addTrackValidator: {
    body: Joi.object({
      name: Joi.string().required(),
      singer: Joi.string().required(),
      albumId: Joi.objectId(),
      categoryId: Joi.objectId(),
    }),
  },

  getTrackValidator: {
    params: Joi.object({
      albumId: Joi.objectId().required(),
    }),

    query: Joi.object({
      categoryId: Joi.objectId(),
      searchValue: Joi.string(),
      pageNumber: Joi.number(),
    })
  },

  deleteTrackValidator: {
    params: Joi.object({
      songId: Joi.objectId().required(),
    }),
  },

  editTrackValidator: {
    params: Joi.object({
      songId: Joi.objectId().required(),
    }),

    body: Joi.object({
      name: Joi.string().required(),
      singer: Joi.string().required(),
      albumId: Joi.objectId(),
      categoryId: Joi.objectId(),
    }),
  },
};

module.exports = tracksValidator;
