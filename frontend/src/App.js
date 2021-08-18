import './App.css';
import Navbar from './components/Navbar';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import EmployeeListScreen from './screens/EmployeeListScreen';
import AddEmployeeScreen from './screens/AddEmployeeScreen';
function App() {
    return (
        <div className="App">
            <Navbar />
            <Router>
                <Route path='/employee' exect component={EmployeeListScreen}/>
                <Route path='/add-employee' exect component={AddEmployeeScreen}/>
            </Router>
        </div>
    );
}

export default App;
