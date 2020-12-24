import {Switch, Route, BrowserRouter  } from "react-router-dom";
import AddIssue from "./components/AddIssue";
import IssuePage from './components/IssuePage';

function App() {
  
  return (
    <>
    <BrowserRouter>
    <Switch>
      <Route exact path = "/addissue" component={AddIssue}/>
      <Route exact path = "/" component={IssuePage} />
    </Switch>
    </BrowserRouter>
    </>
  );
}

export default App;
