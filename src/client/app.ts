import {ServerCaller} from '../shared/typesharing'
import {DummyServerApi} from '../shared/api'

const caller = new ServerCaller<DummyServerApi>();

async function go(){
  const result = await caller.callServer('/othermethod','post', {id: "pie", quantity: 10})
  console.log(result)
}

go()