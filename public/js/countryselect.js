const countryRequest = new XMLHttpRequest()

countryRequest.addEventListener('readystatechange',(e) => {
    if(e.target.readyState === 4 && e.target.status === 200) {
        const data = JSON.parse(e.target.responseText)
        data.forEach((info) => {
            
            const p = document.createElement('option')
            p.textContent = info.name
            document.querySelector('select').appendChild(p)
        })
    }
})


countryRequest.open('GET','http://restcountries.eu/rest/v2/all')
countryRequest.send()

const Country = document.querySelector('#kuntry').addEventListener('change', function (e) {
    console.log(e.target.value)
})

document.querySelector('#clear-data').addEventListener('click', function (e) {
    document.querySelector('#zuzi').innerHTML = '<p> TEST </p>'
})