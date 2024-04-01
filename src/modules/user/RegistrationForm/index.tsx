import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Box, Container, Grid, TextField, Typography, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton, FormControlLabel, Button, FormHelperText } from "@mui/material";
import { useState } from "react";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Checkbox from '@mui/material/Checkbox';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser } from "../userSlice";
import { RegistrationFormProps } from "../Models";

export const RegistrationForm = () => {

	const [showPassword, setShowPassword] = useState<boolean>(false);
    const dispatch = useDispatch();

    const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset
	} = useForm<RegistrationFormProps>();

	const onSubmit = (data:RegistrationFormProps) => {
        dispatch(registerUser(data))
		console.log(data);
		reset();
        navigate("/user/login");
	}

	const handleClickShowPassword = () => setShowPassword(!showPassword);

	return (
		<Container component="main" maxWidth="xs">
			<Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
				<Avatar sx={{ mt: 8, bgcolor: "primary.main" }}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant='h5'>Sign Up</Typography>

				<Box component="form" noValidate sx={{ mt: 3 }} onSubmit={handleSubmit(onSubmit)}>

					<Grid container spacing={2}>
						<Grid item xs={12} sm={6}>
							<TextField
								required
								fullWidth
								id="firstName"
								label="First Name"
                                error={!!errors.firstName}
                                helperText={errors.firstName ? errors.firstName.message : ""}
								{...register("firstName",{
                                    required: "User Last First Name is required"
                                })}
							/>
						</Grid>

						<Grid item xs={12} sm={6}>
							<TextField
								required
								fullWidth
								id="lastName"
								label="Last Name"
                                error={!!errors.lastName}
                                helperText={errors.lastName ? errors.lastName.message : ""}
								{...register("lastName",{
                                    required: "User Last Name is required"
                                })}
							/>
						</Grid>

						<Grid item xs={12}>
							<TextField
								required
								fullWidth
								id="email"
								label="Email Adress"
								type="email"
								error={!!errors.email}
								helperText={errors.email ? errors.email.message : ""}
								{...register("email", {
									required: "User Email is Required",
									pattern: {
										value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
										message: 'Please enter a valid email adress'
									}
								})}
							/>
						</Grid>

						<Grid item xs={12}>
							<FormControl
								variant='outlined'
								required
								size='medium'
								fullWidth
								error={!!errors.password}
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
									{...register("password", {
										required: "Password is Required",
										minLength: {
											value: 6,
											message: "Password must be at least 6 characters long"
										},
										pattern: {
											value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{6,}$/,
											message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
										}
									})}
								/>
								<FormHelperText>{errors.password ? errors.password.message : ''}</FormHelperText>
							</FormControl>
						</Grid>

						<Grid item xs={12}>
							<FormControlLabel
								control={<Checkbox value="allowExtraEmails" color="primary" />}
								label="I want to receive inspiration, marketing promotions and updates via email."
							/>
						</Grid>
					</Grid>

					<Button
						type="submit"
						fullWidth
						variant="contained"
						sx={{ mt: 3, mb: 2 }}>
						Sign Up
					</Button>

					<Grid container justifyContent="flex-end">
						<Grid item>
							<Link to="/user/login">Already have an account? Log in</Link>
						</Grid>
					</Grid>
				</Box>
			</Box>
		</Container>
	);
};