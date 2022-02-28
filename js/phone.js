const loadData = () => {

    // getting input 
    const inputText = document.getElementById('inputText').value;
    document.getElementById('displaySection').textContent = '';
    document.getElementById('detailsSection').textContent = '';
    spinner('block')

    // fetching data 

    url = `https://openapi.programming-hero.com/api/phones?search=${inputText}`


    fetch(url)
        .then(res => res.json())
        .then(phone => displayData(phone.data))

}

const displayData = data => {
    console.log(data)
    const parent = document.getElementById('displaySection');
    parent.textContent = '';

    if (data.length == 0) {
        console.log('error')
        resultShow('block')
        spinner('none')
    }

    else {
        data.slice(0, 20).forEach(phone => {

            const div = document.createElement('div')
            div.classList.add('col')
            div.innerHTML = `
            <div class="card w-75 mx-auto pt-3 rounded border-0">
                <img src="${phone.image}" class="card-img-top w-50 mx-auto " alt="no image found">
                <div class="card-body">
                <h5 class="card-title text-center">${phone.brand}</h5>
                <h5 class="card-title text-center">${phone.phone_name}</h5>

                <div class="d-flex justify-content-center border-none">
                    <button class="border btn-danger py-2 px-3 rounded" onclick="loadDetail('${phone.slug}')">Details</button>
                </div>

                </div>
            </div>
        `
            parent.appendChild(div);
        })
        spinner('none')
        resultShow('none')
    }

}

// getting the id and loading it 
const loadDetail = id => {

    url = `https://openapi.programming-hero.com/api/phone/${id}`

    fetch(url)
        .then(res => res.json())
        .then(details => displayDetails(details.data))
}

// showing details in ui 
const displayDetails = data => {

    console.log(data)
    const parent = document.getElementById('detailsSection')
    parent.textContent = ''

    const sensors = data.mainFeatures.sensors

    const ul = document.createElement('ul')
    for (const sensor of sensors) {
        const li = document.createElement('li')
        li.innerText = sensor;
        console.log(sensor);
        ul.appendChild(li)
    }


    const div = document.createElement('div');
    div.classList.add('col')
    div.innerHTML = `
            <div class="card w-100 mx-auto border-0">
                <img src="${data.image}" class="card-img-top w-50 mx-auto" alt="...">
                <div class="card-body text-center mx-auto">
                    <h5 class="card-title">${data.name}</h5>
                    <h5 class="card-title">${data.releaseDate ? data.releaseDate : "Release Date Not Found"}</h5>
                    <h2>Others</h2>
                    <h5>WLAN : ${data.others?.WLAN ? data.others.WLAN : "Not Found"} </h5>
                    <h5>BLUETOOTH : ${data.others?.Bluetooth ? data.others.Bluetooth : "Not Found"}</h5>
                    <h5>GPS :${data.others?.GPS ? data.others.GPS : "Not Found"} </h5>
                    <h5>NFC :${data.others?.NFC ? data.others.NFC : "Not Found"} </h5>
                    <h5>Radio :${data.others?.Radio ? data.others.Radio : "Not Found"} </h5>
                    <h5>USB : ${data.others?.USB ? data.others.USB : "Not Found"}</h5>
 

                    <h5>Sensors</h5>
                    <ul>${ul.innerHTML}</ul>
                </div>
            </div>
    `

    parent.appendChild(div)
}







// For showing result 
const resultShow = displayStyle => {
    document.getElementById('result').style.display = displayStyle
}
// For spinner 
const spinner = displayStyle => {
    document.getElementById('spinner').style.display = displayStyle
}
