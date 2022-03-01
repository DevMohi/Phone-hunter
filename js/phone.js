// loading the initial data from api 

const loadData = () => {
    // getting input 
    const inputText = document.getElementById('inputText').value;
    document.getElementById('displaySection').textContent = '';
    document.getElementById('detailsSection').textContent = '';
    spinner('block');

    // fetching data, if there is no data it will show error
    if (inputText == "") {
        spinner('none')
        resultShow('block')
    }

    else {
        url = `https://openapi.programming-hero.com/api/phones?search=${inputText}`
        fetch(url)
            .then(res => res.json())
            .then(phone => displayData(phone.data))
    }

}

// displaying the details in ui 
const displayData = data => {
    console.log(data)
    const parent = document.getElementById('displaySection');
    parent.textContent = '';

    // if the search input is not correct it will not show any phones 

    if (data.length == 0) {
        console.log('error');
        resultShow('block');
        spinner('none');
    }

    else {
        data.slice(0, 20).forEach(phone => {

            const div = document.createElement('div')
            div.classList.add('col')
            div.innerHTML = `
            <div class="card w-75 mx-auto pt-3 rounded border-0">
                <img src="${phone.image}" class="card-img-top w-50 mx-auto "  alt="no image found">
                <div class="card-body">
                <h5 class="card-title text-center">${phone.brand}</h5>
                <h5 class="card-title text-center">${phone.phone_name}</h5>

                <div class="d-flex justify-content-center border-none" >
                    <a class="border btn-dark py-2 px-3 rounded text-white" href="#detailsSection" style="text-decoration: none;" onclick="loadDetail('${phone.slug}')">Details</a>
                </div>

                </div>
            </div>
        `
            parent.appendChild(div);
        })
        spinner('none');
        resultShow('none');
    }

}

// using the id of the phone and loading more details 
const loadDetail = id => {

    url = `https://openapi.programming-hero.com/api/phone/${id}`

    fetch(url)
        .then(res => res.json())
        .then(details => displayDetails(details.data))
}

// showing details in ui using the data got from id
const displayDetails = data => {

    console.log(data);
    const parent = document.getElementById('detailsSection');
    parent.textContent = '';

    const sensors = data.mainFeatures.sensors;

    const ul = document.createElement('ul')

    //for looping the sensors and appending it directly to a ul and finally set it to a innerHTML
    for (const sensor of sensors) {
        const li = document.createElement('li')
        li.innerText = sensor;
        console.log(sensor);
        ul.appendChild(li);
    }


    const div = document.createElement('div');
    div.classList.add('col')
    div.innerHTML = `
        <div class="card mb-3 py-3 border-3 rounded border-dark">
            <div class="row">
                <div class="col-md-4 d-flex justify-content-center">
                    <img src="${data.image}" class="" alt="...">
                </div>

                <div class="col-md-8 py-2">
                    <div class="detailsCard py-1">
                        <h1 class="card-title">${data.brand}</h1>
                        <h1 class="card-title">${data.name}</h1>
                        <h5 class = "fw-bold">${data.releaseDate ? data.releaseDate : "Release Date Not Found"}</h5> <br>

                         <div class = "main-section">
                            <h2>Main Features</h2>
                            <h5><span class = "fw-bold">storage</span>: ${data.mainFeatures.storage} </h5>
                            <h5><span class = "fw-bold ">displaySize</span>: ${data.mainFeatures.displaySize} </h5> 
                            <h5><span class = "fw-bold">chipSet</span>: ${data.mainFeatures.chipSet} </h5>
                            <h5><span class = "fw-bold">memory</span>: ${data.mainFeatures.memory} </h5>
                            <div class = "d-flex dropdownSection">
                                <div class="dropdown py-2">
                                    <button class="btn btn-dark dropdown-toggle" type="button" id="dropdownMenuButton1"
                                        data-bs-toggle="dropdown" aria-expanded="false">
                                        Sensor
                                    </button>
                                    <ul class="dropdown-menu ps-2 pe-2" aria-labelledby="dropdownMenuButton1">
                                        ${ul.innerHTML}
                                    </ul>
                                    
                                </div>
                                <div class="dropdown py-2 mx-2">
                                    <button class="btn btn-dark dropdown-toggle" type="button" id="dropdownMenuButton1"
                                        data-bs-toggle="dropdown" aria-expanded="false">
                                        Others
                                    </button>
                                        <ul class="dropdown-menu ps-2 pe-2" aria-labelledby="dropdownMenuButton1 ">
                                            <li>WLAN: ${data.others?.WLAN ? data.others.WLAN : "Not Found"} </li>
                                            <li>BLUETOOTH: ${data.others?.Bluetooth ? data.others.Bluetooth : "Not Found"}</li>
                                            <li>GPS: ${data.others?.GPS ? data.others.GPS : "Not Found"} </li>
                                            <li>NFC: ${data.others?.NFC ? data.others.NFC : "Not Found"} </li>
                                            <li>Radio: ${data.others?.Radio ? data.others.Radio : "Not Found"} </li>
                                            <li>USB: ${data.others?.USB ? data.others.USB : "Not Found"}</li>
                                        </ul>
                                </div>
                         </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>

    
        `
    parent.appendChild(div);

}

// For showing result 
const resultShow = displayStyle => {
    document.getElementById('result').style.display = displayStyle
}
// For spinner 
const spinner = displayStyle => {
    document.getElementById('spinner').style.display = displayStyle
}
