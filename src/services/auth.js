import jwt from 'jsonwebtoken';
import 'dotenv/config';

const JWT_SECRET = process.env.JWT_SECRET;

const JWT_OPTS = {
  issuer: 'cronos-entries',
  expiresIn: '8h'
};

export const createToken = user => {
    const token = jwt.sign(user.toJSON(), process.env.JWT_SECRET, JWT_OPTS);
    const { iat, exp } = jwt.decode(token);

    return { iat, exp, token }
};

const verifyToken = token => {
  return jwt.verify(token, JWT_SECRET, JWT_OPTS);
};

export const getTokenFromHeaders = req => {
  const token = req.headers['x-access-token'];

  if (token) {
    return verifyToken(token);
  }

  return null;
};

export const validateUser = async (req, res, next) => {
  console.log('validating')
    jwt.verify(req.headers['x-access-token'], JWT_SECRET, function(err, decoded) {
      if (err) {
        // res.json({status:"error", message: err.message, data:null});
        // res.send(401, {message: err.message});
        res.status(401).send({message: err.message})
      }else{
        // add user id to request
        console.log(decoded)
        req.decoded = decoded;
        next();
      }
    });
}

// export const AuthServices = {
//     createToken,
//     verifyToken,
//     getTokenFromHeaders,
//   };