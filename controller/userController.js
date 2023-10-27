let userModel = require("../model/userModel")

async function createUser(req, res) {
      let modelData = await userModel.registerUser(req.body).catch((error) => {
            return { error }
      })
      if (!modelData || (modelData && modelData.error)) {
            let error = (modelData && modelData.error) ? modelData.error : "Internal Server Issue in Register";
            return res.send({ error })
      }
      return res.send({ data: modelData.data })
}

async function getUserDetails(req, res) {
      let readData = await userModel.getUser(req.params.id).catch((error) => {
            return { error }
      })
      if (!readData || (readData && readData.error)) {
            let error = (readData && readData.error) ? readData.error : "Internal View Issue";
            return res.send({ error })
      }
      return res.send({ data: readData.data })
}
async function getAllDetails(req, res) {
      let getData = await userModel.getAll(req.body).catch((error) => {
            return { error }
      })
      if (!getData || (getData && getData.error)) {
            let error = (getData && getData.error) ? getData.error : "Internal Server Get All Issue";
            return res.send({ error })
      }
      return res.send({ data: getData.data })
}
async function updateUserDetails(req, res) {
      let upData = await userModel.updateUser(req.params.id, req.body).catch((error) => {
            return { error }
      })
      console.log(upData);
      if (!upData || (upData && upData.error)) {
            let error = (upData && upData.error) ? upData.error : "Internal Server Issue in Updated Function";
            return res.send({ error });
      }
      return res.send({ data: upData.data })
}
async function delUserDetails(req, res) {
      let delData = await userModel.delUser(req.params.id).catch((error) => {
            return { error }
      })
      if (!delData || (delData && delData.error)) {
            let error = (delData && delData.error) ? delData.error : "Internal View Issue";
            return res.send({ error })
      }
      return res.send({ data: delData.data })
}
let image = require("../helper/file_uploading");
async function addImage(req, res) {
      let file = await image.parseFile(req, res, {
            size: 4000 * 1000,
            ext: /jpg|png|jpeg|pdf/,
            field: [{ name: 'image', maxCount: 1 }]
      }).catch((err) => {
            return { error: err }
      });
      if (!file || (file && file.error)) {
            let error = (file && file.error) ? file.error : "image not upload";
            return res.status(500).send({ error })
      }
      let fileName = req.files.image[0]
      let data = await userModel.productImage(req.body, fileName, req.userdata).catch((err) => {
            return { error: err }
      });

      if (!data || (data && data.error)) {

            let error = (data && data.error) ? data.error : "image not upload";
            return res.status(500).send({ error })
      }
      return res.status(200).send({ data: data.data })
}

module.exports = {
      createUser,
      getUserDetails,
      getAllDetails,
      delUserDetails,
      updateUserDetails,
      addImage
}