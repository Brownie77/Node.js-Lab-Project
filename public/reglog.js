async function createUser() {
    document.getElementById("create-user-form").addEventListener("click", function (event) {
        event.preventDefault()
    });
    const formData = new FormData(document.getElementById("create-user-form"));
    const dataTransfer = {};
    for (let pair of formData.entries()) {
        Object.defineProperty(dataTransfer, pair[0].toString(), {
            value: pair[1],
            enumerable: true
        })
    }
  
    console.log(dataTransfer, JSON.stringify(dataTransfer))
    try {
        const response = await fetch('http://localhost:3000/api/registration', {
            method: 'POST',
            body: JSON.stringify(dataTransfer),
            headers: {
                'Content-Type': 'application/json',
            }
        });
    let token = await response.json();
    console.log(token)
    } catch (error) {
        console.log(error)

    }
}


async function loginUser() {
    document.getElementById("login-user-form").addEventListener("click", function (event) {
        event.preventDefault()
    });
    const formData = new FormData(document.getElementById("login-user-form"));
    const dataTransfer = {};
    for (let pair of formData.entries()) {
        Object.defineProperty(dataTransfer, pair[0].toString(), {
            value: pair[1],
            enumerable: true
        })
    }
    try {
        const response = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            body: JSON.stringify(dataTransfer),
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if(response.status === 200) {
            const user = await response.json();
            window.location.replace(`http://localhost:3000/static/patient.html?${user.id}`);
        }
    } catch (error) {

    }
  
}