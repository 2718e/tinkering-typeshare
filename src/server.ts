import * as express from 'express'
import {api } from './shared/api'
import { applyServerMethodsToExpressRouter } from './shared/typesharing'
import * as Path from 'path'
import * as Bundler from 'parcel-bundler'

const port = 3000

async function makeParcelBundler() {
  const clientEntryPoint = Path.join(__dirname, './client/index.html')
  const options = {}
  const bundler = new Bundler(clientEntryPoint, options)   
  return bundler
}

async function start() {
  const app = express()
  const r = express.Router()
  r.use(express.json())
  applyServerMethodsToExpressRouter(r, api)
  const bundler = await makeParcelBundler()
  r.use('/',bundler.middleware())
  app.use('/',r)

  app.listen(port, () => {
    console.log('app listening on port ' + port)
  })
}

start()