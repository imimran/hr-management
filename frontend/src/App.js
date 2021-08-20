import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import EmployeeListScreen from './screens/EmployeeListScreen';
import AddEmployeeScreen from './screens/AddEmployeeScreen';
import CSVUploderScreen from './screens/CSVUploderScreen';
import SendMailScreen from './screens/SendMailScreen';
import HomeScreen from './screens/HomeScreen';
function App() {
    return (
        <div className="App">
            <Navbar />
            <Router>
            <Switch>
               
                <Route path='/employee'  component={EmployeeListScreen} />
                <Route path='/add-employee'  component={AddEmployeeScreen} />
                <Route path='/upload'  component={CSVUploderScreen} />
                <Route path='/send-mail'  component={SendMailScreen} />
                <Route path='/'  exect component={HomeScreen} />
                </Switch>
            </Router>
        </div>
    );
}

export default App;
