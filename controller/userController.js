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

module.exports = {
      createUser,
      getUserDetails,
      delUserDetails,
      updateUserDetails,
}