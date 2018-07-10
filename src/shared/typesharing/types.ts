type RestMethod = "get" | "post" | "put" | "delete";

export type GenericQueryParams = {[key:string] : QueryParamValue}
type QueryParamValue = string|GenericQueryParams|QueryParamValueArray
interface QueryParamValueArray extends Array<QueryParamValue>{}


export interface IServerMethod<TRestMethod extends RestMethod, TQueryParams extends GenericQueryParams, TBodyParams, TReturn> {

  "restMethod": TRestMethod
  computeValue: (qp: TQueryParams, bp: TBodyParams) => Promise<TReturn>
  "queryType"?: TQueryParams // should never assign these properties but having them allows to extract the precise type of the generic when mapping the type.
  "bodyType"?: TBodyParams
  "retType"?: TReturn

}

export type ServerMethodDict = { [s: string]: IServerMethod<any, any, any, any> }
