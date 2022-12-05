import { Request, Response, NextFunction } from "express";
import JWT from "jsonwebtoken";

export const checkAuth = async (req: Request, res: Response, next: NextFunction) => {
  let token = req.header("authorization");

  if (!token) {
    return res.status(403).json({
      // 403 Unauthorized
      errors: [
        {
          msg: "You are un authorized",
        },
      ],
    });
  }

  token = token.split(" ")[1];

  try {
    const user = (await JWT.verify(token, process.env.JWT_SECRET as string)) as { email: string };

    req.user = user.email; // 'user' no longer throwing a typescript error due to this being added in  index.d.ts
    next();
  } catch (error) {
    // If the token has not been verified
    return res.status(403).json({
      // 403 Unauthorized
      errors: [
        {
          msg: "You are un authorized",
        },
      ],
    });
  }
};
