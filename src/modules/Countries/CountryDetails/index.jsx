import { Box, Stack, Grid, Typography, Link } from "@mui/material";
import { useSelector } from "react-redux";
import TouchAppIcon from '@mui/icons-material/TouchApp';

export const CountryDetails = () => {

    const details = useSelector(state => state.countries.selectedCountry);


    return (
        <Box>
            {details ? (

                <Grid container spacing={2} flexDirection="column" alignItems="center">
                    <Grid item xs={12} md={9} display="flex" flexDirection="row" justifyContent="space-between" alignItems="center" gap="20px" textAlign="center">
                        <Stack>
                            <Box
                                component="img"
                                src={details.flags.svg}
                                alt={details.flags.alt}
                                sx={{ maxHeight:"300px" , width:"100%", objectFit:"cover" }}
                            />
                        </Stack>
                        <Stack display="flex" flexDirection="column" alignItems="center" gap="10px">
                            <Typography fontSize="20px" width="auto">You Can Find The Location On</Typography>

                            <Link href={details.maps.googleMaps} target="_blank" fontSize="18px">Google Maps for {details.name.common}</Link>

                            <TouchAppIcon fontSize="large"/>
                        </Stack>
                    </Grid>

                    <Grid item>
                        <Typography variant="h3">{details.name.common}</Typography>
                    </Grid>

                    <Grid item xs={12} sm={9} md={6} >
                        <Box sx={{padding:{xs:2, sm:4}}}>
                            <Typography variant="body1" sx={{textIndent:"2rem", marginBottom:"16px"}}>
                                {details.name.common} is an {details.independent ? <>independent</> : <>is not independent</>} country officially known as the {details.name.official} and {details.unMember ? <>is a </> : <>is not a </>} member of United Nations. The country's general name is "{details.name.common}", and its abbreviated name is "{details.cca2}." Their money currency is "{Object.keys(details.currencies).map(currency => details.currencies[currency].name)}" and the symbol is "{Object.keys(details.currencies).map(currency => details.currencies[currency].symbol)}".
                            </Typography>

                            <Typography variant="body1" sx={{textIndent:"2rem", marginBottom:"16px"}}>
                                {details.name.common}, with its capital "{details.capital}", is located on the continent of "{details.region}". The country's population is {details.population.toLocaleString()} and its official language is {Object.keys(details.languages).map(language => details.languages[language])}. {details.name.common} {details.borders? <> shares its borders with {details.borders.map((border) => (border) + "," + " ")}</> : <>doesn't have a border with another country</>}.
                            </Typography>

                            <Typography variant="body1" sx={{textIndent:"2rem"}}>
                                The vehicle licence plate code for {details.name.common} is "{details.car.signs}" and vehicles adhere to {details.car.side === "right" ? <>right-hand</> : <>left-hand</>} traffic rules. The country's time zone is set to "{details.timezones}". {details.name.common} is situated at the crossroads of the continents of {details.continents[0]} {details.continents[1] ? <> and {details.continents[1]} {details.continents[2] ? <>and {details.continents[2]}</> : null}</> : null}.
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>

            ) : <>Üzgünüm ülke seçmediniz</>}
        </Box>
    )
}


