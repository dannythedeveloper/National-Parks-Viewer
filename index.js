const apiKey = 'sVOjySmT6L6F1ZtireEMFmMhvbNOs6HBh5xu9lMy';
const baseUrl = 'https://developer.nps.gov/api/v1/parks';

function displayParkResults(responseJson) {
    console.log(responseJson);
    $('#searchList').empty();
    for (let i = 0; i < responseJson.data.length; i++) {
        let parkAddress = `${responseJson.data[i].addresses[0].line1} ${responseJson.data[i].addresses[0].city}, ${responseJson.data[i].addresses[0].stateCode} ${responseJson.data[i].addresses[0].postalCode}`
        console.log(parkAddress);
        $('#searchList').append(
            `<li><h2><a href="${responseJson.data[i].url}">${responseJson.data[i].fullName}</a></h2>
            <p><a href="${responseJson.data[i].directionsUrl}">${parkAddress}</a></p>
            <p>${responseJson.data[i].description}</p>`
        )
    };
    $('#searchResults').removeClass('hidden');
}

function getParks(searchInput, maxInput) {
    let stateCodes = searchInput.split(',');
    console.log(stateCodes);
    let stateCodesString = '';
    for (let i = 0; i < stateCodes.length; i++) {
        if (stateCodes.length > 1) {
        stateCodesString += `${stateCodes[i].trim().toUpperCase()},`
        } else {
            stateCodesString += `${stateCodes[i].trim().toUpperCase()}`
  
        }
    }
    console.log(stateCodesString);
    let requestUrl = `${baseUrl}?stateCode=${stateCodesString}&limit=${maxInput}&api_key=${apiKey}`;
    console.log(requestUrl);

    fetch(requestUrl, {
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(response => response.json())
        .then(responseJson => displayParkResults(responseJson))

}

function watchForm() {
    $('#searchForm').on('submit', function (event) {
        event.preventDefault();
        const searchInput = $('#searchTerm').val();
        const maxInput = $('#maxResults').val();
        getParks(searchInput, maxInput);
    });
}

$(watchForm);