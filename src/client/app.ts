import {ServerCaller} from '../shared/typesharing/clienthelpers'
import {DummyServerApi} from '../shared/api'

const caller = new ServerCaller<DummyServerApi>();

async function go(){
  console.log(await caller.callServer('/othermethod','get', {id: "pie", quantity: "1"},null))
  console.log(await caller.callServer('/dummymethod','post',null,{id: "chips", quantity: 10}))
  console.log(await caller.callServer('/nestedarrayquery','get',{id: "jalfreizi", quantity: [[[["2"]]]]},null))
}

go()