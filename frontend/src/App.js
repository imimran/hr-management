import './App.css';
import Navbar from './components/Navbar';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import EmployeeListScreen from './screens/EmployeeListScreen';
import AddEmployeeScreen from './screens/AddEmployeeScreen';
import CSVUploderScreen from './screens/CSVUploderScreen';
import SendMailScreen from './screens/SendMailScreen';
function App() {
    return (
        <div className="App">
            <Navbar />
            <Router>
                <Route path='/employee' exect component={EmployeeListScreen}/>
                <Route path='/add-employee' exect component={AddEmployeeScreen}/>
                <Route path='/upload' exect component={CSVUploderScreen}/>
                <Route path='/send-mail' exect component={SendMailScreen}/>
            </Router>
        </div>
    );
}

export default App;
