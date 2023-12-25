import { Box } from '@mui/material';
import icon from '../img/iconQuad.svg';

const NavLink = () => {
    return (
        <Box sx={{}}>
            <Box sx={{ display: 'flex' }}>
                <Box>
                    <img src={icon} alt="icon" />
                </Box>
                <Box>По проекту</Box>
            </Box>
        </Box>
    );
};

export default NavLink;
