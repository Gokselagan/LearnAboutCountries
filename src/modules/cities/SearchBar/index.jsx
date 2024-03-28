import { Alert, Stack, TextField, Typography, Box, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setCities } from "../citiesSlice";
import { useEffect, useState } from "react";

export const SearchBar = () => {

    const dispatch = useDispatch();
    const [country, setCountry] = useState("");
    const [searchError, setSearchError] = useState(null);
    const [inputError, setInputError] = useState(null);
    const isSignedIn = useSelector(state => state.user.isSignedIn);

    const handleSubmit = (e) => {
        e.preventDefault();

        const cleansedInput = country.trim().replace(/\s/g, '');

        fetch(`https://restcountries.com/v3.1/name/${cleansedInput}`)
            .then(res => res.json())
            .then((data) => {
                if (data && data.length > 0) {
                    dispatch(setCities(data));
                    setSearchError(null);
                    setCountry("");
                } else {
                    setSearchError(
                        `Could not find any country with "${country}".`
                    )
                }
            });
    };

    useEffect(() => {
        if (country) {
            const trimmedSearchInput = country.trim();
            const numberOfSpaces = country.length - trimmedSearchInput.length;
            if (numberOfSpaces > 1) {
                setInputError("Country name should not have more than one white space in a row.")
            } else {
                setInputError(null);
            }
        }
    }, [country]);

    return (
        <>
            {isSignedIn ?
                <Stack component="form" onSubmit={handleSubmit} sx={{ marginBottom: "20px" }}>
                    <Stack alignItems="center">
                        <TextField
                            label="Search for a country..."
                            variant="filled"
                            type="text"
                            name="country"
                            id="country"
                            placeholder="Enter Your Country"
                            value={country}
                            onChange={(event) => setCountry(event.target.value)}
                            sx={{ width: "50%" }}
                            error={inputError}
                            helperText={inputError}
                        />
                    </Stack>
                    {
                        searchError &&
                        <Stack alignItems="center">
                            <Alert sx={{ width: "50%" }} severity="error">
                                {searchError}
                            </Alert>
                        </Stack>
                    }
                </Stack>
                : null
            }
        </>
    )
}