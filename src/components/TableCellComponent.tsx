import { TableCell } from '@mui/material';
import React from 'react';

interface ItemTableCelltProps {
    text: string;
}

const TableCellComponent: React.FC<ItemTableCelltProps> = React.memo(
    ({ text }) => {
        return (
            <TableCell
                sx={{
                    color: '#A1A1AA',
                    borderBottom: '1px solid #414144',
                }}
            >
                {text}
            </TableCell>
        );
    }
);

export default TableCellComponent;
