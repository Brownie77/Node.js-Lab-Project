let queue = [];
function addNewPatient(){
    // Selecting the input element and get its value 
    let inputVal = document.getElementById("addPatient").value;
    queue.unshift(inputVal);
    let patientNameOutput = document.getElementsByClassName("output-info");
    for (let i = 0; i < patientNameOutput.length; i++) {
        patientNameOutput[i].textContent = queue[0];
    }
}


