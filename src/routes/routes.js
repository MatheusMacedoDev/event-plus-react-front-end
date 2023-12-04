import React from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';

import Header from '../components/Header/Header';

import EventTypePage from '../pages/EventTypePage/EventTypePage';
import EventPage from '../pages/EventPage/EventPage';
import HomePage from '../pages/HomePage/HomePage';
import LoginPage from '../pages/LoginPage/LoginPage';
import TestPage from '../pages/Test/TestPage';
import StudentEventPage from '../pages/StudentEventPage/StudentEventPage';

import Footer from '../components/Footer/Footer';
import { PrivateRoute } from './PrivateRoute';

const RouteView = () => {
    return (
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route element={ <HomePage/> } path="/" exact/>

                <Route 
                    path="/eventos"
                    element={ 
                        <PrivateRoute>
                            <EventPage/> 
                        </PrivateRoute>
                    } 
                />
                <Route 
                    path="/eventos-aluno"
                    element={ 
                        <StudentEventPage/>
                    } 
                />
                <Route 
                    path="/tipo-eventos"
                    element={ 
                        <PrivateRoute>
                            <EventTypePage/> 
                        </PrivateRoute>
                    } 
                />

                <Route element={ <LoginPage/> } path="/login"/>
                <Route element={ <TestPage/> } path="/testes"/>
            </Routes>
            <Footer/>
        </BrowserRouter>
    );
}

export default RouteView;