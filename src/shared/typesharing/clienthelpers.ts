import { ServerMethodDict } from './types'
import { stringify as qsStringify } from 'qs'

export class ServerCaller<TServer extends ServerMethodDict> {

  constructor() { }

  async callServer<TMethod extends keyof TServer>(url: TMethod, restMethod: TServer[TMethod]["restMethod"],
    qp: TServer[TMethod]["queryType"],
    bp: TServer[TMethod]["bodyType"]) {
    const reqUrl = qp ? url as string + '?' + qsStringify(qp) : url as string
    let response;
    if (bp) {
      response = await fetch(reqUrl, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: restMethod.toUpperCase(),
        body: JSON.stringify(bp)
      })
    }
    else {
      response = await fetch(reqUrl)
    }
    return response.json()
  }

}