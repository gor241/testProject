import React, { useContext } from 'react';
import { Context } from '../context/context';

interface RowDeleteComponentProps {
    rowId: string;
}

const RowDeleteComponent: React.FC<RowDeleteComponentProps> = ({ rowId }) => {
    const { entityId } = useContext(Context);

    const handleDeleteRow = async () => {
        try {
            const response = await fetch(
                `http://185.244.172.108:8081/v1/outlay-rows/entity/${entityId}/row/${rowId}/delete`,
                {
                    method: 'DELETE',
                }
            );

            if (!response.ok) {
                throw new Error('Failed to delete row');
            }

            // Обновить данные после успешного удаления строки
        } catch (error) {
            console.error('Error deleting row:', error);
        }
    };

    return (
        <div>
            <h2>Delete Row:</h2>
            <button onClick={handleDeleteRow}>Delete Row</button>
        </div>
    );
};

export default RowDeleteComponent;
