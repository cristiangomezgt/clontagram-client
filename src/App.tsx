import React from 'react';
import Nav from './Components/Nav';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';

function App() {
  return (
    <React.Fragment>
      <Nav />
      {/* <SignUp /> */}
      <Login />
    </React.Fragment>
  );
}

export default App;
