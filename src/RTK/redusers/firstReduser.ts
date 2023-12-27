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
    isEddit?: boolean;
    parentId?: number;
    classEl: string;
}

interface RowsState {
    rows: Row[];
}

const initialState: RowsState = {
    rows: [],
};

interface onAddRow {
    parentId: number;
    row: Row;
}

// Создайте слайс
const firstSlice = createSlice({
    name: 'firstSlice',
    initialState,
    reducers: {
        setRows: (state, action: PayloadAction<Row[]>) => {
            state.rows = action.payload;
        },
        addRow: (state, action: PayloadAction<onAddRow>) => {
            const { row, parentId } = action.payload;
            const parentRow = state.rows.find((row) => row.id === parentId);
            if (parentRow) {
                if (!parentRow.child) {
                    parentRow.child = [];
                }
                parentRow.child.push({
                    ...row,
                    parentId,
                    isEddit: true,
                    child: [],
                    classEl: '',
                });
            } else {
                state.rows.push({
                    ...row,
                    isEddit: true,
                    child: [],
                    classEl: '',
                });
            }
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
                state.rows[index].isEddit = false;
            }
        },
        deleteRow: (state, action: PayloadAction<number>) => {
            state.rows = state.rows.filter((row) => row.id !== action.payload);
        },
        toggleIsEdit: (state, action: PayloadAction<number>) => {
            const { payload: id } = action;
            const targetRow = state.rows.find((row) => row.id === id);
            if (targetRow) {
                targetRow.isEddit = !targetRow.isEddit;
            }
        },
    },
});

export const { setRows, addRow, updateRow, deleteRow, toggleIsEdit } =
    firstSlice.actions;
export default firstSlice.reducer;

export const selectRows = (state: RootState) => state.firstSlice.rows;
