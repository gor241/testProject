import React from 'react';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import RowComponent from './RowComponent';
import { useSelector } from 'react-redux';
import { selectRows } from '../RTK/redusers/firstReduser';
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
                {rows.map((row: any) => (
                    <React.Fragment key={row.id}>
                        <RowComponent
                            {...row}
                            classEl={row.classEl}
                            key={row.id}
                            idNum={row.id}
                            child={row.child}
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
