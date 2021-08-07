let queue = [];
let patientData = [];
const currentPatientNameforDoctor = document.getElementById("doctors-current-patient");
const currentPatientNameforPatient = document.getElementById("patient-current-patient");
const resolutionText = document.getElementById("resolutionForDoctor");

//addNewPatient - добавить провеку на наличие имени в списке, если есть = добавить предуприждение 


function checkLifetime() {
    const lifetime = 10000;
    let currentTime = new Date();
    patientData = patientData.filter(patient => Date.parse(currentTime) - Date.parse(patient.creationDate) < lifetime);
    queue = [];
    patientData.forEach(patient => queue.push(patient.name));
    return patientData;
}

function addNewPatient() {
    checkLifetime();
    let addPatientInputValue = document.getElementById("addPatient").value;
    if (patientData.find(patient => patient.name === addPatientInputValue) || addPatientInputValue === '') {
        document.getElementById("addPatient").value = '';
        console.log(queue);
    } else {
        document.getElementById("addPatient").value = '';
        queue.push(addPatientInputValue);
        currentPatientNameforDoctor.textContent = queue[0];
        currentPatientNameforPatient.textContent = queue[0];
        console.log(queue);
        patientData.push({
            name: addPatientInputValue,
            resolution: "empty",
            creationDate: new Date()
        })
    }

}


function nextPatient() {
    checkLifetime();
    if (queue.length === 1) {
        currentPatientNameforDoctor.textContent = "Queue is empty";
        currentPatientNameforPatient.textContent = "Queue is empty";
    } else {
        queue.shift();
        currentPatientNameforDoctor.textContent = queue[0];
        currentPatientNameforPatient.textContent = queue[0];
        console.log(queue.length, queue);

    }
}

function getResolutionForPatient() {
    let resolutionText = document.getElementById("resolutionForPatient");
    let searchResolutionInputValue = document.getElementById("resolution-search-input-patient").value;
    let resolutionWrap = document.getElementById("patient-resolution-info");
    document.getElementById("resolution-search-input-patient").value = '';
    if (resolutionText !== null) resolutionText.remove();
    for (let i = 0; i < patientData.length; i++) {
        if (patientData[i].name === searchResolutionInputValue) {
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
}



function getResolutionForDoctor() {
    let searchResolutionInputValue = document.getElementById("resolution-search-input").value;
    let resolutionWrap = document.getElementById("doctor-resolution-info");
    document.getElementById("resolution-search-input").value = '';
    if (resolutionText !== null) {
        resolutionText.remove();
    }
    for (let i = 0; i < patientData.length; i++) {
        if (patientData[i].name === searchResolutionInputValue) {
            resolutionWrap.insertAdjacentHTML('beforeend', `<p id='resolutionForDoctor'>${patientData[i].resolution}</p`);
            break;
        }
    }
}


function deleteResolution() {
    if (resolutionText !== null) resolutionText.remove();
    patientData.forEach(patient => {
        if (patient.name === queue[0]) {
            patient.resolution = '';
            console.log(patient);
        }
    })
}