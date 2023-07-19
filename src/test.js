const fetchData = async() => {
    try {
        const response = await fetch('https://restcountries.com/v3.1/all')
        const data = await response.json()
        let name = data.map(c => c.name.common)
        console.log(data[23])
    }
    catch (err) {
        console.log(err)
    }
}
fetchData()