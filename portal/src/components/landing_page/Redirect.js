import React from 'react'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
  } from "react-router-dom";
import Landing from './Landing'
import Home from './Home'

export default function Redirect() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/landing" element={<Landing />} />
                <Route path="/home" element={<Home />} />
            </Routes>
        </Router>
    )
}
