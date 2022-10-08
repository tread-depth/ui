import React from 'react';
import { Routes, Route } from 'react-router-dom';

import RequireAuth from './components/RequireAuth';
import Landing from './pages/Landing';
import Loading from './pages/Loading';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import FleetCreate from './pages/Dashboard/FleetCreate';
import Fleets from './pages/Dashboard/Fleets';

import { FleetProvider } from './contexts/fleet';

const RoutesComponent = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/loading" element={<Loading />} />
                <Route path="/login" element={<Login />} />
            </Routes>
            <FleetProvider>
                <Routes>
                    <Route
                        path="/dashboard"
                        element={
                            <RequireAuth>
                                <Dashboard />
                            </RequireAuth>
                        }
                    >
                        <Route index element={<Fleets />} />
                        <Route
                            path="/dashboard/fleet/create"
                            element={<FleetCreate />}
                        />
                    </Route>
                </Routes>
            </FleetProvider>
        </>
    );
};

export default RoutesComponent;
