// Listen for submit
document.querySelector('#zipForm').addEventListener
('submit', getLocationInfo);

// Listen for delete
document.querySelector('body').addEventListener
('click', deleteLocation);

let selectedValue;
function getSelectValue() {
    selectedValue = document.getElementById("list").value;
    // console.log(selectedValue);
}

getSelectValue();

function getLocationInfo(e) {
    // Get zip value from input
    zip = document.querySelector('.zip').value;
    // Make request
    fetch(`https://api.zippopotam.us/${selectedValue}/${zip}`)
        .then(response => {
            if (response.status !== 200) {
                showIcon('remove');
                document.querySelector('#output').innerHTML =
                    `<article class="message is-danger"><div class="message-body">Invalid zip code. Please try again!</div></article>`;
                throw Error(response.statusText);
            } else {
                showIcon('check');
                return response.json();
            }
        })
        .then(date => {
            // Show location info
            let output = '';
            date.places.forEach(place => {
                output += `
                    <article class="message is-primary">
                        <div class="message-header">
                            <p>Location Info</p>
                            <button class="delete"></button>
                        </div>
                        <div class="message-body">
                            <ul>
                                <li><strong>City:</strong> ${place['place name']}</li>
                                <li><strong>State:</strong> ${place['state']}</li>
                                <li><strong>Latitude:</strong> ${place['latitude']}</li>
                                <li><strong>Longitude:</strong> ${place['longitude']}</li>
                            </ul>
                        </div>
                    </article>`;
            });
            // Insert Into output div
            document.querySelector('#output').innerHTML = output;
            //console.log(date);
        })
        .catch(err => console.log(err));
    e.preventDefault();

}

// show check or remove icon
function showIcon(icon) {
    // Clear icons
    document.querySelector('.icon-remove')
        .style.display = "none";
    document.querySelector('.icon-check')
        .style.display = "none";

    // Show correct icons
    document.querySelector(`.icon-${icon}`)
        .style.display = "inline-flex";
}

// delete location box
function deleteLocation(e) {
    if (e.target.className === 'delete') {
        document.querySelector('.message').remove();
        document.querySelector('.zip').value = '';
        document.querySelector('.icon-check').style.display = "none";
    }

}



























