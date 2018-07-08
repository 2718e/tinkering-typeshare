import { Router } from 'express-serve-static-core'


type RestMethod = "get" | "post" | "put" | "delete";

export interface IServerMethod<TRestMethod extends RestMethod, TBodyParams, TReturn> {

  "restMethod": TRestMethod
  computeValue: (params: TBodyParams) => Promise<TReturn>
  "bodyType"?: TBodyParams // should never assign these properties but having them allows to extract the precise type of the generic when mapping the type.
  "retType"?: TReturn

}

export type SMDict = { [s: string]: IServerMethod<any, any, any> }

export function applyServerMethodsToExpressRouter<TServer extends SMDict>(r: Router, server: TServer) {
  const urls = Object.keys(server)
  urls.forEach(key => {
    const serverMethod = server[key]
    r[serverMethod.restMethod](key, async (req, res) => {
      const bodyParams = req.body
      const result = await serverMethod.computeValue(bodyParams)
      res.send(result)
    })
  })
}


export class ServerCaller<TServer extends SMDict> {

  constructor() { }

  async callServer<TMethod extends keyof TServer>(url: TMethod, restMethod: TServer[TMethod]["restMethod"], bp: TServer[TMethod]["bodyType"]) {
    const response = await fetch(url as string, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: restMethod.toUpperCase(), 
      body: JSON.stringify(bp)})
    return response.json()
  }

}