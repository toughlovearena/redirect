import { Request } from "express";

export function getUrl(req: Request) {
  return req.protocol + '://' + req.get('host') + req.originalUrl;
}