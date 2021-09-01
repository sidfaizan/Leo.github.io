import React from 'react';
import { createBrowserHistory } from "history";
import { ToastContainer, toast } from 'react-toastify';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Landing from './landing';
import Pool from './pools';
import SubmitProject from './submitproject';
import ProjectDetails from './project-details';
import Projects from './projects';
import '../static/css/style.css';
import ClosePool from "./closepool";

import 'jquery/dist/jquery.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-toastify/dist/ReactToastify.css";
import 'font-awesome/css/font-awesome.min.css';
import 'owl.carousel/dist/assets/owl.carousel.css'; 
import 'owl.carousel/dist/assets/owl.theme.default.css';
// import { Web3ReactProvider } from '@web3-react/core'
// import { getLibrary } from '../utils/web3React'
// import { Provider } from 'react-redux';
// import store from '../redux/store/index';
import useEagerConnect from "../hooks/useEagerConnect";

const hist = createBrowserHistory();

// class App extends Component {
const App=()=>{
useEagerConnect()

    return (
      // <Provider store={store}>
      // {/* <Web3ReactProvider getLibrary={getLibrary}> */}
      <div>
        <ToastContainer
          closeOnClick
          position="bottom-left"
        />
        <Router history={hist}>
          <Switch>
            <Route exact path='/' component={props => <Landing {...props} />} />
            <Route exact path='/landing' component={props => <Landing {...props} />} />
            <Route exact path='/pools/:id/:tier' component={props => <Pool {...props} />} />
            <Route exact path='/closepool/:id/:tier' component={props => <ClosePool {...props} />} />
            <Route exact path='/submit-project' component={props => <SubmitProject {...props} />} />
            {/* <Route exact path='/sign-in' component={props => <SignIn {...props} />} /> */}
            <Route exact path='/project-details/:id' component={props => <ProjectDetails {...props} />} />
            <Route exact path='/projects' component={props => <Projects {...props} />} />
          </Switch>
        </Router>
      
      </div>
      // </Web3ReactProvider>
      // </Provider>
    );
  }
// }

export default App;