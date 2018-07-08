import {SMDict, IServerMethod} from './typesharing'

export interface IDummyRequestData {
  id: string,
  quantity: number
}

export interface IDummyResponseData {
  quantity: number
  description: string
}

const descriptions = {
  "pie" : "An iconic food",
  "chips" : "A popular side dish",
  "jalfreizi" : "Spicy"
}

export type DummyServerApi = {
  "/dummymethod": IServerMethod<"post", IDummyRequestData,IDummyResponseData>,
  "/othermethod": IServerMethod<"post", IDummyRequestData,IDummyResponseData>
}
export const api : DummyServerApi = {
  "/dummymethod" : {restMethod:"post", computeValue: async (data) => {
    return {
      quantity: data.quantity,
      description: descriptions[data.id] || "Unknown item"
    }
  }},
  "/othermethod": {restMethod:"post", computeValue: async (data) => {
    return {
      quantity: data.quantity,
      description: descriptions[data.id] || "Unknown item"
    }
  }}
}