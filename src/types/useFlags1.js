import { useState, useEffect } from "react";

const useFlags1 = (questions) => {
    const [country, setCountry] = useState()
    const [flag, setFlag] = useState()
    const [countries, setCountries] = useState([])

    useEffect(() => {
        const fetchCountry = async () => {
        const response = await fetch('https://restcountries.com/v3.1/all')
        const data = await response.json()
        const index = () => Math.floor(Math.random() * (249 - 0 + 1) + 0)
        const correctIndex = index()
        let country = data[correctIndex].name.common
        let flag = data[correctIndex].flags.png
        let wrongIndexes = []
        for (let i = 0; i <= 2; i++) {
            let wrongIndex = index()
            if (wrongIndex === correctIndex || wrongIndexes.includes(wrongIndex)) continue
            else wrongIndexes.push(wrongIndex)
        }    
        let c1 = data[wrongIndexes[0]].name
        let c2 = data[wrongIndexes[1]].name
        let c3 = data[wrongIndexes[2]].name
        let countries = [c1.common, c2.common, c3.common]
        let choices = [country, ...countries]
        choices.sort(() => Math.random() - .5)
        setCountry(country) 
        setFlag(flag)
        setCountries(choices)
        // console.log(country)
        // console.log(flag)
        // console.log(countries)
        // console.log(score)
    }
    fetchCountry()
    }, [questions])
    
    return { country, flag, countries }
}
export default useFlags1