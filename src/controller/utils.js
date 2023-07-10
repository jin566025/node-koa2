const { SuccessModel, ErrorModel } = require("../result/ResModel");
const { uploadFileSizeFailInfo } = require("../result/ErrorModel");
const fse = require("fs-extra");
const path = require("path");
const MIX_SIZE = 1024 * 1024 * 1024;
const DIST_FOLDER_PATH = path.join(__dirname, "..", "..", "uploadFiles");
const saveFile = async ({ name, type, size, path }) => {
  if (size > MIX_SIZE) {
    await fse.remove(path);
    return new ErrorModel(uploadFileSizeFailInfo);
  }
  const fileName = Date.now() + "." + name;
  const distFilePath = path.join(DIST_FOLDER_PATH, fileName);
  await fse.move(filePath, distFilePath);
  
};

module.exports = {
  saveFile,
};
