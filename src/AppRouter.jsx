import { Navigate, Route, Routes } from "react-router-dom"
import { RegistrationForm } from "./modules/user/RegistrationForm";
import { LogIn } from "./modules/user/LogIn";
import { CityQuiz } from "./modules/cities/CityQuiz";
import { SearchBar } from "./modules/cities/SearchBar";
import { CityList } from "./modules/cities/CityList";
import { CityDetails } from "./modules/cities/CityDetails";

export const AppRouter = () => {
    return (
        <Routes>
            <Route path="user">
                <Route path="register" element={<RegistrationForm />} />

                <Route path="login" element={<LogIn />} />
            </Route>

            <Route path="cities">
                <Route path="new" element={<CityQuiz />} />
                <Route path="details" element={<CityDetails />}/>
                <Route index element={<Navigate to="/" replace={true}></Navigate>} />
            </Route>

            <Route
                path="/"
                element={
                    <>
                        <SearchBar />
                        <CityList />
                    </>
                }
            />
        </Routes>
    )
}