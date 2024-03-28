import { useSelector } from "react-redux"

export const CityQuiz = () => {

    const cities = useSelector(state=>state.cities)

    console.log("cities", cities);

    return(
        <>
        City Quiz
        </>
    )
}