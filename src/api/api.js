const BASE_URL = 'http://185.244.172.108:8081/v1/outlay-rows/entity';

const api = {
    deleteRow: async (rowId) => {
        const response = await fetch(`${BASE_URL}/row/${rowId}/delete`, { method: 'DELETE' });
        if (!response.ok) {
            throw new Error(`Error deleting row: ${response.statusText}`);
        }
        return response.json();
    },

    addRow: async (parentId, row) => {
        const response = await fetch(`${BASE_URL}/row/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(row),
        });

        if (!response.ok) {
            throw new Error(`Error adding row: ${response.statusText}`);
        }

        return response.json();
    },

    updateRow: async (rowId, updatedRow) => {
        const response = await fetch(`${BASE_URL}/row/${rowId}/update`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedRow),
        });

        if (!response.ok) {
            throw new Error(`Error updating row: ${response.statusText}`);
        }

        return response.json();
    },
};

export default api;