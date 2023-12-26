import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface Row {
    id: number;
    rowName: string;
    total: number;
    salary: number;
    mimExploitation: number;
    machineOperatorSalary: number;
    materials: number;
    mainCosts: number;
    supportCosts: number;
    equipmentCosts: number;
    overheads: number;
    estimatedProfit: number;
    child?: any;
}

interface RowsState {
    rows: Row[];
}

const initialState: RowsState = {
    rows: [],
};

// Создайте слайс
const firstSlice = createSlice({
    name: 'firstSlice', // Имя слайса
    initialState,
    reducers: {
        setRows: (state, action: PayloadAction<Row[]>) => {
            state.rows = action.payload;
        },
        addRow: (state, action: PayloadAction<Row>) => {
            state.rows.push(action.payload);
        },
        updateRow: (
            state,
            action: PayloadAction<{ id: number; updatedRow: Row }>
        ) => {
            const index = state.rows.findIndex(
                (row) => row.id === action.payload.id
            );
            if (index !== -1) {
                state.rows[index] = action.payload.updatedRow;
            }
        },
        deleteRow: (state, action: PayloadAction<number>) => {
            state.rows = state.rows.filter((row) => row.id !== action.payload);
        },
    },
});

export const { setRows, addRow, updateRow, deleteRow } = firstSlice.actions;
export default firstSlice.reducer;

export const selectRows = (state: RootState) => state.firstSlice.rows;
