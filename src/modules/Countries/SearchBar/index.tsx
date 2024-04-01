import { Alert, Box, Stack, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setCountries } from "../countriesSlice";
import { useEffect, useState } from "react";
import { userState } from "../../user/Models";

export const SearchBar = () => {

    const dispatch = useDispatch();
    const [country, setCountry] = useState("");
    const [searchError, setSearchError] = useState<string>("");
    const [inputError, setInputError] = useState<string>("");
    const isSignedIn = useSelector((state:{user:{isSignedIn:userState}}) => state.user.isSignedIn);

    const handleSubmit = (e:any) => {
        e.preventDefault();
        const cleansedInput = country.trim().replace(/\s/g, '');
        fetch(`https://restcountries.com/v3.1/name/${cleansedInput}`)
            .then(res => res.json())
            .then((data) => {
                if (data && data.length > 0) {
                    dispatch(setCountries(data));
                    setSearchError("");
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
                setInputError("");
            }
        }
    }, [country]);

    return (
        <Box>
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
                            error={!!inputError}
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
        </Box>
    )
}