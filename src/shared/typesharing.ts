type RestMethod = "get" | "post" | "put" | "delete";

interface ServerMethod<TRestMethod extends RestMethod, TBodyParams, TReturn> {

  "restMethod": TRestMethod
  computeValue: (params: TBodyParams) => TReturn
  "bodyType"?: TBodyParams // should never assign these properties but having them allows to extract the precise type of the generic when mapping the type.
  "retType"?: TReturn

}

type SMDict = {[s:string] : ServerMethod<any,any,any>}


export class ServerCaller<TServer extends SMDict> {

  constructor(){}

  async callServer<TMethod extends keyof TServer>(url: TMethod, restMethod: TServer[TMethod]["restMethod"], bp: TServer[TMethod]["bodyType"]){
    console.log("not implemented")
  }

}

interface IOrder {
  quantity: number
  description: string
}
// developer should fill this in 
interface IDummyServerApi extends SMDict{
  "getOrderById": ServerMethod<"get", string, IOrder>
}

const testCaller = new ServerCaller<IDummyServerApi>();

testCaller.callServer("getOrderById","get","7");