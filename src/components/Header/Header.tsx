import React from "react";
import { Box } from "@mui/system";
import logoNCC from "../../asset/images/logoNCC.png";
import { Typography } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import UploadFileRoundedIcon from '@mui/icons-material/UploadFileRounded';
import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded';

const Header = () => {
    return (
        <>
            <Box
                sx={{
                    background: "#f44336",
                    height: "70px",
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    boxShadow: "0 2px 10px rgba(0.5,0.5,0.5,0.5)"
                }}
            >
                <Box sx={{ display: "flex", alignItems: "center", px: "25px" }}>
                    <img src={logoNCC} width={20} height={20} alt="logoNCC" />
                    <Typography
                        sx={{ fontSize: "18px", lineHeight: "28px", color: "#fff", pl: '5px' }}
                    >
                        Timesheet
                    </Typography>
                </Box>
                
                <Box sx={{ px: "30px", display: 'flex', color: '#fff', cursor: 'pointer' }}>
                    <UploadFileRoundedIcon />
                    <DescriptionRoundedIcon />
                    <MoreVertIcon />
                </Box>

            </Box>
        </>
    );
};

export default Header;