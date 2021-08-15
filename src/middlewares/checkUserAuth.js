import { UNAUTHORIZED } from '../constants/statusCode';
import { decode } from '../utils/token';

const checkUserAuth = async (req, res, next) => {
  const { authorization = '' } = req.headers;
  const token = authorization.split(' ')[1];

  if (!token) {
    return res.status(UNAUTHORIZED).json({
      status: 'failed',
      message: 'Unauthorized'
    });
  }
  decode(token, req, res, next);
};

export default checkUserAuth;
