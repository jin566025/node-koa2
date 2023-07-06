class BaseModel {
  constructor({ errorCode, data, message, success }) {
    this.errorCode = errorCode;
    this.success = success;
    if (data) {
      this.data = data;
    }
    if (message) {
      this.message = message;
    }
  }
}

class SuccessModel extends BaseModel {
  constructor({ data = {} }) {
    super({
      errorCode: 0,
      data,
      success: true,
    });
  }
}

class ErrorModel extends BaseModel {
  constructor({ errorCode, message }) {
    super({
      errorCode,
      message,
      success: false,
    });
  }
}
module.exports = {
  SuccessModel,
  ErrorModel,
};
