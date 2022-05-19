import {
Switch,
BrowserRouter,
Route,
} from "react-router-dom";
import {Provider} from 'react-redux';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import configureStore from './store';
import PrivateRoute from './utils/PrivateRoute';
import PublicRoute from './utils/PublicRoute';

function App() {
  return (
    <Provider store={configureStore()}>
        <BrowserRouter>
            <Switch>
                <PublicRoute path="/login" component={Login} />
                <PublicRoute path="/signup" component={Signup} />
                <PrivateRoute path="/dashboard" component={Dashboard} />
            </Switch>
        </BrowserRouter>
  </Provider>
  );
}

export default App;
