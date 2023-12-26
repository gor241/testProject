import { Box } from '@mui/material';
import icon from '../img/iconQuad.svg';
import React from 'react';

interface ItemMenuComponentProps {
    text: string;
    active?: boolean;
}

const ItemMenu: React.FC<ItemMenuComponentProps> = React.memo(
    ({ text, active = false }) => {
        return (
            <Box
                sx={
                    active
                        ? {
                            display: 'flex',
                            alignItems: 'center',
                            gap: '15px',
                            color: 'white',
                            fontFamily: 'roboto',
                            background: '#A1A1AA',
                            padding: '5px 20px',
                        }
                        : {
                            display: 'flex',
                            alignItems: 'center',
                            gap: '15px',
                            color: 'white',
                            fontFamily: 'roboto',
                            padding: '5px 20px',
                        }
                }
            >
                <Box>
                    <img src={icon} alt="icon" />
                </Box>
                <Box sx={{ fontSize: '14px', lineHeight: '1.2' }}>{text}</Box>
            </Box>
        );
    }
);

export default ItemMenu;
