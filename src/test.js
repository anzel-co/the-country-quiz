const fetchData = async() => {
    try {
        const response = await fetch('https://restcountries.com/v3.1/all')
        const data = await response.json()
        console.log(data[0])
    }
    catch (err) {
        console.log(err)
    }
}
fetchData()