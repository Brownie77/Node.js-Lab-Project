let queue = [];

let currentPatient = queue[0];
const patientData = [];
//addNewPatient - добавить провеку на наличие имени в списке, если есть = добавить предуприждение 
function addNewPatient() {
    let inputVal = document.getElementById("addPatient").value;
    let currentPatientNameDoc = document.getElementById("doctors-current-patient");
    let currentPatientName = document.getElementById("patient-current-patient");
    if (patientData.find(patient => patient.name === inputVal)) {
        document.getElementById("addPatient").value = '';
        console.log("есть совпадение")
        console.log(queue);
    } else {
        document.getElementById("addPatient").value = '';
        queue.push(inputVal);
        currentPatientNameDoc.textContent = queue[0];
        currentPatientName.textContent = queue[0];
        console.log(queue);
        patientData.push({
            name: inputVal,
            resolution: "empty"
        })
    }

}


function nextPatient() {
    let currentPatientName = document.getElementById("doctors-current-patient")
    let currentPatientNameForPatient = document.getElementById("patient-current-patient")
    if (queue.length === 1) {
        currentPatientName.textContent = "Queue is empty";
        currentPatientNameForPatient.textContent = "Queue is empty";
    } else {
        queue.shift();
        currentPatientName.textContent = queue[0];
        currentPatientNameForPatient.textContent = queue[0];
        console.log(queue.length, queue);

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