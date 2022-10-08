import React, { useContext, useState, useEffect } from 'react';

import { axios } from '../util';

const initialState = {
    fleets: [],
};

export const FleetContext = React.createContext({ ...initialState });

export const useFleet = () => useContext(FleetContext);

export const FleetProvider = (props) => {
    const [fleets, setFleets] = useState({});

    const getFleets = async () => {
        const { data } = await axios.get('/fleet');

        if (data) {
            setFleets(data);
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
                fleets,
                getFleets,
                createFleet,
            }}
        >
            {props.children}
        </FleetContext.Provider>
    );
};
