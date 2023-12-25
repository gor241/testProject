import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../context/context';
import LevelIconComponent from './LevelIconComponent';

const DataDisplayComponent = () => {
    const [rowData, setRowData] = useState<any[]>([]);
    const { entityId } = useContext(Context);

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
        if (entityId) {
            fetchData();
        }
    }, [entityId]);

    return (
        <div>
      <h2>Row Data:</h2>
      <ul>
        {rowData.map((row) => (
          <li key={row.id}>
            {/* Отображаем данные в виде списка, замените на свой код визуализации данных */}
            {row.name}: {row.value}
            {/* Добавьте интеграцию LevelIconComponent здесь */}
            <LevelIconComponent isEditing={row.isEditing}  />
          </li>
        ))}
      </ul>
    </div>
    );
};

export default DataDisplayComponent;
