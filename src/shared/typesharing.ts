
interface IServerFunctionContract<TQueryParams, TBodyParams, TReturn> {
  url: string,
  methodType: string
}

function parseParams(req) {

}

function FulfilContract<TQueryParams, TBodyParams, TReturn>(
  expressRouter: any,
  contract: IServerFunctionContract<TQueryParams, TBodyParams, TReturn>,
  fComputeReturn: (query: TQueryParams, body: TBodyParams) => TReturn) {
  expressRouter[contract.methodType](contract.url, async (req, res) => {
        const { queryParams, bodyParams } = parseParams(req)
        const result = fComputeReturn(queryParams,bodyParams);
        res.send(result);
    })

}