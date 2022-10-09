import React from 'react';
import { Routes, Route } from 'react-router-dom';

import RequireAuth from './components/RequireAuth';
import Landing from './pages/Landing';
import Loading from './pages/Loading';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import FleetCreate from './pages/Dashboard/FleetCreate';
import Fleets from './pages/Dashboard/Fleets';
import Fleet from './pages/Dashboard/Fleet';
import TruckCreate from './pages/Dashboard/TruckCreate';

import { FleetProvider } from './contexts/fleet';
import { TruckProvider } from './contexts/truck';

const RoutesComponent = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/loading" element={<Loading />} />
                <Route path="/login" element={<Login />} />
            </Routes>

            <FleetProvider>
                <TruckProvider>
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
                            <Route
                                path="/dashboard/fleet/:fleetId"
                                element={<Fleet />}
                            />
                            <Route
                                path="/dashboard/fleet/:fleetId/truck/create"
                                element={<TruckCreate />}
                            />
                        </Route>
                    </Routes>
                </TruckProvider>
            </FleetProvider>
        </>
    );
};

export default RoutesComponent;
