import { ServerMethodDict } from './types'
import { stringify as qsStringify } from 'qs'

export class ServerCaller<TServer extends ServerMethodDict> {

  constructor() { }

  async callServer<TMethod extends keyof TServer>(url: TMethod, restMethod: TServer[TMethod]["restMethod"],
    queryParams: TServer[TMethod]["queryType"],
    bodyParams: TServer[TMethod]["bodyType"]) : Promise<TServer[TMethod]["retType"]>  {
    const reqUrl = queryParams ? url as string + '?' + qsStringify(queryParams) : url as string
    let response;
    if (bodyParams) {
      response = await fetch(reqUrl, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: restMethod.toUpperCase(),
        body: JSON.stringify(bodyParams)
      })
    }
    else {
      response = await fetch(reqUrl)
    }
    return response.json()
  }

}