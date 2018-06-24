import { Router } from 'express-serve-static-core';

type RestMethod = "get" | "post" | "put" | "delete";

interface ServerMethod<TQueryParams, TBodyParams, TReturn> {

  restMethod: RestMethod
  computeValue: (params: TBodyParams & TQueryParams) => TReturn
  "queryType"?: TQueryParams
  "bodyType"?: TBodyParams // should never assign these properties but having them allows to extract the precise type of the generic when mapping the type.
  "retType"?: TReturn

}

interface IOrder {
  quantity: number
  description: string
}

type SMDict = {[s:string] : ServerMethod<any,any,any>}

// developer should fill this in 
interface IServerApi extends SMDict{
  "getOrderById": ServerMethod<string, void, IOrder>
}

type ServerMethodCaller<TM extends ServerMethod<any,any,any>> = (qp: TM["queryType"], bp:TM["bodyType"] ) => Promise<TM["retType"]>

type ClientApi<TServerApi extends SMDict > = { 
  [m in keyof TServerApi]: ServerMethodCaller<TServerApi[m]>
}

const ClientCaller: ClientApi<IServerApi> = {
  "getOrderById": async (id: string) => { return {quantity:7, description: id}}
}