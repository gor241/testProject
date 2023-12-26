import { useContext, useState } from 'react';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import RowComponent from './RowComponent';
import { Context } from '../context/context';

export interface ItemComponentProps {
    equipmentCosts: number;
    estimatedProfit: number;
    machineOperatorSalary: number;
    mainCosts: number;
    materials: number;
    mimExploitation: number;
    overheads: number;
    rowName: string;
    salary: number;
    supportCosts: number;
}

const TableComponent = () => {
    const { entityId, handleSetState, rowData } = useContext(Context);

    // Логика добавления новой строки с учетом уровня вложенности
    const handleAddRow = async (obj: ItemComponentProps) => {
        try {
            const response = await fetch(
                `http://185.244.172.108:8081/v1/outlay-rows/entity/${entityId}/row/create`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ ...obj }),
                }
            );
            if (!response.ok) {
                throw new Error('Failed to server');
            }
            const json = await response.json();
            handleSetState([...rowData, json.current]);
        } catch (error) {
            console.error('Error creating:', error);
        }
    };

    const handleUpdateRow = async (rowId: string, obj: ItemComponentProps) => {
        try {
            const response = await fetch(
                `http://185.244.172.108:8081/v1/outlay-rows/entity/${entityId}/row/${rowId}/update`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ ...obj }),
                }
            );
            if (!response.ok) {
                throw new Error('Failed to update row');
            }
            const json = await response.json();
            handleSetState(
                [...rowData].map((el) => (el.id !== rowId ? json.current : el))
            );
        } catch (error) {
            console.error('Error updating row:', error);
        }
    };

    const handleDeleteRow = async (rowId: string) => {
        try {
            const response = await fetch(
                `http://185.244.172.108:8081/v1/outlay-rows/entity/${entityId}/row/${rowId}/delete`,
                {
                    method: 'DELETE',
                }
            );
            if (!response.ok) {
                throw new Error('Failed to server');
            }
            handleSetState(rowData.filter((el: any) => el.id !== rowId));
            // Обновить данные после успешного удаления строки
        } catch (error) {
            console.error('Error deleting row:', error);
        }
    };

    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell
                        sx={{
                            color: '#A1A1AA',
                            borderBottom: '1px solid #414144',
                        }}
                    >
                        Уровень
                    </TableCell>
                    <TableCell
                        sx={{
                            color: '#A1A1AA',
                            borderBottom: '1px solid #414144',
                        }}
                    >
                        Наименование работ
                    </TableCell>
                    <TableCell
                        sx={{
                            color: '#A1A1AA',
                            borderBottom: '1px solid #414144',
                        }}
                    >
                        Основная з/п
                    </TableCell>
                    <TableCell
                        sx={{
                            color: '#A1A1AA',
                            borderBottom: '1px solid #414144',
                        }}
                    >
                        Оборудование
                    </TableCell>
                    <TableCell
                        sx={{
                            color: '#A1A1AA',
                            borderBottom: '1px solid #414144',
                        }}
                    >
                        Накладные расходы
                    </TableCell>
                    <TableCell
                        sx={{
                            color: '#A1A1AA',
                            borderBottom: '1px solid #414144',
                        }}
                    >
                        Сметная прибыль
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {rowData.map((row: any) => (
                    <RowComponent
                        {...row}
                        onAddRow={handleAddRow}
                        onDeleteRow={handleDeleteRow}
                        onUpdateRow={handleUpdateRow}
                    />
                ))}
            </TableBody>
        </Table>
    );
};

export default TableComponent;
