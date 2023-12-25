import React, { useState, useContext } from 'react';
import { Context } from '../context/context';

interface RowUpdateComponentProps {
    rowId: string;
    initialName: string;
    initialValue: number;
}

const RowUpdateComponent: React.FC<RowUpdateComponentProps> = ({
    rowId,
    initialName,
    initialValue,
}) => {
    const [name, setName] = useState<string>(initialName);
    const [value, setValue] = useState<number>(initialValue);

    // Перенести в контекст
    const { entityId} = useContext(Context);

    const handleUpdateRow = async () => {
        try {
            const response = await fetch(
                `http://185.244.172.108:8081/v1/outlay-rows/entity/${entityId}/row/${rowId}/update`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name,
                        value,
                    }),
                }
            );

            if (!response.ok) {
                throw new Error('Failed to update row');
            }

            // Обновите данные после успешного обновления строки
            // Зависит от того, как вы управляете данными в DataDisplayComponent
        } catch (error) {
            console.error('Error updating row:', error);
        }
    };

    return (
        <div>
            <h2>Update Row:</h2>
            <label>
                Name:
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </label>
            <label>
                Value:
                <input
                    type="number"
                    value={value}
                    onChange={(e) => setValue(Number(e.target.value))}
                />
            </label>
            <button onClick={handleUpdateRow}>Update Row</button>
        </div>
    );
};

export default RowUpdateComponent;
