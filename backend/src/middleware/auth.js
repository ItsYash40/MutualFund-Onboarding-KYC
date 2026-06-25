import { User } from "../models/User.js";
import { verifyJwt } from "../utils/jwt.js";

export async function requireAuth(req, res, next) {
  try {
    const authHeader = req.headers.authorization || "";
    const [scheme, token] = authHeader.split(" ");

    if (scheme !== "Bearer" || !token) {
      return res.status(401).json({ message: "Authentication token is required" });
    }

    const payload = verifyJwt(token);
    const user = await User.findById(payload.sub);

    if (!user) {
      return res.status(401).json({ message: "Invalid authentication token" });
    }

    req.user = user;
    next();
  } catch {
    return res.status(401).json({ message: "Invalid or expired authentication token" });
  }
}

export function requireAdmin(req, res, next) {
  if (!["admin", "rta_admin", "amc_admin"].includes(req.user?.role)) {
    return res.status(403).json({ message: "Admin access is required" });
  }

  next();
}

export function requireRole(...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user?.role)) {
      return res.status(403).json({ message: "This admin role is not allowed to access this module" });
    }

    next();
  };
}
