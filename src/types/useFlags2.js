import { useState, useEffect } from "react";

const useFlags2 = (questions) => {
    const [flag, setFlag] = useState()
    const [country, setCountry] = useState()
    const [flags, setFlags] = useState([])

    useEffect(() => {
        const fetchCountry = async () => {
        const response = await fetch('https://restcountries.com/v3.1/all')
        const data = await response.json()
        const index = () => Math.floor(Math.random() * (249 - 0 + 1) + 0)
        const correctIndex = index()
        let flag = data[correctIndex].flags.png
        let country = data[correctIndex].name.common
        let wrongIndexes = []
        for (let i = 0; i <= 2; i++) {
            let wrongIndex = index()
            if (wrongIndex === correctIndex || wrongIndexes.includes(wrongIndex)) continue
            else wrongIndexes.push(wrongIndex)
        }    
        let c1 = data[wrongIndexes[0]].flags
        let c2 = data[wrongIndexes[1]].flags
        let c3 = data[wrongIndexes[2]].flags
        let flags = [c1.png, c2.png, c3.png]
        let choices = [flag, ...flags]
        choices.sort(() => Math.random() - .5)
        setFlag(flag)
        setCountry(country)
        setFlags(choices)
        // console.log(flag)
        // console.log(country)
        // console.log(flags)
        // console.log(score)
    }
    fetchCountry()
    }, [questions])
    return { flag, country, flags }
}
export default useFlags2