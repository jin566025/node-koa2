const { AtRelation } = require("../model/index");
const createAtRelation = async ({ blogId, userId }) => {
  const result = await AtRelation.create({
    blogId,
    userId,
  });
  return result.dataValues;
};
const getAtRelationCount = async ({ userId }) => {
  const result = await AtRelation.findAndCountAll({
    where: {
      userId,
      isRead: false,
    },
  });
  return result;
};
const updateAtRelation = async ({ newIsRead, userId, isRead }) => {
  const updateData = {};
  if (newIsRead) {
    updateData.isRead = newIsRead;
  }
  const whereData = {};
  if (userId) {
    whereData.userId = userId;
  }
  if (isRead) {
    whereData.isRead = isRead;
  }
  const result = await AtRelation.update(updateData, {
    where: whereData,
  });
  return result[0] > 0;
};
module.exports = {
  createAtRelation,
  getAtRelationCount,
  updateAtRelation,
};
