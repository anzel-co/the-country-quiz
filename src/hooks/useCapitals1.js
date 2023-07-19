import { useState, useEffect } from "react";

const useCapitals1 = (questions) => {
    const [country, setCountry] = useState()
    const [capital, setCapital] = useState()
    const [countries, setCountries] = useState([])

    useEffect(() => {
        const abortController = new AbortController()

        const fetchCountry = async () => {
            try { 
                const response = await fetch('https://restcountries.com/v3.1/all')
                const data = await response.json()
                const index = () => Math.floor(Math.random() * (249 - 0 + 1) + 0)
                const correctIndex = index()
                let country = data[correctIndex].name.common
                let capital = data[correctIndex].capital[0]
                let wrongIndexes = []
                for (let i = 0; i <= 2; i++) {
                    let wrongIndex = index()
                    if (wrongIndex === correctIndex || wrongIndexes.includes(wrongIndex)) continue
                    else wrongIndexes.push(wrongIndex)
                }    
                let c1 = data[wrongIndexes[0]].name.common
                let c2 = data[wrongIndexes[1]].name.common
                let c3 = data[wrongIndexes[2]].name.common
                let countries = [c1, c2, c3]
                let choices = [country, ...countries]
                choices.sort(() => Math.random() - .5)
                setCountry(country) 
                setCapital(capital)
                setCountries(choices)
            } catch (err) { 
                const response = await fetch('https://restcountries.com/v3.1/all')
                const data = await response.json()
                const index = () => Math.floor(Math.random() * (249 - 0 + 1) + 0)
                const correctIndex = index()
                let country = data[correctIndex].name.common
                let capital = data[correctIndex].capital[0]
                let wrongIndexes = []
                for (let i = 0; i <= 2; i++) {
                    let wrongIndex = index()
                    if (wrongIndex === correctIndex || wrongIndexes.includes(wrongIndex)) continue
                    else wrongIndexes.push(wrongIndex)
                }    
                let c1 = data[wrongIndexes[0]].name.common
                let c2 = data[wrongIndexes[1]].name.common
                let c3 = data[wrongIndexes[2]].name.common
                let countries = [c1, c2, c3]
                let choices = [country, ...countries]
                choices.sort(() => Math.random() - .5)
                setCountry(country) 
                setCapital(capital)
                setCountries(choices)
             }
        } 
        fetchCountry()
        return () => abortController.abort()
    }, [questions])
    
    return { country, capital, countries }
}
export default useCapitals1