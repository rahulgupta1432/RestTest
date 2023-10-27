let { User } = require("../schema/userSchema");
let joi = require("joi");
async function registerValidation(data) {
      let schema = joi.object({
            name: joi.string().min(5).max(100).required(),
            image: joi.string().required(),
            summary: joi.string().required()
      })
      let valid = await schema.validateAsync(data).catch((error) => {
            return { error }
      })
      if (!valid || (valid && valid.error)) {
            let msg = []
            for (let i of valid.error.details) {
                  msg.push(i.message)
            }
            return { error: msg }
      }
      return { data: valid }
}

async function registerUser(params) {
      let valid = await registerValidation(params).catch((error) => {
            return { error }
      })
      if (!valid || (valid && valid.error)) {
            return { error: valid.error }
      }
      let userData = {
            username: params.name,
            image: params.image,
            summary: params.summary
      }
      let data = await User.create(userData).catch((error) => {
            return { error }
      })
      if (!data || (data && data.error)) {
            return { error: "Internal" }
      }
      return { data: data }
}
async function getUser(id) {
      let valid = await User.findOne({ where: { id: id } }).catch((error) => {
            return { error }
      });
      if (!valid || (valid && valid.error)) {
            return { error: `Use is not Exist in DB and nor be available id is ${id}` }
      }
      return { data: valid }
}

async function updateValidation(data) {
      let schema = joi.object({
            name: joi.string(),
            image: joi.string(),
            summary: joi.string()
      })
      let valid = await schema.validateAsync(data).catch((error) => {
            return { error }
      })
      if (!valid || (valid && valid.error)) {
            let msg = [];
            for (let i of valid.error.details) {
                  msg.push(i.message)
            }
            return { error: msg }
      }
      return { data: valid }
}
async function updateUser(id, params) {
      let valid = await updateValidation(params).catch((error) => {
            return { error }
      })
      if (!valid || (valid && valid.error)) {
            return { error: valid.error }
      }
      let findUser = await User.findOne({ where: { id: id } }).catch((error) => {
            return { error }
      })
      if (!findUser || (findUser && findUser.error)) {
            return { error: `User id ${id} is not Found/Exist` }
      }
      let userData = {
            username: params.name,
            image: params.image,
            summary: params.summary
      }
      let updateData = await User.update(userData, { where: { id: id } }).catch((error) => {
            return { error }
      })
      if (!updateData || (updateData && updateData.error)) {
            return { error: updateData.error + "Internal Issue" }
      }
      return { data: `Updated Data Id of ${id}` }
}

async function delUser(id) {
      let valid = await User.destroy({ where: { id: id } }).catch((error) => {
            return { error }
      })
      if (!valid || (valid && valid.error)) {
            return { error: `User id ${id} is not Found/Exist` }
      }
      return { data: `Id ${id} is Deleted Successfully` }
}

module.exports = {
      registerUser,
      getUser,
      delUser,
      updateUser,
}