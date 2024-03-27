import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { setCities, updateCity } from "../citiesSlice";
import { Grid, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export const CityList = () => {

    const dispatch = useDispatch();
    const cityList = useSelector(state => state.cities.cityList);

    useEffect(() => {
        fetch("https://restcountries.com/v3.1/all")
            .then(res => res.json())
            .then((data) => dispatch(setCities(data)));
    }, [dispatch])

    const handleBtnClick = (city) => {
        dispatch(updateCity(city));
    }

    return (
        <Grid container spacing={3} sx={{ margin: "9px" }}>
            {cityList.map((city) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={city.name.official} >
                    <CardActionArea component={Link} to="/cities/details" onClick={() => handleBtnClick(city)} >
                        <CardMedia
                            component="img"
                            height="140"
                            image={city.flags.svg}
                            alt={city.flags.alt}
                        />
                        <CardContent sx={{ backgroundColor: "lightgray", display: "flex", flexDirection: "column" }}>
                            <Typography component="div" variant="h6" color="#000" sx={{ fontWeight: 600, fontSize: 18, textAlign: "center" }}>
                                {city.name.common}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Grid>
            ))}
        </Grid>
    )
}