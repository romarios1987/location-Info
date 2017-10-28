document.querySelector('#zipForm').addEventListener
('submit', getLocationInfo);


function getLocationInfo(e) {

    // Get zip value from input
    const zip = document.querySelector('.zip').value;



    // Make request
    fetch(`http://api.zippopotam.us/us/${zip}`)
        .then(response => response.json())
        .then(date => {
        console.log(date);
    });
    e.preventDefault();
}