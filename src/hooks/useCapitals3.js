import { useState, useEffect } from "react";

const useFlags1 = (questions) => {
    const [capital, setCapital] = useState()
    const [flag, setFlag] = useState()
    const [capitals, setCapitals] = useState([])

    useEffect(() => {
        const abortController = new AbortController()
        
        const fetchCountry = async () => {
            try {
                const response = await fetch('https://restcountries.com/v3.1/all')
                const data = await response.json()
                const index = () => Math.floor(Math.random() * (249 - 0 + 1) + 0)
                const correctIndex = index()
                let capital = data[correctIndex].capital[0]
                let flag = data[correctIndex].flags.png
                let wrongIndexes = []
                for (let i = 0; i <= 2; i++) {
                    let wrongIndex = index()
                    if (wrongIndex === correctIndex || wrongIndexes.includes(wrongIndex)) continue
                    else wrongIndexes.push(wrongIndex)
                }    
                let c1 = data[wrongIndexes[0]].capital[0]
                let c2 = data[wrongIndexes[1]].capital[0]
                let c3 = data[wrongIndexes[2]].capital[0]
                let capitals = [c1, c2, c3]
                let choices = [capital, ...capitals]
                choices.sort(() => Math.random() - .5)
                setCapital(capital) 
                setFlag(flag)
                setCapitals(choices)
            } catch (err) { 
                const response = await fetch('https://restcountries.com/v3.1/all')
                const data = await response.json()
                const index = () => Math.floor(Math.random() * (249 - 0 + 1) + 0)
                const correctIndex = index()
                let capital = data[correctIndex].capital[0]
                let flag = data[correctIndex].flags.png
                let wrongIndexes = []
                for (let i = 0; i <= 2; i++) {
                    let wrongIndex = index()
                    if (wrongIndex === correctIndex || wrongIndexes.includes(wrongIndex)) continue
                    else wrongIndexes.push(wrongIndex)
                }    
                let c1 = data[wrongIndexes[0]].capital[0]
                let c2 = data[wrongIndexes[1]].capital[0]
                let c3 = data[wrongIndexes[2]].capital[0]
                let capitals = [c1, c2, c3]
                let choices = [capital, ...capitals]
                choices.sort(() => Math.random() - .5)
                setCapital(capital) 
                setFlag(flag)
                setCapitals(choices)
             }
        }
        fetchCountry()
        return () => abortController.abort()
    }, [questions])
    
    return { capital, flag, capitals }
}
export default useFlags1