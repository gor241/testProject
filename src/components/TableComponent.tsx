import React, { useContext, useEffect } from 'react';
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
    setRows,
    updateRow,
} from '../RTK/redusers/firstReduser';
import TableCellComponent from './TableCellComponent';

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
    child: ItemComponentProps[];
    parentId: number;
}

const TableComponent = () => {
    const { entityId } = useContext(Context);
    const dispatch = useDispatch();
    const rows = useSelector(selectRows);

    // useEffect(() => {
    //     if (rows.length > 0) {
    //         const updatedRows = rows.map((row) => {
    //             if (row.child?.length > 0) {
    //                 const newRow = {
    //                     ...row,
    //                     classEl:
    //                         row.classEl === 'child' ? 'child parent' : 'parent',
    //                 };

    //                 newRow.child.forEach((child: any) => {
    //                     const parentRow = rows.find((el) => el.id === child.id);
    //                     if (parentRow) {
    //                         const newParentRow = {
    //                             ...parentRow,
    //                             classEl: 'child',
    //                         };
    //                         rows[rows.indexOf(parentRow)] = newParentRow;
    //                     }
    //                 });

    //                 return newRow;
    //             } else {
    //                 return { ...row, classEl: '' };
    //             }
    //         });

    //         dispatch(setRows([...updatedRows]));
    //     }
    // }, []);

    console.log(rows);

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

    const handleAddRow = (obj: ItemComponentProps, parentId: number) => {
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
                dispatch(addRow({ parentId, row: data.current }));
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
                    <TableCellComponent text={'Уровень'} />
                    <TableCellComponent text={'Наименование работ'} />
                    <TableCellComponent text={'Основная з/п'} />
                    <TableCellComponent text={'Оборудование'} />
                    <TableCellComponent text={'Накладные расходы'} />
                    <TableCellComponent text={'Сметная прибыль'} />
                </TableRow>
            </TableHead>
            <TableBody>
                {rows.map((row: any) => (
                    <React.Fragment key={row.id}>
                        <RowComponent
                            {...row}
                            classEl={row.classEl}
                            key={row.id}
                            idNum={row.id}
                            child={row.child}
                            onAddRow={handleAddRow}
                            onDeleteRow={handleDeleteRow}
                            onUpdateRow={handleUpdateRow}
                            isEddit={row.isEddit}
                        />
                        {!!row.child?.length &&
                            row.child.map((ch: any) => (
                                <RowComponent
                                    {...ch}
                                    classEl={ch.classEl}
                                    key={ch.id}
                                    idNum={ch.id}
                                    child={ch.child}
                                    onAddRow={handleAddRow}
                                    onDeleteRow={handleDeleteRow}
                                    onUpdateRow={handleUpdateRow}
                                    isEddit={ch.isEddit}
                                    parentId={row.id}
                                />
                            ))}
                    </React.Fragment>
                ))}
            </TableBody>
        </Table>
    );
};

export default TableComponent;
