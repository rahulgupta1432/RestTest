let multer = require("multer");
let fs = require("fs");
async function parseFile(req, res, Option = {}) {
      let size = (Option.size) ? Option.size : "1000*3";
      let ext = (Option.ext) ? Option.ext : "jpg|png";
      let field = (Option.field) ? Option.field : null;
      if (!field) {
            return { error: "field are required" }
      }

      let upload = multer({
            limit: size,
            fileFilter: function (req, file, cb) {
                  let test = ext.test(file.mimetype)
                  if (!test) {
                        return cb({ error: "this extension is not allowed" })
                  }
                  cb(null, true)
            }
      });
      if (typeof (field) == "string") {
            upload = upload.single(field)
      } else if (typeof (field) == "object") {
            upload = upload.fields(field)
      } else {
            return { error: "invalid type of field" }
      }

      return new Promise((res, rej) => {
            upload(req, res, (error) => {
                  if (error) {
                        rej(error)
                  }
                  res(true)
            });
      });
}

async function singleFileUpload(dest, buffer) {
      let file = await fs.writeFile(dest, buffer).catch((err) => {
            console.log(err)
            return { error: err }
      })
      if (!file || (file && file.error)) {
            return { error: file.error }
      }
      return { data: true }
}
module.exports = { parseFile, singleFileUpload }