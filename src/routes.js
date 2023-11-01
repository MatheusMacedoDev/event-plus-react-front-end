import React from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';

import Header from './components/Header/Header';

import EventTypePage from './pages/EventTypePage/EventTypePage';
import EventPage from './pages/EventPage/EventPage';
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';
import TestPage from './pages/Test/TestPage';
import Footer from './components/Footer/Footer';

const RouteView = () => {
    return (
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route element={ <HomePage/> } path="/" exact/>
                <Route element={ <EventPage/> } path="/event"/>
                <Route element={ <EventTypePage/> } path="/event-type"/>
                <Route element={ <LoginPage/> } path="/login"/>
                <Route element={ <TestPage/> } path="/test"/>
            </Routes>
            <Footer/>
        </BrowserRouter>
    );
}

export default RouteView;