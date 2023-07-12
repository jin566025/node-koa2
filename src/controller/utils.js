const { SuccessModel, ErrorModel } = require("../result/ResModel");
const { uploadFileSizeFailInfo } = require("../result/ErrorModel");
const fse = require("fs-extra");
const path = require('path')
const MIX_SIZE = 1024 * 1024 * 1024 * 10;
const DIST_FOLDER_PATH = path.join(__dirname, "..", "..", "uploadFiles");

fse.pathExists(DIST_FOLDER_PATH).then(exist=>{
  if(!exist){
    fse.ensureDir(DIST_FOLDER_PATH)
  }
})
const saveFile = async ({ name, type, size, filePath }) => {
  if (size > MIX_SIZE) {
    await fse.remove(filePath);
    return new ErrorModel(uploadFileSizeFailInfo);
  }
  const fileName = Date.now() + "." + name;
  const distFilePath = path.join(DIST_FOLDER_PATH, fileName);
  await fse.move(filePath, distFilePath);
  return new SuccessModel({
    data: {
      url: "/" + fileName,
    },
  });
};

module.exports = {
  saveFile,
};
