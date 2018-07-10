import {IServerMethod} from './typesharing/types'

export interface IDummyRequestData {
  id: string,
  quantity: number
}

// typescript is made in such a way that an interface does not automatically fit a [key:string]
// indexer as needed for query parameters.
export type IDummyQueryRequestData = {
  id: string,
  quantity: string
}

export type INestedQueryRequestData = {
  id: string,
  quantity: string[][][][]
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
  "/dummymethod": IServerMethod<"post",null, IDummyRequestData,IDummyResponseData>,
  "/othermethod": IServerMethod<"get",IDummyQueryRequestData,null,IDummyResponseData>
  "/nestedarrayquery": IServerMethod<"get",INestedQueryRequestData,null,IDummyResponseData>
}
export const api : DummyServerApi = {
  "/dummymethod" : {restMethod:"post", computeValue: async (_,data) => {
    return {
      quantity: data.quantity,
      description: descriptions[data.id] || "Unknown item"
    }
  }},"/othermethod": {restMethod:"get", computeValue: async (data,_) => {
    return {
      quantity: Number(data.quantity),
      description: descriptions[data.id] || "Unknown item"
    }
  }},
  "/nestedarrayquery" : {restMethod:"get", computeValue: async (data,_) => {
    return {
      quantity: Number(data.quantity[0][0][0][0]),
      description: descriptions[data.id] || "Unknown item"
    }
  }},

}