import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import api from '../../api/api';

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
    classEl?: string;
}

interface RowsState {
    rows: Row[];
}

interface AddRowPayload {
    parentId: number;
    row: Row;
}

export const deleteRowAsync = createAsyncThunk(
    'rows/deleteRow',
    async (rowId: number) => {
        const response = await api.deleteRow(rowId);
        return response.changed;
    }
);

export const addRowAsync = createAsyncThunk(
    'rows/addRow',
    async ({ parentId, row }: AddRowPayload) => {
        const response = await api.addRow(parentId, row);
        return response;
    }
);

export const updateRowAsync = createAsyncThunk(
    'rows/updateRow',
    async ({ rowId, updatedRow }: { rowId: number; updatedRow: Row }) => {
        const response = await api.updateRow(rowId, updatedRow);
        return response;
    }
);

const initialState: RowsState = {
    rows: [],
};

const firstSlice = createSlice({
    name: 'firstSlice',
    initialState,
    reducers: {
        setRows: (state, action: PayloadAction<Row[]>) => {
            state.rows = action.payload;
        },
        toggleIsEdit: (state, action: PayloadAction<number>) => {
            const { payload: id } = action;
            const targetRow = state.rows.find((row) => row.id === id);
            if (targetRow) {
                targetRow.isEddit = !targetRow.isEddit;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(deleteRowAsync.fulfilled, (state, action) => {
                // Обработка успешного удаления строки
                const deletedRows = action.payload;
                state.rows = state.rows.filter(
                    (row) =>
                        !deletedRows.some(
                            (deletedRow: Row) => deletedRow.id === row.id
                        )
                );
            })
            .addCase(addRowAsync.fulfilled, (state, action) => {
                // Обработка успешного добавления строки
                const { parentId, row } = action.payload;
                const parentRow = state.rows.find((r) => r.id === parentId);
                if (parentRow) {
                    if (!parentRow.child) {
                        parentRow.child = [];
                    }
                    parentRow.child.push({
                        ...row,
                        parentId,
                        isEddit: true,
                        child: [],
                    });
                } else {
                    state.rows.push({
                        ...row,
                        isEddit: true,
                        child: [],
                    });
                }
            })
            .addCase(updateRowAsync.fulfilled, (state, action) => {
                // Обработка успешного обновления строки
                const { rowId, updatedRow } = action.payload;
                const index = state.rows.findIndex((row) => row.id === rowId);
                if (index !== -1) {
                    state.rows[index] = updatedRow;
                    state.rows[index].isEddit = false;
                }
            });
    },
});

export const { setRows, toggleIsEdit } = firstSlice.actions;
export default firstSlice.reducer;

export const selectRows = (state: RootState) => state.firstSlice.rows;
