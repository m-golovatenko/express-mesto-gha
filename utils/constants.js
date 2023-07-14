const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

const SUCCESS_CODE = 200;
const SUCCESS_CREATE_CODE = 201;
const WRONG_DATA_CODE = 400;
const NOT_FOUND_CODE = 404;
const SERVER_ERROR_CODE = 500;

module.exports = {
  SUCCESS_CODE, SUCCESS_CREATE_CODE, WRONG_DATA_CODE, NOT_FOUND_CODE, SERVER_ERROR_CODE,
};

module.exports = { PORT, DB_URL };
