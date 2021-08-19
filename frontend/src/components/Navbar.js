import React from 'react';

function Navbar() {
    return (
        <div>
            <nav className="navbar navbar-expand-sm ">
                <a className="navbar-brand" href="/home">
                    HR Management
                </a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ">
                        <li className="nav-item ">
                            <a className="nav-link" href="/employee">
                                Employee
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/add-employee">
                                Add Employee
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;
