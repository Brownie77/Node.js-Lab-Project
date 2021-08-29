const currentPatientNameforDoctor = document.getElementById("doctors-current-patient");
const currentPatientNameforPatient = document.getElementById("patient-current-patient");
const resolutionText = document.getElementById("resolutionForDoctor");
let patientData = [];
let queue = [];
//addNewPatient - добавить провеку на наличие имени в списке, если есть = добавить предуприждение 

window.onload = async function () {
    try {
        const response = await fetch('http://localhost:3000/api/patient/current');
        let currentPatient = await response.json();
        if (currentPatient === null) {
            if (window.location.pathname === '/doctor.html') {
                currentPatientNameforDoctor.textContent = "Queue is empty";
            } else {
                currentPatientNameforPatient.textContent = "Queue is empty";
            }
        } else {
            if (window.location.pathname === '/doctor.html') {
                currentPatientNameforDoctor.textContent = currentPatient;
            } else {
                currentPatientNameforPatient.textContent = currentPatient;;
            }
        }
    } catch (error) {
        console.error('Ошибка:', error);
    }
}

async function addNewPatient() {
    let addPatientInputValue = document.getElementById("addPatient").value;
    if (patientData.find(patient => patient.name === addPatientInputValue) || addPatientInputValue === '') {
        document.getElementById("addPatient").value = '';
    } else {
        document.getElementById("addPatient").value = '';
        const data = {
            "name": addPatientInputValue
        };
        try {
            const response = await fetch(`http://localhost:3000/api/patient`, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            let newPatient = await response.json();
            console.log(newPatient)
            currentPatientNameforPatient.textContent = newPatient;
            // currentPatientNameforDoctor.textContent = newPatient;
        } catch (error) {
            console.error('Ошибка:', error);
        }
    }

}


async function nextPatient() {
    try {
        let response = await fetch('http://localhost:3000/api/patient/next');
        let currentPatient = await response.json();
        console.log(currentPatient)
        // checkLifetime();
        if (currentPatient === null) {
            currentPatientNameforDoctor.textContent = "Queue is empty";
            currentPatientNameforPatient.textContent = "Queue is empty";
        } else {
            currentPatientNameforDoctor.textContent = currentPatient;
            // currentPatientNameforPatient.textContent = currentPatient;

        }
    } catch (error) {
        console.error('Ошибка:', error);
    }
}

async function getResolutionForPatient() {
    let resolutionText = document.getElementById("resolutionForPatient");
    let searchResolutionInputValue = document.getElementById("resolution-search-input-patient").value;
    let resolutionWrap = document.getElementById("patient-resolution-info");
    document.getElementById("resolution-search-input-patient").value = '';
    if (resolutionText !== null) resolutionText.remove();
    const data = {
        "name": searchResolutionInputValue
    };
    try {
        const response = await fetch('http://localhost:3000/api/resolution/get', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            }
        });
        let searchedResolution = await response.json();
        resolutionWrap.insertAdjacentHTML('beforeend', `<p id='resolutionForPatient'>${searchedResolution}</p`);

    } catch (error) {
        console.error('Ошибка:', error);
    }
}



async function setResolution() {
    let addExpireInputValue = document.getElementById("expireInput").value;
    const data = {
        "resolution": document.getElementById("set-resolution").value,
    };
    try {
        const response = await fetch(`http://localhost:3000/api/resolution?expire=${addExpireInputValue}`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            }
        });
        document.getElementById("set-resolution").value = "Patient resolution was successfully updated";
    } catch (error) {
        console.error('Ошибка:', error);
    }
}

async function getResolutionForDoctor() {
    let searchResolutionInputValue = document.getElementById("resolution-search-input").value;
    let resolutionWrap = document.getElementById("doctor-resolution-info");
    if (resolutionText !== null) {
        resolutionText.remove();
    }
    const data = {
        "name": searchResolutionInputValue
    };
    try {
        const response = await fetch('http://localhost:3000/api/resolution/get', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            }
        });
        let searchedResolution = await response.json();
        resolutionWrap.insertAdjacentHTML('beforeend', `<p id='resolutionForDoctor'>${searchedResolution}</p`);

    } catch (error) {
        console.error('Ошибка:', error);
    }
}


async function deleteResolution() {
    let searchResolutionInputValue = document.getElementById("resolution-search-input").value;
    if (resolutionText !== null) resolutionText.remove();
    try {
        const response = await fetch(`http://localhost:3000/api/resolution/${searchResolutionInputValue}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        let deletedResolution = await response.json();
        console.log(deletedResolution);
    } catch (error) {
        console.error('Ошибка:', error);
    }
}
