import { useEffect } from 'react';
import './App.css';
import { Context } from './context/context';
import { Box } from '@mui/material';
import Header from './components/Header';
import NavLink from './components/NavLink';
import TableComponent from './components/TableComponent';
import { useDispatch } from 'react-redux';
import { setRows } from './RTK/redusers/firstReduser';

function App() {
    const entityId = String(114932);
    const dispatch = useDispatch();

    useEffect(() => {
        fetch(
            `http://185.244.172.108:8081/v1/outlay-rows/entity/${entityId}/row/list`
        )
            .then((response) => response.json())
            .then((data) => dispatch(setRows(data)))
            .catch((error) => console.error('Error fetching rows:', error));
    }, []);

    return (
        <Box
            sx={{
                width: '100%',
                height: '100vh',
                bgcolor: '#27272A',
                fontFamily: 'roboto',
                overflow: 'hidden',
            }}
        >
            <Header />
            <Box sx={{ display: 'flex', height: '100%' }}>
                <Box
                    sx={{ flex: '0 0 234px', borderRight: '1px solid #414144' }}
                >
                    <NavLink />
                </Box>
                <Box sx={{ flex: '1 1 100%' }}>
                    <Context.Provider
                        value={{
                            entityId,
                        }}
                    >
                        <TableComponent />
                    </Context.Provider>
                </Box>
            </Box>
        </Box>
    );
}

export default App;
