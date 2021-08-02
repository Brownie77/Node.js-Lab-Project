let queue = [];
const patientData = [{
    name: 'Fyodor',
    resolution: 'sick sick sick'
}, {
    name: 'Kirill',
    resolution: 'health, health, health'
}];

function addNewPatient() {
    // Selecting the input element and get its value 
    let inputVal = document.getElementById("addPatient").value;
    queue.unshift(inputVal);
    patientData.push({
        name: inputVal,
        resolution: "empty"
    })
    let currentPatientName = document.getElementById("patient-current-patient")
    currentPatientName.textContent = queue[0];
}


function nextPatient() {
    let currentPatientName = document.getElementById("doctors-current-patient")
    if (queue.length === 0) {
        currentPatientName.textContent = "Queue is empty";
    } else {
        currentPatientName.textContent = queue[0];
        queue.shift();
        console.log(queue);
    }
}

function getResolutionForPatient() {
    let resolutionText = document.getElementById("resolutionForPatient");
    let inputValue = document.getElementById("resolution-search-input-patient").value;
    let resolutionWrap = document.getElementById("patient-resolution-info");
    document.getElementById("resolution-search-input-patient").value = '';
    if (resolutionText !== null) resolutionText.remove();
    for (let i = 0; i < patientData.length; i++) {
        if (patientData[i].name === inputValue) {
            resolutionWrap.insertAdjacentHTML('beforeend', `<p id='resolutionForPatient'>${patientData[i].resolution}</p`);
            break;
        }
    }
}



function setResolution() {
    patientData.forEach(patient => {
        if (patient.name === queue[0]) {
            patient.resolution = document.getElementById("set-resolution").value;
            console.log(patient);
        }
    })
    // let currentPatient = patientData.find(patient => patient.name === queue[0]).resolution
}



function getResolutionForDoctor() {
    let resolutionText = document.getElementById("resolutionForDoctor");
    let inputValue = document.getElementById("resolution-search-input").value;
    let resolutionWrap = document.getElementById("doctor-resolution-info");
    document.getElementById("resolution-search-input").value = '';
    if (resolutionText !== null) resolutionText.remove();
    for (let i = 0; i < patientData.length; i++) {
        if (patientData[i].name === inputValue) {
            resolutionWrap.insertAdjacentHTML('beforeend', `<p id='resolutionForDoctor'>${patientData[i].resolution}</p`);
            break;
        }
    }
}


function deleteResolution() {
    let resolutionText = document.getElementById("resolutionForDoctor");
    if (resolutionText !== null) resolutionText.remove();
    patientData.forEach(patient => {
        if (patient.name === queue[0]) {
            patient.resolution = '';
            console.log(patient);
        }
    })
}