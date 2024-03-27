import { AppBar, Button, Toolbar, Box, Typography, Stack } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import { Link } from 'react-router-dom';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';


export const Navbar = () => {
    return (
        <Box sx={{ flexGrow: 1, mt: 10 }}>
            <AppBar position='fixed' sx={{ backgroundColor: "success.light" }}>
                <Toolbar sx={{display:"flex", flexDirection: "row", justifyContent: "space-between"}}>
                    <Stack>
                        <Button
                            component={Link}
                            to="/"
                            sx={{
                                display: "flex",
                                flexDirection: "column"
                            }}
                        >
                            <HomeIcon
                                sx={{ color: "white", fontSize: '32px' }}
                            />
                            <Typography color="white">Home Page</Typography>
                        </Button>
                    </Stack>

                    <Stack>
                        <Button component={Link} to="/cities/new"
                            sx={{
                                display: "flex",
                                flexDirection: "column"
                            }}
                        >
                            <LocationCityIcon
                                sx={{ color: "white", fontSize: '32px' }}
                            />
                            <Typography color="white">Add Your City</Typography>
                        </Button>
                    </Stack>

                    <Stack sx={{display:"flex", flexDirection: "row", gap: 5}}>
                        <Button component={Link} to="/user/login"
                            sx={{
                                display: "flex",
                                flexDirection: "column"
                            }}>
                            <LoginIcon sx={{ color: "white", fontSize: '32px' }} />
                            <Typography color="white">Log In</Typography>

                        </Button>

                        <Button component={Link} to="/"
                            sx={{
                                display: "flex",
                                flexDirection: "column"
                            }}>
                            <LogoutIcon sx={{ color: "white", fontSize: '32px' }} />
                            <Typography color="white">Log Out</Typography>

                        </Button>
                    </Stack>
                </Toolbar>

            </AppBar>
        </Box>
    )
}