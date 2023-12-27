import React, { useContext, useEffect, useState } from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import AddIcon from '../img/IconAdd.svg';
import DeleteIcon from '../img/iconDel.svg';
import { Box, TextField, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { ItemComponentProps } from './TableComponent';
import { useDispatch } from 'react-redux';
import { deleteRow, toggleIsEdit } from '../RTK/redusers/firstReduser';

interface ItemMenuComponentProps extends Partial<ItemComponentProps> {
    child: [] | ItemComponentProps[];
    classEl: string;
    isEddit?: boolean;
    parentId: number;
    idNum: number;
    onAddRow: (obj: ItemComponentProps, parentId: number) => void;
    onDeleteRow: (rowId: string) => void;
    onUpdateRow: (rowId: string, obj: ItemComponentProps) => void;
}

const AnimatedIconButton = styled(IconButton)(({ theme }) => ({
    color: 'white',
    position: 'relative',
    transition: 'color 0.3s',
    '&:hover': {
        color: '#ff4081',
    },
}));

const RowComponent: React.FC<ItemMenuComponentProps> = ({
    parentId,
    isEddit = false,
    idNum,
    classEl,
    equipmentCosts,
    estimatedProfit,
    overheads,
    rowName,
    salary,
    onAddRow,
    onDeleteRow,
    onUpdateRow,
}) => {
    const dispatch = useDispatch();

    const [isHovered, setIsHovered] = useState(false);
    const [editedData, setEditedData] = useState<ItemComponentProps>({
        equipmentCosts: equipmentCosts || 0,
        id: 0,
        total: 0,
        estimatedProfit: estimatedProfit || 0,
        machineOperatorSalary: 0,
        mainCosts: 0,
        materials: 0,
        mimExploitation: 0,
        overheads: overheads || 0,
        rowName: rowName || '',
        salary: salary || 0,
        supportCosts: 0,
        child: [],
        parentId: parentId || 0,
    });

    // Установка editedData при изменении свойств строки
    useEffect(() => {
        setEditedData((prevData) => ({
            ...prevData,
            equipmentCosts: equipmentCosts || 0,
            estimatedProfit: estimatedProfit || 0,
            overheads: overheads || 0,
            rowName: rowName || '',
            salary: salary || 0,
        }));
    }, [equipmentCosts, estimatedProfit, overheads, rowName, salary]);

    const handleAddRow = () => {
        onAddRow(
            {
                equipmentCosts: 0,
                id: 0,
                total: 0,
                estimatedProfit: 0,
                machineOperatorSalary: 0,
                mainCosts: 0,
                materials: 0,
                mimExploitation: 0,
                overheads: 0,
                rowName: 'Новая строка', // Установите значение по умолчанию
                salary: 0,
                supportCosts: 0,
                parentId: idNum,
                child: [],
            },
            idNum
        );
    };

    const handleDeleteRow = () => {
        onDeleteRow(String(idNum));
        dispatch(deleteRow(idNum));
    };

    const handleDoubleClick = () => {
        dispatch(toggleIsEdit(idNum));
    };

    const handleInputChange =
        (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
            setEditedData((prevData) => ({
                ...prevData,
                [field]: event.target.value,
            }));
        };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            console.log('key down', e.key);
            // Отправить данные на сервер
            onUpdateRow(String(idNum), { ...editedData });
            dispatch(toggleIsEdit(idNum));
        }
    };
    // const cls = () => {
    //     let res = '';
    //     if (parentId) {
    //         res += 'child';
    //     }
    //     if (child.length > 0) {
    //         res += 'parent';
    //     }
    //     return '';
    // };

    return (
        <TableRow>
            <TableCell
                sx={{
                    color: 'white',
                    position: 'relative',
                    borderBottom: '1px solid #414144',
                    width: '110px',
                    height: '40px',
                }}
                className={classEl}
            >
                <Box
                    sx={{
                        color: 'white',
                        position: 'absolute',
                        top: '20px',
                        left: '20px',
                    }}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {isHovered ? (
                        <>
                            <AnimatedIconButton
                                onClick={handleAddRow}
                                sx={{ cursor: 'pointer' }}
                            >
                                <img src={AddIcon} alt="AddIcon" />
                            </AnimatedIconButton>
                            <AnimatedIconButton
                                sx={{ cursor: 'pointer' }}
                                onClick={handleDeleteRow}
                            >
                                <img src={DeleteIcon} alt="DeleteIcon" />
                            </AnimatedIconButton>
                        </>
                    ) : (
                        <AnimatedIconButton
                            sx={{ cursor: 'pointer' }}
                            onClick={handleAddRow}
                        >
                            <img src={AddIcon} alt="AddIcon" />
                        </AnimatedIconButton>
                    )}
                </Box>
            </TableCell>
            <TableCell
                onDoubleClick={handleDoubleClick}
                sx={{
                    color: 'white',
                    borderBottom: '1px solid #414144',
                    cursor: 'pointer',
                    width: '300px',
                    height: '40px',
                }}
            >
                {isEddit ? (
                    <TextField
                        value={editedData.rowName}
                        onChange={handleInputChange('rowName')}
                        onKeyDown={handleKeyDown}
                        size="small"
                        InputProps={{
                            style: {
                                color: '#71717A',
                                maxHeight: '36px',
                                overflow: 'hidden', // Цвет текста в TextField
                            },
                        }}
                    />
                ) : (
                    <Typography sx={{ pl: '15px' }}>{rowName}</Typography>
                )}
            </TableCell>
            <TableCell
                onDoubleClick={handleDoubleClick}
                sx={{
                    color: 'white',
                    borderBottom: '1px solid #414144',
                    cursor: 'pointer',
                    width: '210px',
                    height: '40px',
                }}
            >
                {isEddit ? (
                    <TextField
                        value={editedData.equipmentCosts}
                        onChange={handleInputChange('equipmentCosts')}
                        onKeyDown={handleKeyDown}
                        size="small"
                        InputProps={{
                            style: {
                                color: '#71717A',
                                maxHeight: '36px',
                                overflow: 'hidden', // Цвет текста в TextField
                            },
                        }}
                    />
                ) : (
                    <Typography sx={{ pl: '15px' }}>
                        {equipmentCosts}
                    </Typography>
                )}
            </TableCell>
            <TableCell
                onDoubleClick={handleDoubleClick}
                sx={{
                    color: 'white',
                    borderBottom: '1px solid #414144',
                    cursor: 'pointer',
                    width: '210px',
                    height: '40px',
                }}
            >
                {isEddit ? (
                    <TextField
                        value={editedData.salary}
                        onChange={handleInputChange('salary')}
                        onKeyDown={handleKeyDown}
                        size="small"
                        InputProps={{
                            style: {
                                color: '#71717A',
                                maxHeight: '36px',
                                overflow: 'hidden', // Цвет текста в TextField
                            },
                        }}
                    />
                ) : (
                    <Typography sx={{ pl: '15px' }}>{salary}</Typography>
                )}
            </TableCell>
            <TableCell
                onDoubleClick={handleDoubleClick}
                sx={{
                    color: 'white',
                    borderBottom: '1px solid #414144',
                    cursor: 'pointer',
                    width: '210px',
                    height: '40px',
                }}
            >
                {isEddit ? (
                    <TextField
                        value={editedData.overheads}
                        onChange={handleInputChange('overheads')}
                        onKeyDown={handleKeyDown}
                        size="small"
                        InputProps={{
                            style: {
                                color: '#71717A',
                                maxHeight: '36px',
                                overflow: 'hidden', // Цвет текста в TextField
                            },
                        }}
                    />
                ) : (
                    <Typography sx={{ pl: '15px' }}>{overheads}</Typography>
                )}
            </TableCell>
            <TableCell
                onDoubleClick={handleDoubleClick}
                sx={{
                    color: 'white',
                    borderBottom: '1px solid #414144',
                    cursor: 'pointer',
                    width: '210px',
                    height: '40px',
                }}
            >
                {isEddit ? (
                    <TextField
                        value={editedData.estimatedProfit}
                        onChange={handleInputChange('estimatedProfit')}
                        onKeyDown={handleKeyDown}
                        InputProps={{
                            style: {
                                color: '#71717A',
                                maxHeight: '36px',
                                overflow: 'hidden', // Цвет текста в TextField
                            },
                        }}
                        size="small"
                    />
                ) : (
                    <Typography sx={{ pl: '15px' }}>
                        {estimatedProfit}
                    </Typography>
                )}
            </TableCell>
        </TableRow>
    );
};

export default RowComponent;
