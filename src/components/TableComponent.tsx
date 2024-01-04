import React from 'react';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import RowComponent from './RowComponent';
import { useSelector } from 'react-redux';
import { Row, selectRows } from '../RTK/redusers/firstReduser';
import TableCellComponent from './TableCellComponent';

const RecursiveRow = ({ row }: { row: Row }) => (
    <React.Fragment key={row.id}>
        <RowComponent {...row} key={row.id} child={row.child} parentId={null} />
        {!!row.child?.length &&
            row.child.map((ch: Row) => <RecursiveRow key={ch.id} row={ch} />)}
    </React.Fragment>
);

const TableComponent = () => {
    const rows = useSelector(selectRows);

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
                {rows.map((row: Row) => (
                    <RecursiveRow key={row.id} row={row} />
                ))}
            </TableBody>
        </Table>
    );
};

export default TableComponent;
