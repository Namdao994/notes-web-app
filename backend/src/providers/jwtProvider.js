import JWT from 'jsonwebtoken';

export const generateToken = (payload, secretSignature, expiresIn) => {
  try {
    const accessToken = JWT.sign(payload, secretSignature, {algorithm: 'HS256', expiresIn});
    return accessToken;
  } catch (err) {
    console.error('Error generating token:', err);
    throw new Error('Token generation failed');
  }
};

export const verifyToken = (token, secretSignature) => {
  try {
    const accessTokenDecoded = JWT.verify(token, secretSignature);
    return accessTokenDecoded;
  } catch (error) {
    console.error('Error verifying token:', err);
    throw new Error('Token verify failed');
  }
};

export const jwtProvider = {
  generateToken,
  verifyToken,
};
