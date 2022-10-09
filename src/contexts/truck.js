import React, { useContext, useState } from 'react';

import { axios } from '../util';

const initialState = {
    truck: {},
    trucks: [],
};

export const TruckContext = React.createContext({ ...initialState });

export const useTruck = () => useContext(TruckContext);

export const TruckProvider = (props) => {
    const [truck, setTruck] = useState({});
    const [trucks, setTrucks] = useState([]);

    const getTrucks = async (fleetId) => {
        const { data } = await axios.get(`/truck/${fleetId}`);

        if (data) {
            setTrucks(data);
        }
    };

    const getTruck = async (fleetId, id) => {
        const { data } = await axios.get(`/truck/${fleetId}/${id}`);

        if (data) {
            setTruck(data);
        }
    };

    const createTruck = async (truck) => {
        try {
            const { data } = await axios.post('/truck/create', {
                ...truck,
            });
            setTrucks([...trucks, data]);
        } catch (error) {
            console.error(error.message);
            return error;
        }
    };

    return (
        <TruckContext.Provider
            value={{
                ...initialState,
                truck,
                trucks,
                getTruck,
                getTrucks,
                createTruck,
            }}
        >
            {props.children}
        </TruckContext.Provider>
    );
};
