import { useEffect, useState } from 'react';
import './App.css';
import { Context } from './context/context';
import { Box } from '@mui/material';
import Header from './components/Header';
import NavLink from './components/NavLink';
import TableComponent from './components/TableComponent';
import { ItemComponentProps } from '../src/components/TableComponent';

function App() {
    const entityId = String(114932);

    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [rowData, setRowData] = useState<ItemComponentProps[]>([]);

    const handleSetState = (array:ItemComponentProps[])=>{
        setRowData(array)
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    `http://185.244.172.108:8081/v1/outlay-rows/entity/${entityId}/row/list`
                );
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                setRowData(data); // Установка данных в локальное состояние компонента
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const handleToggleEdit = () => {
        setIsEditing(!isEditing);
    };

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
                            handleToggleEdit,
                            handleSetState,
                            rowData,
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
