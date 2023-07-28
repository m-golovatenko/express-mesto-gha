const SUCCESS_CODE = 200;
const SUCCESS_CREATE_CODE = 201;

const regExp = /^(https?:\/\/)?(www\.)?([\da-z]+)?\.([a-z.])([/\w .-_~:/?#[\]@!$&'()*+,;=]*)*\/?$/i;

module.exports = { SUCCESS_CODE, SUCCESS_CREATE_CODE, regExp };
