import * as React from 'react';
import './App.css';
import JitsiConnection from './components/connection/JitsiConnection';
import { Header } from './components/Header/Header';
import { Localuser } from './components/Localuser/Localuser';
import { LocalStoreLogic } from './components/Store/LocalStore';
import { Users } from './components/User/Users';

function App() {
  return (
    <div className="App">
      <Header>Chatmosphere</Header>
      <JitsiConnection />
      <LocalStoreLogic />
      <Users />
      <Localuser />
    </div>
  );
}

export default App;
