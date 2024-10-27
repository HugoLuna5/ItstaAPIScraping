import { Request, Response } from "express";


exports.check = (req: Request, res: Response, next: any, rolePermission: any) => {
    const typeAccount: any = req.user.role;
    if (rolePermission !== typeAccount) {
      return false;
    }
    return true;
  };
  

