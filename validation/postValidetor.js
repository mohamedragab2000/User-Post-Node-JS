const Joi = require('joi');

const postCreateSchema = Joi.object({
    title: Joi.string().trim().required(),
    content: Joi.string().trim().allow(''),
    author: Joi.string().required(), 
    tags: Joi.array().items(Joi.string().trim())
});

const postCreateValidetor =( async(req,res,next)=>{
    const { error } = postCreateSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
})
const postUpdateSchema = Joi.object({
    title: Joi.string().trim().required(),
    content: Joi.string().trim().allow(''),
    tags: Joi.array().items(Joi.string().trim())
});

const postUpdateValidetor = (async(req,res,next)=>{
    const { error } = postUpdateSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
})

module.exports = { postCreateValidetor , postUpdateValidetor };
