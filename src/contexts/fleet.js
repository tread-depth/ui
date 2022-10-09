import React, { useContext, useState } from 'react';

import { axios } from '../util';

const initialState = {
    fleet: {},
    fleets: [],
};

export const FleetContext = React.createContext({ ...initialState });

export const useFleet = () => useContext(FleetContext);

export const FleetProvider = (props) => {
    const [fleet, setFleet] = useState({});
    const [fleets, setFleets] = useState([]);

    const getFleets = async () => {
        const { data } = await axios.get('/fleet');

        if (data) {
            setFleets(data);
        }
    };

    const getFleet = async (id) => {
        const { data } = await axios.get(`/fleet/${id}`);

        if (data) {
            setFleet(data);
        }
    };

    const createFleet = async (fleet) => {
        try {
            const { data } = await axios.post('/fleet/create', {
                ...fleet,
            });
            setFleets([...fleets, data]);
        } catch (error) {
            console.error(error.message);
            return error;
        }
    };

    return (
        <FleetContext.Provider
            value={{
                ...initialState,
                fleet,
                fleets,
                getFleet,
                getFleets,
                createFleet,
            }}
        >
            {props.children}
        </FleetContext.Provider>
    );
};
