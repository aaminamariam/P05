import React from 'react';
import {Switch, Route } from "react-router-dom";
import HiringPortal from './Hiringportal';
import Addnewposting from './Addnewposting';
import JobApplication from './JobApplication';
import Login from './login';
import AppPortal from './AppPortal';
import HRdashboard from './HRdashboard';


function App(){
    
    return(
       <>
     
       <Switch>

           <Route exact path="/login" component={Login}/>
           <Route exact path="/hiringportal" component={HiringPortal}/>
           <Route exact path="/addnewposting" component={Addnewposting}/>
           <Route exact path="/jobapplication" component={JobApplication}/>
           <Route exact path="/appportal" component={AppPortal}/>
           <Route exact path="/hrdashboard" component={HRdashboard}/>
          
           
           
       </Switch>
     
      
   
       </>
   );
   }
   
   export default App;