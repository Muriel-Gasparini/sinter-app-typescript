import joi from 'joi'

export const addadminSchema = {
  data: joi.object({
    name: joi.string().min(5).max(20).required(),
    password: joi.string().min(8).max(50).required(),
    key: joi.string().required()
  })
}
