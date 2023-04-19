const { HttpError } = require("../helpers");

const validateBody = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(
        HttpError(
          400,
          `Missing required  ${error.details[0].context.key} field`
        )
      );
    }
    next();
  };
  return func;
};

//  const validateForUpdate = (schema)=> {const func = (req, res, next) => {
//    const { error } = schema.validate(req.body);
//    if (error) {
//      next(
//        HttpError(400, `missing favorite field`)
//      );
//    }
//    next();
//  };
//   return func;
// }
module.exports = validateBody;
