import * as jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET || "jwt_secret";

const verify = (token: string) => {
  const decoded = jwt.verify(token, JWT_SECRET);

  if (typeof decoded === "string" || decoded instanceof jwt.JsonWebTokenError) {
    return false;
  }
  return decoded;
};

export default verify;
