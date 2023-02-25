import Joi from "joi";

export const UserValidation = Joi.object({
    name: Joi.string().required(),
    location: Joi.string().required(),
    age: Joi.number().required()
});

export const UserIdValidation = Joi.string().alphanum().required();
