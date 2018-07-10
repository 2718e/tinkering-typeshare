import {ServerMethodDict} from './types'
import { Router } from 'express-serve-static-core'
import { parse as qsParse} from 'qs'

export function applyServerMethodsToExpressRouter<TServer extends ServerMethodDict>(r: Router, server: TServer) {
  const urls = Object.keys(server)
  urls.forEach(key => {
    const serverMethod = server[key]
    r[serverMethod.restMethod](key, async (req, res) => {
      const queryParams = qsParse(req.query)
      const bodyParams = req.body
      const result = await serverMethod.computeValue(queryParams, bodyParams)
      res.send(result)
    })
  })
}