module.exports = class customError extends Error {
  constructor(message) {
    super(message);
    let errorDiscription = {};
    errorDiscription.message = message;
    errorDiscription.code = "3";
    this.errorDiscription = errorDiscription;
  }
};
