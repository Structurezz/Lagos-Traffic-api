import {BadRequestError, ConflictError, InternalServerError, NotFoundError, UnauthorizedError, ValidationError} from '../../lib/utils/error-definition.js' 

const ErrorMiddleware = (err, req, res, next) => {
    if(err instanceof ValidationError){
        res.status(err.statuscode).json({
            success: false,
            message: err.message,
            errors: err.errors
        })
    }else if (
      err instanceof NotFoundError ||
      err instanceof ConflictError ||
      err instanceof BadRequestError ||
      err instanceof InternalServerError ||
      err instanceof UnauthorizedError
    ) {
      res.status(err.statuscode).json({
        success: false,
        message: err.message,
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
}

export default ErrorMiddleware; 