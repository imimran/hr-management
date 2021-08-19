import './App.css';
import Navbar from './components/Navbar';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import EmployeeListScreen from './screens/EmployeeListScreen';
import AddEmployeeScreen from './screens/AddEmployeeScreen';
import CSVUploderScreen from './screens/CSVUploderScreen';
function App() {
    return (
        <div className="App">
            <Navbar />
            <Router>
                <Route path='/employee' exect component={EmployeeListScreen}/>
                <Route path='/add-employee' exect component={AddEmployeeScreen}/>
                <Route path='/upload' exect component={CSVUploderScreen}/>
            </Router>
        </div>
    );
}

export default App;
