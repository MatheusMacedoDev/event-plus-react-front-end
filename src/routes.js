import React from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';

import EventTypePage from './pages/EventTypePage/EventTypePage';
import EventPage from './pages/EventPage/EventPage';
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';

const RouteView = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={ <HomePage/> } path="/" exact/>
                <Route element={ <EventPage/> } path="/Event"/>
                <Route element={ <EventTypePage/> } path="/EventType"/>
                <Route element={ <LoginPage/> } path="/Login"/>
            </Routes>
        </BrowserRouter>
    );
}

export default RouteView;