import React, { useContext, useEffect, useState } from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import AddIcon from '../img/IconAdd.svg';
import DeleteIcon from '../img/iconDel.svg';
import { Box, TextField, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { ItemComponentProps } from './TableComponent';
import { Context } from '../context/context';

interface ItemMenuComponentProps extends Partial<ItemComponentProps> {
    onAddRow: (obj: ItemComponentProps) => void;
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
    equipmentCosts,
    estimatedProfit,
    overheads,
    rowName,
    salary,
    onAddRow,
    onDeleteRow,
    onUpdateRow,
}) => {
    const { rowData } = useContext(Context);
    const [isEditing, setIsEditing] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [editedData, setEditedData] = useState({
        equipmentCosts: 0,
        estimatedProfit: 0,
        machineOperatorSalary: 0,
        mainCosts: 0,
        materials: 0,
        mimExploitation: 0,
        overheads: 0,
        rowName: 'string',
        salary: 0,
        supportCosts: 0,
    });

    const handleAddRow = () => {
        onAddRow({ ...editedData });
    };

    const handleDeleteRow = () => {
        const id = rowData.find(
            (el: ItemComponentProps) => el.rowName === editedData.rowName
        )?.id;
        if (id) {
            onDeleteRow(id);
        } else {
            console.error('ID not found for deletion');
        }
    };

    const handleDoubleClick = () => {
        setIsEditing(true);
    };

    useEffect(() => {
        const handleKeyDown = (e: any) => {
            const id = rowData.find(
                (el: ItemComponentProps) => el.rowName === editedData.rowName
            )?.id;
            if (e.key === 'Enter' && id) {
                // Отправить данные на сервер
                setIsEditing(false);
                onUpdateRow(id, { ...editedData });
            }
        };
        // Добавляем обработчик события на уровне документа
        document.addEventListener('keydown', handleKeyDown);
        // Убираем обработчик при размонтировании компонента
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    const handleInputChange =
        (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
            setEditedData((prevData) => ({
                ...prevData,
                [field]: event.target.value,
            }));
        };

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
                {isEditing ? (
                    <TextField
                        value={editedData.rowName}
                        onChange={handleInputChange('rowName')}
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
                {isEditing ? (
                    <TextField
                        value={editedData.equipmentCosts}
                        onChange={handleInputChange('equipmentCosts')}
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
                {isEditing ? (
                    <TextField
                        value={editedData.salary}
                        onChange={handleInputChange('salary')}
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
                {isEditing ? (
                    <TextField
                        value={editedData.overheads}
                        onChange={handleInputChange('overheads')}
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
                {isEditing ? (
                    <TextField
                        value={editedData.estimatedProfit}
                        onChange={handleInputChange('estimatedProfit')}
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
