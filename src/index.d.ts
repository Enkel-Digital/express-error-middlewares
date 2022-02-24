import type { Request, Response, NextFunction } from "express";

export function _404(req: Request, res: Response, next: NextFunction): void;

export function _500(
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
): void;

export function asyncWrap(
  fn: Function
): (
  req: Request,
  res: Response,
  next: NextFunction,
  ...args: any[]
) => NextFunction;
