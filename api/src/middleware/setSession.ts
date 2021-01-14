import { v4 } from 'uuid'
import { Request, Response } from 'express'

export const setSession = (req: Request, _res: Response, next: Function): void => {
  if (!req.session.identity) {
    req.session.identity = v4()
  }
  console.log(req.url, req.session)
  next()
}