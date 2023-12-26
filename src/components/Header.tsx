import { Box, Typography } from '@mui/material';
import appIcon from '../img/iconApp.svg';
import arrowIcon from '../img/iconArrow.svg';
import whiteIcon from '../img/iconWhite.svg';
import React from 'react';

const Header = React.memo(() => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '88px',
                fontFamily: 'roboto',
            }}
        >
            <Box
                sx={{
                    borderBottom: '1px solid #414144',
                    height: '44px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '20px',
                    padding: '0px 20px',
                }}
            >
                <Box>
                    <img src={appIcon} alt="appIcon" />
                </Box>
                <Box>
                    <img src={arrowIcon} alt="arrowIcon" />
                </Box>
                <Box
                    sx={{
                        borderBottom: '2px solid white',
                        padding: '8px 0px',
                    }}
                >
                    <Typography sx={{ color: 'white' }} variant="body1">
                        Просмотр
                    </Typography>
                </Box>
                <Box>
                    <Typography sx={{ color: '#A1A1AA' }} variant="body1">
                        Управление
                    </Typography>
                </Box>
            </Box>
            <Box
                sx={{
                    height: '44px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '20px',
                    borderBottom: '1px solid #414144',
                }}
            >
                <Box
                    sx={{
                        width: '234px',
                        height: '44px',
                        borderRight: '1px solid #414144',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-around',
                    }}
                >
                    <Box
                        sx={{
                            color: '#A1A1AA',
                        }}
                    >
                        <Box
                            sx={{
                                fontSize: '14px',
                                lineHeight: '16px',
                                mb: '2px',
                            }}
                        >
                            Название проекта
                        </Box>
                        <Box sx={{ fontSize: '10px', lineHeight: '11px' }}>
                            Аббревиатура
                        </Box>
                    </Box>
                    <Box>
                        <img src={whiteIcon} alt="whiteIcon" />
                    </Box>
                </Box>
                <Box
                    sx={{
                        width: '332px',
                        height: '44px',
                        borderRight: '1px solid #414144',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <Typography variant="h6">
                        Строительно-монтажные работы
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
});

export default Header;
