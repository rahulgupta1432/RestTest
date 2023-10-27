const { singleFileUpload } = require("../helper/file_uploading");
let { User } = require("../schema/userSchema");
let joi = require("joi")

let filepath = "C:/myproject/RestFulCrud/upload/";
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
async function getAll(id) {
      let valid = await User.findAll({ where: { id: id } }).catch((error) => {
            return { error }
      })
      if (!valid || (valid && valid.error)) {
            return { error: valid.error }
      }
      return { data: valid }
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
// joi image
async function imageUplaod(param) {
      let schema = joi.object({
            id: joi.number().required()
      });

      let valid = await schema.validateAsync(param, { abortEarly: false }).catch((err) => {
            return { error: err }
      });

      if (!valid || (valid && valid.error)) {
            let msg = [];
            for (let i of valid.error.details) {
                  msg.push(i.message)
            }
            return { error: msg }
      }
      return { data: valid.data }
}
// image
async function productImage(param, file) {
      let check = await imageUplaod(param).catch((err) => {
            return { error: err }
      });
      if (!check || (check && check.error)) {
            let error = (check && check.error) ? check.error : "incorrect data";
            return { error, status: 400 }
      }


      //apply for loop on files to push bulkimage.

      let fileName = Date.now() + "-" + Math.round(Math.random() * 1E9);
      let ext = file.mimetype.split('/').pop();
      console.log("hii")
      console.log(fileName, ext, filepath)
      let upload = await singleFileUpload(filepath + fileName + "." + ext, file.buffer).catch((err) => {
            console.log(err)
            return { error: err }
      });
      if (!upload || (upload && upload.error)) {
            return { err: "err" }
      }
      //add images in db.

      let image = file + "." + ext
      let uploadImage = await User.update({ image: image }, { where: { id: param.id } }).catch((err) => {
            return { error: err }
      });
      if (!uploadImage || (uploadImage && uploadImage.error)) {
            let error = (uploadImage && uploadImage.error) ? uploadImage.error : "image not upload";
            return { error, status: 500 }
      }
      //return success response.
      return { data: "image uploaded successfully" }
}

module.exports = {
      registerUser,
      getUser,
      getAll,
      delUser,
      updateUser,
      productImage
}