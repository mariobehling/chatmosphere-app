import React, { useEffect, useState } from 'react'
import {connectionOptions, jitsiInitOptions} from './options'
import {Room} from './Room'
import { useStore } from './store'

 /* globals: JitisMeetJS */

 //no reload?
const Connection = () => {

  const [connection, setConnection] = useState(undefined)
  const [connected, setConnected] = useState(false)
  const [JitsiMeetJS, setJitsiMeet] = useState()

  useEffect(() => {
    const jsMeet = async () => window.JitsiMeetJS
    jsMeet().then(value => initConnection(value))
    return((connection) => {
      if(connection) connection.disconnect()
    })
  },[])
 
  const initConnection = (jsMeet) => {
    jsMeet.setLogLevel(jsMeet.logLevels.ERROR);
    jsMeet.init(jitsiInitOptions)
    const tmpConnection = new jsMeet.JitsiConnection(null, null, connectionOptions)
    tmpConnection.addEventListener(jsMeet.events.connection.CONNECTION_ESTABLISHED, () => {setConnected(true)});
    tmpConnection.addEventListener(jsMeet.events.connection.CONNECTION_FAILED, () => console.log("failed"));
    tmpConnection.addEventListener(jsMeet.events.connection.CONNECTION_DISCONNECTED, () => console.log("disconnect, cleanup here"));
    tmpConnection.connect()
    setJitsiMeet(jsMeet)
    setConnection(tmpConnection)
  }

  return (
    <div>
      {connected && <Room roomName="conference2" JitsiMeetJS={JitsiMeetJS} connection={connection} />}
      Some Content Here

    </div> 
  )
}


export default Connection