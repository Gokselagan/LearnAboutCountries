import { Box, FormControl, InputLabel, Typography, Select, MenuItem, Button, Dialog, DialogContent, OutlinedInput, DialogActions, FormLabel, RadioGroup, FormControlLabel, Radio, FormHelperText } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";

export const CityQuiz = () => {

    const [country, setCountry] = useState("");
    const countries = useSelector(state => state.cities.cityList);
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
    };

    const handleAnswer1 = (answer) => {
        if (answer == selectedCountry && selectedCountry[0].name.official) {
            setCorrectAnswerNumber(correctAnswerNumber + 1);
        } else {
            setWrongAnswerNumber(wrongAnswerNumber + 1);
        }
        console.log("answer1", answer, "correct", correctAnswerNumber, "wrong", wrongAnswerNumber);
        console.log("correctanswer1",selectedCountry && selectedCountry[0].name.official);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (wrongAnswerNumber !== 0) {
            setHelperText(`OOps you have ${wrongAnswerNumber} wrong answers. Please study more about your country and come back for quiz.`);
            setCorrectAnswerNumber(0);
            setWrongAnswerNumber(0);
        } else {
            setHelperText("Congratulations you have all the information about your country.");
            setCorrectAnswerNumber(0);
            setWrongAnswerNumber(0);
        }
    }

    const handleClose = (event, reason) => {
        if (reason !== 'backdropClick') {
            setOpen(false);
        }
        setClicked(true);
    };

    return (
        <Box textAlign="center">
            <Button onClick={handleClickOpen} sx={{fontSize:"18px", color:"#000", fontWeight:"700", backgroundColor:"#ebe8e8", color:"#4CAF51"}}>Choose The Country You Want To Test Yourself In</Button>
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
                <Box component="form" flexDirection="column" display="flex" alignItems="flex-start" marginLeft="20px" onSubmit={handleSubmit}>
                    <FormControl>
                        <FormLabel id="first-question">What is the official name of {country}?</FormLabel>
                        <RadioGroup
                            aria-labelledby="first-question"
                            name="question1"
                            onChange={(e)=>handleAnswer1(e.target.value)}
                        >
                            <FormControlLabel control={<Radio />} value={selectedCountry && selectedCountry[0].name.official} label={selectedCountry && selectedCountry[0].name.official} />
                            {randomNumbers.map((index) => (
                                <FormControlLabel key={index} control={<Radio />} value={countries && countries[index].name.official} label={countries && countries[index].name.official} />
                            ))}
                        </RadioGroup>
                    </FormControl>

                    <FormControl>
                        <FormLabel id="second-question">What is the capital city of {country}?</FormLabel>
                        <RadioGroup
                            aria-labelledby="second-question"
                            name="question2"
                            // onChange={(e)=>handleAnswer2(e.target.value)}
                        >
                            {randomNumbers.map((index) => (
                                <FormControlLabel key={index} control={<Radio />} value={countries && countries[index].capital} label={countries && countries[index].capital} />
                            ))}
                            <FormControlLabel control={<Radio />} value={selectedCountry && selectedCountry[0].capital} label={selectedCountry && selectedCountry[0].capital} />

                        </RadioGroup>
                    </FormControl>

                    <FormControl>
                        <FormLabel id="third-question">What is the official time zone of {country}?</FormLabel>
                        <RadioGroup
                            aria-labelledby="third-question"
                            name="question3"
                            // onChange={(e)=>handleAnswer3(e.target.value)}
                        >
                            {randomNumbers.map((index) => (
                                <FormControlLabel key={index} control={<Radio />} value={countries && countries[index].timezones} label={countries && countries[index].timezones} />
                            ))}
                            <FormControlLabel control={<Radio />} value={selectedCountry && selectedCountry[0].timezones} label={selectedCountry && selectedCountry[0].timezones} />

                        </RadioGroup>
                    </FormControl>

                    <FormControl>
                        <FormLabel id="fourth-question">In which continents does {country} live?</FormLabel>
                        <RadioGroup
                            aria-labelledby="fourth-question"
                            name="question4"
                            // onChange={(e)=>handleAnswer4(e.target.value)}
                        >
                            {randomNumbers.map((index) => (
                                <FormControlLabel key={index} control={<Radio />} value={countries && countries[index].continents} label={countries && countries[index].continents} />
                            ))}
                            <FormControlLabel control={<Radio />} value={selectedCountry && selectedCountry[0].continents} label={selectedCountry && selectedCountry[0].continents} />

                        </RadioGroup>
                    </FormControl>

                    <FormControl>
                        <FormLabel id="fifth-question">Is {country} independent country?</FormLabel>
                        <RadioGroup
                            aria-labelledby="fifth-question"
                            name="question5"
                            // onChange={(e)=>handleAnswer5(e.target.value)}
                        >

                            <FormControlLabel control={<Radio />} value={selectedCountry && selectedCountry[0].independent ? "Yes" : "No"} label={selectedCountry && selectedCountry[0].independent ? "Yes" : "No"} />

                            <FormControlLabel control={<Radio />} value={selectedCountry && selectedCountry[0].independent ? "No" : "Yes"} label={selectedCountry && selectedCountry[0].independent ? "No" : "Yes"} />

                        </RadioGroup>
                    </FormControl>

                    <Button type="submit" variant="outlined" sx={{width:"35%"}}>Check Answers</Button>

                    <FormHelperText>{helperText}</FormHelperText>
                </Box>

                : null}
        </Box>
    )
}