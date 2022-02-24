import type { RequestHandler, ErrorRequestHandler } from "express";

export const _404: RequestHandler;
export const _500: ErrorRequestHandler;

export function asyncWrap(fn: RequestHandler): RequestHandler;
