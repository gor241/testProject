import React, { useState, useContext } from 'react';
import { Context } from '../context/context';

interface RowCreationComponentProps {
  parentId: string | null;
}

const RowCreationComponent: React.FC<RowCreationComponentProps> = ({ parentId }) => {
  const [name, setName] = useState<string>('');
  const [value, setValue] = useState<number>(0);
  const { entityId } = useContext(Context);

  const handleCreateRow = async () => {
    try {
      const response = await fetch(`http://185.244.172.108:8081/v1/outlay-rows/entity/${entityId}/row/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          parentId,
          name,
          value,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create row');
      }

      // Обновите данные после успешного создания строки
      // Зависит от того, как вы управляете данными в DataDisplayComponent
    } catch (error) {
      console.error('Error creating row:', error);
    }
  };

  return (
    <div>
      <h2>Create Row:</h2>
      <label>
        Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <label>
        Value:
        <input type="number" value={value} onChange={(e) => setValue(Number(e.target.value))} />
      </label>
      <button onClick={handleCreateRow}>Create Row</button>
    </div>
  );
};

export default RowCreationComponent;