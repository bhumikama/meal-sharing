import Joi from "joi";
export const addReservationSchema = Joi.object({
  number_of_guests: Joi.number().integer().min(1).required(),
  meal_id: Joi.number().integer().required(),
  contact_name: Joi.string()
    .required()
    .pattern(/^[a-zA-Z\s]+$/),
  contact_email: Joi.string().optional().email().allow("").allow(null),
  contact_phonenumber: Joi.string().optional().allow(null).optional().allow(""),
});
export const addReviewSchema = Joi.object({
  title: Joi.string()
    .required()
    .pattern(/^[a-zA-Z\s]+$/),
  description: Joi.string().optional().allow(null).allow(""),
  meal_id: Joi.number().integer().required(),
  stars: Joi.number().integer().min(1).max(5).required(),
});

export const validateSchema = (schema) => {
  return (request, response, next) => {
    const { error, value } = schema.validate(request.body, {
      abortEarly: false,
    });
    if (error) {
      console.log("Error message : ", error);
      return response.status(400).json({
        message: "Validation failed",
        errors: error.details.map((detail) => ({
          fields: detail.path.join("."),
          error: detail.message,
        })),
      });
    }
    if (!request.value) {
      request.value = {};
    }
    request.value.body = value;
    next();
  };
};
