import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Accueil from '../../pages/Accueil.js';
import Log from '../../pages/Log/Log.js';
import Profil from '../../pages/Profil.js';

const index = () => {
	return (
		<Router>
            <Routes>
                <Route path='/' element={<Log />} />
                <Route path='/accueil' element={<Accueil />} />
                <Route path='/profil' element={<Profil />} />
            </Routes>
        </Router>	
	);
};

export default index;
