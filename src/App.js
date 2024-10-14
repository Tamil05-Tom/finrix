import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Overview from './pages/Overview';
import Login from './pages/Login';
import { auth } from './auth/firebase';
import './styles/global.css'
// import { Comment } from 'react-loader-spinner';


function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);
  if (isLoading) {
    return <div className=' loader-effect'>
<div class="loader"></div>
     </div>;
  }

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Login />} />
          <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/" />} />
          <Route path="/overview" element={user ? <Overview /> : <Navigate to="/" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;