document.querySelector('#getFlights').addEventListener('submit', getFlights);

async function getFlights(e) {
    e.preventDefault();
    let origin = document.querySelector('#origin').value;
    let destin = document.querySelector('#destination').value;
    let outBoundDate = document.querySelector('#out-bound-date').value;
    let originPlaceId = await getPlaceId(origin);
    let destinPlaceId = await getPlaceId(destin);
    
    fetch(`https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsedates/v1.0/IN/INR/en-IN/${originPlaceId}/${destinPlaceId}/${outBoundDate}?inboundpartialdate=anytime`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "a3a86d866bmsh171f8a73e061c07p14d157jsna3f9959b1fa2",
            "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com"
        }
    })
    .then(res => res.json())
    .then(data => {
        let output = '';
        data.Quotes.forEach(quote => {
            output += `
            <div class="card">
                <h3>${data.Carriers.find(ele => ele.CarrierId === quote.OutboundLeg.CarrierIds[0]).Name}</h3>
                <p>${data.Places[0].Name} -- to -- ${data.Places[1].Name}</p>
                <p>Depurture Date: ${quote.OutboundLeg.DepartureDate}</p>
                <h2>Price: ${data.Currencies[0].Symbol}${quote.MinPrice}</h2>
            </div>
            `;
        });
        document.querySelector('#output').innerHTML = output;
    })
    .catch(err => console.error(err));
}

async function getPlaceId(place) {
    return await fetch(`https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/IN/INR/en-IN/?query=${place}`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "a3a86d866bmsh171f8a73e061c07p14d157jsna3f9959b1fa2",
            "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com"
        }
    })
    .then(res => res.json())
    .then(data => {return data.Places[0].PlaceId;})
    .catch(err => console.error(err));
}