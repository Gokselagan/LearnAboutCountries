import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Box, Button, Checkbox, Container, FormControl, FormControlLabel, FormHelperText, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField, Typography } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { updateUser, toggleSignIn } from '../userSlice';

export const LogIn = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const newUser = useSelector(state=>state.user.newUser);

    const existingFirstName = newUser.firstName;
    const existingLastName = newUser.lastName;
    const existingEmail = newUser.email;
    const existingPassword = newUser.password;

    console.log("newuser", newUser.firstName);

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const onSubmit = (data) => {
        dispatch(updateUser(data));
        dispatch(toggleSignIn());
        navigate("/");
    }

    const handleClickShowPassword = () => setShowPassword(!showPassword);

    return (
        <Container component="main" maxWidth="xs">
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }} >

                <Avatar sx={{ marginTop: 8, bgcolor: "primary.main" }}>
                    <LockOutlinedIcon />
                </Avatar>

                <Typography component="h1" variant='h5'>Log In</Typography>

                <Box component="form" noValidate sx={{ mt: 3 }} onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                error={errors.firstName}
                                helperText={errors.firstName ? errors.firstName.message : ""}
                                {...register("firstName",{
                                    required: "User Last First Name is required",
                                    validate:(value)=>{
                                        if(existingFirstName && value !== existingFirstName){
                                            return "First name should match the user's existing first name";
                                        }
                                        return true;
                                    }
                                })}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                error={errors.lastName}
                                helperText={errors.lastName ? errors.lastName.message : ""}
                                {...register("lastName", {
                                    required: "User Last Name is required",
                                    validate:(value)=>{
                                        if(existingLastName && value !== existingLastName){
                                            return "Last name should match the user's existing last name";
                                        }
                                        return true;
                                    }
                                })}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                required
                                id='email'
                                label="Email"
                                variant='outlined'
                                size='medium'
                                type='email'
                                fullWidth
                                error={errors.email}
                                helperText={errors.email ? errors.email.message : ""}
                                {...register("email",{
                                    required: "User Email is required",
                                    validate:(value)=>{
                                        if(existingEmail && value !== existingEmail){
                                            return "Email should match the user's existing email";
                                        }
                                        return true;
                                    }
                                })}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <FormControl
                                required
                                variant='outlined'
                                size='medium'
                                fullWidth
                                error={errors.password}
                            >
                                <InputLabel htmlFor="password">Password</InputLabel>
                                <OutlinedInput
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    endAdornment={
                                        <InputAdornment position='end'>
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    {...register("password",{
                                        required: "User Password is required",
                                        validate:(value)=>{
                                            if(existingPassword && value !== existingPassword){
                                                return "Password should match the user's existing password";
                                            }
                                            return true;
                                        }
                                    })}
                                />
                                <FormHelperText>{errors.password && errors.password.message}</FormHelperText>
                            </FormControl>
                        </Grid>

                        <Grid item>
                            <FormControlLabel
                                control={<Checkbox value="remember" color='primary' />}
                                label="Remember me"
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Button
                                type='submit'
                                fullWidth
                                variant='contained'
                            >Sign In
                            </Button>
                        </Grid>

                        <Grid container sx={{ mt: 2, ml: 2 }}>
                            <Grid item xs>
                                <Link to="#">
                                    Forgot password?
                                </Link>
                            </Grid>

                            <Grid item>
                                <Link to="/user/register">
                                    Don't have an account? Sign Up
                                </Link>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    )
}