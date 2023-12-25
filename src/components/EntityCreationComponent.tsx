import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../context/context';

const EntityCreationComponent: React.FC = () => {
    // Состояние, чтобы отслеживать, был ли уже загружен ID
    const [isIdLoaded, setIsIdLoaded] = useState<boolean>(false);
    const { setEntityId } = useContext(Context);

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
    return <></>;
};

export default EntityCreationComponent;
