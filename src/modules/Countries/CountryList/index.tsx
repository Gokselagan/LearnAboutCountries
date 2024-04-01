import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { setCountries, updateCountry } from "../countriesSlice";
import { Grid, CardActionArea, CardContent, CardMedia, Typography, Box, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import { Countries } from "../Models";
import { userState } from "../../user/Models";

export const CountryList = () => {

    const dispatch = useDispatch();
    const countries = useSelector((state:{countries:{countryList:Countries[]}}) => state.countries.countryList);
    const isSignedIn = useSelector((state:{user:userState}) => state.user.isSignedIn);

    useEffect(() => {
        fetch("https://restcountries.com/v3.1/all")
            .then(res => res.json())
            .then((data) => dispatch(setCountries(data)));
    }, [dispatch])

    const handleBtnClick = (country:Countries) => {
        dispatch(updateCountry(country));
    }

    return (
        <Box>
            {isSignedIn ? <Grid container spacing={3} justifyContent="center" sx={{ padding: "18px" }}>
                {countries.map((country) => (
                    <Grid item xs={11} sm={6} md={4} lg={3} key={country.name.official} >
                        <CardActionArea component={Link} to="/countries/details" onClick={()=>handleBtnClick(country)} >
                            <CardMedia
                                component="img"
                                height="140"
                                image={country.flags.svg}
                                alt={country.flags.alt}
                            />
                            <CardContent sx={{ backgroundColor: "lightgray", display: "flex", flexDirection: "column" }}>
                                <Typography component="div" variant="h6" color="#000" sx={{ fontWeight: 600, fontSize: 18, textAlign: "center" }}>
                                    {country.name.common}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Grid>
                ))}
            </Grid>
                :
                <Box sx={{ padding: "20px", marginTop: "120px" }}>
                    <Grid container spacing={4} flexDirection="column" alignItems="center">
                        <Grid item xs={12} sm={9} md={6}>
                            <Typography variant="h4">Welcome!</Typography>
                            <Typography sx={{ marginLeft: "15px" }}>Our website is a platform that offers fun and informative content about countries around the world. Here, you can choose any country you like and access cultural, geographical, and historical information, as well as enjoy a delightful quiz to test your knowledge.</Typography>
                        </Grid>

                        <Grid item xs={12} sm={9} md={6}>
                            <Typography variant="h4">What Our Site Offers:</Typography>
                            <Stack component="ul">
                                <Typography component="li">Detailed information about various countries around the world.</Typography>
                                <Typography component="li">Basic details such as flags, capitals, languages of countries.</Typography>
                                <Typography component="li">An entertaining quiz to reinforce what you've learned.</Typography>
                                <Typography component="li">Start now and embark on a journey around the world!</Typography>
                            </Stack>
                        </Grid>
                    </Grid>
                </Box>
            }
        </Box>
    )
}