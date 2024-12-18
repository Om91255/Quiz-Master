let form=document.getElementById('formData')

let dataOfForm;
form.addEventListener('submit',async(event)=>{
    event.preventDefault();

    //collect form data 
    dataOfForm=new FormData(form)
    console.log(dataOfForm);
    const db=Object.fromEntries(dataOfForm)
    console.log(db);

    //for admin
    let inputUsername=db.username;
    let inputPassword=db.password
 
    if (inputUsername === "admin" && inputPassword === "1234567") {
        window.location.href = "./Admin.html";  // Redirect to admin.html if credentials match
        return ;
    } 


    try {
        // Use fetch API to send a POST request
        const response = await fetch('http://localhost:8092/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Encode form data
            },
            body: JSON.stringify(db),
        });

        // Check if the response is okay
        if (response.ok) {
            const result = await response.json();
            console.log('Success:', result);
            alert('Login successfully DONE!');
        } else {
            console.error('Error:', response.statusText);
            alert('LOGIN FAILED!');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Login Failed..Try Again!');
    }

})