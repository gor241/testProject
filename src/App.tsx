import React, { useEffect, useState } from 'react';
import './App.css';
import EntityCreationComponent from './components/EntityCreationComponent';
import DataDisplayComponent from './components/DataDisplayComponent';
import { Context } from './context/context';
import RowCreationComponent from './components/RowCreationComponent';
import RowUpdateComponent from './components/RowUpdateComponent';
import RowDeleteComponent from './components/RowDeleteComponent';
import { Box } from '@mui/material';
import Header from './components/Header';
import NavLink from './components/NavLink';

function App() {
    const [entityId, setEntityId] = useState<string>('');
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [isIdLoaded, setIsIdLoaded] = useState<boolean>(false);

    useEffect(() => {
        // Проверяем, был ли уже загружен ID
        if (!isIdLoaded) {
            const createEntity = async () => {
                try {
                    const response = await fetch(
                        'http://185.244.172.108:8081/v1/outlay-rows/entity/create',
                        {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                        }
                    );
                    if (!response.ok) {
                        throw new Error('Failed to create entity');
                    }
                    const data = await response.json();
                    const createdEntityId = data.id;
                    // Устанавливаем ID в состояние и помечаем, что он загружен
                    setEntityId(createdEntityId);
                    setIsIdLoaded(true);
                } catch (error) {
                    console.error('Error creating entity:', error);
                }
            };
            createEntity();
        }
    }, [isIdLoaded]);

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
                        value={{ setEntityId, entityId, handleToggleEdit }}
                    >
                        {/* <DataDisplayComponent /> */}
                        {/* Получение данных */}
                        {/* <RowCreationComponent parentId={null} /> */}
                        {/* Создание готвой строки */}
                        {/* <RowUpdateComponent
                            rowId="exampleRowId"
                            initialName="Initial Name"
                            initialValue={42}
                        /> */}
                        {/* Обновление строки  rowId и initialName брать из json*/}
                        {/* <RowDeleteComponent rowId="exampleRowId" /> */}
                        {/* Удаление строки */}
                    </Context.Provider>
                </Box>
            </Box>
        </Box>
    );
}

export default App;
