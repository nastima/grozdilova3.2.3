import { useReducer, useEffect } from 'react';
import { Loader, Center, Alert } from '@mantine/core';
import './App.css';
import CardComponent from '../components/CardComponent/CardComponent';
import Modal from '../components/Modal/Modal';
import { getLaunches } from '../services/spacexApi';
import { reducer, initialState } from '../state/Reducer';
import type { Launch  } from '../types/types';

function App() {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        const fetchLaunches = async () => {
            dispatch({ type: 'FETCH_START' });
            try {
                const data = await getLaunches('2020');
                dispatch({ type: 'FETCH_SUCCESS', payload: data });
            } catch (err) {
                const errorMessage = err instanceof Error ? err.message : 'An error occurred';
                dispatch({ type: 'FETCH_ERROR', payload: errorMessage });
            }
        };

        void fetchLaunches();
    }, []);

    const handleSelectLaunch = (launch: Launch) => {
        dispatch({ type: 'SELECT_LAUNCH', payload: launch });
    };

    const handleCloseModal = () => {
        dispatch({ type: 'CLOSE_MODAL' });
    };

    if (state.loading) {
        return (
            <Center style={{ height: '100vh' }}>
                <Loader size="xl" />
            </Center>
        );
    }

    if (state.error) {
        return (
            <Center style={{ height: '100vh' }}>
                <Alert title="Error!" color="red">
                    {state.error}
                </Alert>
            </Center>
        );
    }

    return (
        <div style={{ padding: '20px' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>
                SpaceX Launches 2020
            </h1>
            <div className="Grid">
                {state.launches.map((launch) => (
                    <CardComponent
                        key={launch.flight_number}
                        launch={launch}
                        onSelect={handleSelectLaunch}
                    />
                ))}
            </div>

            <Modal
                launch={state.selectedLaunch}
                isOpen={state.isModalOpen}
                onClose={handleCloseModal}
            />
        </div>
    );
}

export default App;