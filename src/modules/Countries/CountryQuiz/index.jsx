import { Box, FormControl, InputLabel, Typography, Select, Stack, Button, Dialog, DialogContent, OutlinedInput, DialogActions, FormLabel, RadioGroup, FormControlLabel, Radio, FormHelperText } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";

export const CountryQuiz = () => {

    const [country, setCountry] = useState("");
    const countries = useSelector(state => state.countries.countryList);
    const [selectedCountry, setSelectedCountry] = useState([]);

    const [open, setOpen] = useState(false);
    const [clicked, setClicked] = useState(false);

    const [randomNumbers, setRandomNumbers] = useState([]);

    const [correctAnswerNumber, setCorrectAnswerNumber] = useState(0);
    const [wrongAnswerNumber, setWrongAnswerNumber] = useState(0);
    const [helperText, setHelperText] = useState("");

    const handleClickOpen = () => {
        setOpen(true);
    };

    const generateRandomNumbers = () => {
        const uniqueRandomNumbers = [];
        while (uniqueRandomNumbers.length < 3) {
            const randomNumber = Math.floor(Math.random() * countries.length);
            if (!uniqueRandomNumbers.includes(randomNumber)) {
                uniqueRandomNumbers.push(randomNumber);
            }
        }
        setRandomNumbers(uniqueRandomNumbers)
    }

    const handleSelectedCountry = (e) => {
        setCountry(e);

        fetch(`https://restcountries.com/v3.1/name/${e}`)
            .then(res => res.json())
            .then((data) => setSelectedCountry(data));

        generateRandomNumbers();
        setHelperText("");
        setCorrectAnswerNumber(0);
        setWrongAnswerNumber(0);
    };

    const handleClose = (event, reason) => {
        if (reason !== 'backdropClick') {
            setOpen(false);
        }
        setClicked(true);
    };

    const handleClick1 = (answer) => {
        const correctAnswer = selectedCountry && selectedCountry[0].name.official;
        console.log("cevap",answer == correctAnswer);
        if(answer === correctAnswer){
            setCorrectAnswerNumber(correctAnswerNumber + 1);
        }else {
            setWrongAnswerNumber(wrongAnswerNumber + 1);
        }
    }

    const handleClick2 = (answer) => {
        const correctAnswer = selectedCountry && selectedCountry[0].capital;
        console.log("cevap",answer == correctAnswer);
        if(answer === correctAnswer){
            setCorrectAnswerNumber(correctAnswerNumber + 1);
        }else {
            setWrongAnswerNumber(wrongAnswerNumber + 1);
        }
    }

    const handleClick3 = (answer) => {
        const correctAnswer = selectedCountry && selectedCountry[0].timezones;
        console.log("cevap",answer == correctAnswer);
        if(answer === correctAnswer){
            setCorrectAnswerNumber(correctAnswerNumber + 1);
        }else {
            setWrongAnswerNumber(wrongAnswerNumber + 1);
        }
    }

    const handleClick4 = (answer) => {
        const correctAnswer = selectedCountry && selectedCountry[0].continents;
        console.log("cevap",answer == correctAnswer);
        if(answer === correctAnswer){
            setCorrectAnswerNumber(correctAnswerNumber + 1);
        }else {
            setWrongAnswerNumber(wrongAnswerNumber + 1);
        }
    }

    const handleClick5 = (answer) => {
        const correctAnswer = selectedCountry && selectedCountry[0].independent ? "Yes" : "No";
        console.log("cevap",answer == correctAnswer);
        if(answer === correctAnswer){
            setCorrectAnswerNumber(correctAnswerNumber + 1);
        }else {
            setWrongAnswerNumber(wrongAnswerNumber + 1);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(wrongAnswerNumber !== 0){
            setHelperText(`OOps you must study more for ${selectedCountry[0].name.common}, you have ${wrongAnswerNumber} wrong answer of 5 question.`)
        }else {
            setHelperText(`Congratulations you are full of knowledge about ${selectedCountry[0].name.common}.`)
        }
    }

    return (
        <Box textAlign="center" margin="10px">
            <Button onClick={handleClickOpen} sx={{ fontSize: "18px", color: "#000", fontWeight: "700", backgroundColor: "#ebe8e8", color: "#4CAF51" }}>Choose The Country You Want To Test Yourself In</Button>
            <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
                <DialogContent>
                    <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
                        <FormControl sx={{ m: 1, minWidth: 120 }}>
                            <InputLabel htmlFor="countries">Countries</InputLabel>
                            <Select
                                native
                                onChange={(e) => handleSelectedCountry(e.target.value)}
                                input={<OutlinedInput label="Countries" id="countries" />}
                            >
                                <option aria-label="None" value="" />
                                {countries.map((country) => (
                                    <option key={country.name.common}>{country.name.common}</option>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClose}>Ok</Button>
                </DialogActions>
            </Dialog>
            {clicked ?
                <Box component="form" onSubmit={handleSubmit}>
                    <Box flexDirection="row" display="flex" alignItems="center" justifyContent="center" mt="20px" flexWrap="wrap" gap="20px">

                        <Stack sx={{ border: "1px solid gray", padding: "10px", borderRadius: "9px", backgroundColor: "#ebe8e8", width: "350px", height: "160px", overflowY: "auto", whiteSpace: "nowrap" }}
                        >
                            <Typography variant="body1" sx={{ textDecoration: "underline" }}>What is the official name of {country}?</Typography>
                            <Stack display="flex" alignItems="flex-start" flexDirection="column">
                                <Button variant="text" sx={{ color: "#000" }} onClick={() => handleClick1(selectedCountry && selectedCountry[0].name.official)}>
                                    {selectedCountry && selectedCountry[0].name.official}
                                </Button>
                                {randomNumbers.map((index) => (
                                    <Button variant="text" key={index} sx={{ color: "#000" }}onClick={() => handleClick1(countries && countries[index].name.official)}>{countries && countries[index].name.official}</Button>
                                ))
                                }
                            </Stack>
                        </Stack>

                        <Stack sx={{ border: "1px solid gray", padding: "10px", borderRadius: "9px", backgroundColor: "#ebe8e8", width: "350px", height: "160px", overflowY: "auto", whiteSpace: "nowrap" }}>
                            <Typography variant="body1" sx={{ textDecoration: "underline" }}>What is the capital city of {country}?</Typography>
                            <Stack display="flex" alignItems="flex-start" flexDirection="column">
                                <Button variant="text" sx={{ color: "#000" }}
                                onClick={() => handleClick2(selectedCountry && selectedCountry[0].capital)}
                                >
                                    {selectedCountry && selectedCountry[0].capital}
                                </Button>
                                {randomNumbers.map((index) => (
                                    <Button variant="text" key={index} sx={{ color: "#000" }}
                                    onClick={() => handleClick2(countries && countries[index].capital)}
                                    >{countries && countries[index].capital}</Button>
                                ))
                                }
                            </Stack>
                        </Stack>

                        <Stack sx={{ border: "1px solid gray", padding: "10px", borderRadius: "9px", backgroundColor: "#ebe8e8", width: "350px", height: "160px", overflowY: "auto", whiteSpace: "nowrap" }}>
                            <Typography variant="body1" sx={{ textDecoration: "underline" }}>What is the official time zone of {country}?</Typography>
                            <Stack display="flex" alignItems="flex-start" flexDirection="column">
                                <Button variant="text" sx={{ color: "#000" }}
                                onClick={() => handleClick3(selectedCountry && selectedCountry[0].timezones)}
                                >
                                    {selectedCountry && selectedCountry[0].timezones}
                                </Button>
                                {randomNumbers.map((index) => (
                                    <Button variant="text" key={index} sx={{ color: "#000" }}
                                    onClick={() => handleClick3(countries && countries[index].timezones)}
                                    >{countries && countries[index].timezones}</Button>
                                ))
                                }
                            </Stack>
                        </Stack>

                        <Stack sx={{ border: "1px solid gray", padding: "10px", borderRadius: "9px", backgroundColor: "#ebe8e8", width: "350px", height: "160px", overflowY: "auto", whiteSpace: "nowrap" }}>
                            <Typography variant="body1" sx={{ textDecoration: "underline" }}>In which continents does {country} live?</Typography>
                            <Stack display="flex" alignItems="flex-start" flexDirection="column">
                                <Button variant="text" sx={{ color: "#000" }}
                                onClick={() => handleClick4(selectedCountry && selectedCountry[0].continents)}
                                >
                                    {selectedCountry && selectedCountry[0].continents}
                                </Button>
                                {randomNumbers.map((index) => (
                                    <Button variant="text" key={index} sx={{ color: "#000" }}
                                    onClick={() => handleClick4(countries && countries[index].continents)}
                                    >{countries && countries[index].continents}</Button>
                                ))
                                }
                            </Stack>
                        </Stack>

                        <Stack sx={{ border: "1px solid gray", padding: "10px", borderRadius: "9px", backgroundColor: "#ebe8e8", width: "350px", height: "160px", overflowY: "auto", whiteSpace: "nowrap" }}>
                            <Typography variant="body1" sx={{ textDecoration: "underline" }}>Is {country} independent country?</Typography>
                            <Stack display="flex" alignItems="flex-start" flexDirection="column">
                                <Button variant="text" sx={{ color: "#000" }}
                                onClick={() => handleClick5(selectedCountry && selectedCountry[0].independent ? "Yes" : "No")}
                                >
                                    {selectedCountry && selectedCountry[0].independent ? "Yes" : "No"}
                                </Button>
                                <Button variant="text" sx={{ color: "#000" }}
                                onClick={() => handleClick5(selectedCountry && selectedCountry[0].independent ? "No" : "Yes")}
                                >{selectedCountry && selectedCountry[0].independent ? "No" : "Yes"}</Button>
                            </Stack>
                        </Stack>
                    </Box>

                    <FormHelperText sx={{fontSize:"18px", textAlign:"center", color:wrongAnswerNumber !== 0 ? "#f00" : "#080"}}>{helperText}</FormHelperText>

                    <Button type="submit" variant="outlined" sx={{ width: "35%", mt: "10px" }}>Check Answers</Button>
                </Box>
                : null}
        </Box>
    )
}