import { Navigate, Route, Routes } from "react-router-dom"
import { RegistrationForm } from "./modules/user/RegistrationForm";
import { LogIn } from "./modules/user/LogIn";
import { CountryQuiz } from "./modules/Countries/CountryQuiz";
import { SearchBar } from "./modules/Countries/SearchBar";
import { CountryList } from "./modules/Countries/CountryList";
import { CountryDetails } from "./modules/Countries/CountryDetails";

export const AppRouter = () => {
    return (
        <Routes>
            <Route path="user">
                <Route path="register" element={<RegistrationForm />} />

                <Route path="login" element={<LogIn />} />
            </Route>

            <Route path="countries">
                <Route path="quiz" element={<CountryQuiz />} />
                <Route path="details" element={<CountryDetails />}/>
                <Route index element={<Navigate to="/" replace={true}></Navigate>} />
            </Route>

            <Route
                path="/"
                element={
                    <>
                        <SearchBar />
                        <CountryList />
                    </>
                }
            />
        </Routes>
    )
}