import { AppBar, Button, Toolbar, Box, Typography, Stack } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import QuizIcon from '@mui/icons-material/Quiz';
import { Link } from 'react-router-dom';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import { useDispatch, useSelector } from 'react-redux';
import { setCities } from '../../modules/cities/citiesSlice';
import { toggleSignIn } from '../../modules/user/userSlice';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';

export const Navbar = () => {

    const dispatch = useDispatch();
    const user = useSelector(state => state.user.registeredUser);
    const isSignedIn = useSelector(state => state.user.isSignedIn);

    const handleHomeBtnClick = () => {
        fetch("https://restcountries.com/v3.1/all")
            .then(res => res.json())
            .then((data) => dispatch(setCities(data)));
    }

    const handleLogOutBtn = () => {
        dispatch(toggleSignIn());
    }
    return (
        <Box sx={{ flexGrow: 1, mt: 10 }}>
            <AppBar position='fixed' sx={{ backgroundColor: "success.light" }}>

                {isSignedIn ?
                    <Toolbar sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                        <Stack>
                            <Button
                                onClick={handleHomeBtnClick}
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

                        <Stack gap="2px" textAlign="center">
                            <Typography fontWeight="900" fontSize="18px">Welcome</Typography>
                            <Typography fontWeight="900" fontSize="18px">
                                {user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1)} {user.lastName.toUpperCase()}
                            </Typography>
                        </Stack>

                        <Stack>
                            <Button component={Link} to="/cities/new"
                                sx={{
                                    display: "flex",
                                    flexDirection: "column"
                                }}
                            >
                                <QuizIcon
                                    sx={{ color: "white", fontSize: '32px' }}
                                />
                                <Typography color="white">City Quiz</Typography>
                            </Button>
                        </Stack>

                        <Stack>
                            <Button component={Link} to="/"
                                sx={{
                                    display: "flex",
                                    flexDirection: "column"
                                }}>
                                <LogoutIcon sx={{ color: "white", fontSize: '32px' }} />
                                <Typography color="white" onClick={handleLogOutBtn}>Log Out</Typography>
                            </Button>
                        </Stack>
                    </Toolbar>
                    :
                    <Toolbar sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                        <Stack textAlign="center">
                            <Button
                                onClick={handleHomeBtnClick}
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

                        <Stack direction="row" alignItems="center">
                            <Stack gap="10px">
                                <Typography fontWeight="900" fontSize="14px">ARE YOU READY?</Typography>
                                <Typography fontWeight="900" fontSize="14px">PLEASE LOGIN TO START</Typography>
                            </Stack>
                            <ArrowCircleRightIcon sx={{marginLeft:{xs:"5px", sm:"10px", md:"35px",lg:"50px"}}}/>
                        </Stack>

                        <Stack textAlign="center">
                            <Button component={Link} to="/user/login"
                                sx={{
                                    display: "flex",
                                    flexDirection: "column"
                                }}>
                                <LoginIcon sx={{ color: "white", fontSize: '32px' }} />
                                <Typography color="white">Log In</Typography>

                            </Button>
                        </Stack>
                    </Toolbar>
                }
            </AppBar>
        </Box>
    )
}