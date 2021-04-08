import React, { Children, useState } from 'react';
import {AuthContext} from './AuthContext';

function AuthProvider(props) {
   const [token, settoken] = useState("");
  return (
    <AuthContext.Provider value={"hello"}>
       {props.children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;
