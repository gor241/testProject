import { useContext } from 'react';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import RowComponent from './RowComponent';
import { Context } from '../context/context';
import { useDispatch, useSelector } from 'react-redux';
import {
    addRow,
    deleteRow,
    selectRows,
    updateRow,
} from '../RTK/redusers/firstReduser';

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
    id: number;
    total: number;
}

const TableComponent = () => {
    const { entityId } = useContext(Context);
    const dispatch = useDispatch();
    const rows = useSelector(selectRows);

    const handleDeleteRow = (rowId: number) => {
        // Замените fetch на ваш запрос к серверу для удаления строки
        fetch(
            `http://185.244.172.108:8081/v1/outlay-rows/entity/${entityId}/row/${rowId}/delete`,
            { method: 'DELETE' }
        )
            .then((response) => {
                if (response.ok) {
                    dispatch(deleteRow(rowId));
                } else {
                    console.error('Error deleting row:', response.statusText);
                }
            })
            .catch((error) => console.error('Error deleting row:', error));
    };

    const handleAddRow = (obj: ItemComponentProps) => {
        // Замените fetch на ваш запрос к серверу для удаления строки
        fetch(
            `http://185.244.172.108:8081/v1/outlay-rows/entity/${entityId}/row/create`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...obj }),
            }
        )
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error(`Error adding row: ${response.statusText}`);
                }
            })
            .then((data) => {
                dispatch(addRow(data.current));
            })
            .catch((error) => console.error('Error added row:', error));
    };

    const handleUpdateRow = (rowId: string, obj: ItemComponentProps) => {
        // Замените fetch на ваш запрос к серверу для удаления строки
        fetch(
            `http://185.244.172.108:8081/v1/outlay-rows/entity/${entityId}/row/${rowId}/update`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...obj }),
            }
        )
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error(
                        `Error updating row: ${response.statusText}`
                    );
                }
            })
            .then((data) => {
                dispatch(updateRow({ id: +rowId, updatedRow: data.current }));
            })
            .catch((error) => console.error('Error added row:', error));
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
                {rows.map((row: any) => (
                    <RowComponent
                        {...row}
                        key={row.id}
                        idNum={row.id}
                        onAddRow={handleAddRow}
                        onDeleteRow={handleDeleteRow}
                        onUpdateRow={handleUpdateRow}
                        isEddit={row.isEddit ? row.isEddit : false}
                    />
                ))}
            </TableBody>
        </Table>
    );
};

export default TableComponent;
