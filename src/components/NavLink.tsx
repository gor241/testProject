import { Box } from '@mui/material';
import ItemMenu from './ItemMenu';
import React from 'react';

const NavLink = React.memo(() => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <ItemMenu text="По проекту" />
            <ItemMenu text="Объекты" />
            <ItemMenu text="РД" />
            <ItemMenu text="СМР" active={true}/>
            <ItemMenu text="График" />
            <ItemMenu text="МиМ" />
            <ItemMenu text="Рабочие" />
            <ItemMenu text="Капвложения" />
            <ItemMenu text="Бюджет" />
            <ItemMenu text="Финансирование" />
            <ItemMenu text="Панорамы" />
            <ItemMenu text="Камеры" />
            <ItemMenu text="Поручения" />
            <ItemMenu text="Контрагенты" />
        </Box>
    );
});

export default NavLink;
