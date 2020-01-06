import Joi from "joi-browser";

const signUpSchema = {
    firstName: Joi.string()
        .min(3)
        .required()
        .label("Firstname"),
    lastName: Joi.string()
        .min(3)
        .required()
        .label("Lastname"),
    email: Joi.string()
        .email()
        .required()
        .label("Email"),
    password: Joi.string()
        .regex(/(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{7,50})$/)
        .error(() => {
            return {
                message: "Password must be at least 7 characters long with at least a digit"
            };
        }),
    address: Joi.string()
        .min(10)
        .required()
        .label("Address"),
    gender: Joi.string().required(),
    jobRole: Joi.string().required(),
    department: Joi.string().required()
}

const loginSchema = {
    email: Joi.string()
        .email()
        .required()
        .label("Email"),
    password: Joi.string()
        .min(7)
        .required()
        .label("Password")
}

const gifSchema = {
    title: Joi.string()
        .min(10)
        .required()
        .label(" Gif Title"),
    image: Joi.any()
        .required()
        .label("Image/Gif")
}

const articleSchema = {
    title: Joi.string()
        .min(10)
        .required()
        .label("Title"),
    article: Joi.string()
        .min(20)
        .required()
        .label("Article"),
    category: Joi.string()
        .min(5)
        .required()
        .label("Tag"),
    id: Joi.any()
}

const commentSchema = {
    comment: Joi.string()
        .min(5)
        .required()
        .label("Comment")
}

export function getSignUpSchema() {
    return signUpSchema
}
export function getLoginSchema() {
    return loginSchema
}

export function getGifSchema() {
    return gifSchema
}

export function getArticleSchema() {
    return articleSchema
}

export function getCommentSchema() {
    return commentSchema
}