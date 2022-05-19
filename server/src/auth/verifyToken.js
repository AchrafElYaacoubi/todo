import jwt from "jsonwebtoken";

const verifyToken = (
  req,
  res,
  next
) => {
  const bearerHeader = req.headers["authorization"];

  if (
    typeof bearerHeader !== "undefined" &&
    bearerHeader.startsWith("Bearer ")
  ) {
    const bearerToken = bearerHeader.split(" ");
    const token = bearerToken[1];
    try {
      const user = jwt.verify(token, process.env.SECRET_KEY);
      req.user = user;

      return next();
    } catch (error) {
      return res.status(401).json({ error: "not authorized" });
    }
  } else {
    return res.status(401).json({ error: "not authorized" });
  }
};

export default verifyToken;