import type { Request, Response, RequestHandler } from "express";

export function _404(req: Request, res: Response, next: RequestHandler): void;

export function _500(
  err: any,
  _req: Request,
  res: Response,
  _next: RequestHandler
): void;

export function asyncWrap(
  fn: Function
): (
  req: Request,
  res: Response,
  next: RequestHandler,
  ...args: any[]
) => RequestHandler;
