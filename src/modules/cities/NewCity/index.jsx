import { useSelector } from "react-redux"

export const NewCity = () => {

    const cities = useSelector(state=>state.cities)

    console.log("cities", cities);

    return(
        <>
        New City
        </>
    )
}