let form=document.getElementById('formData')


let dataOfForm;
form.addEventListener('submit',async(event)=>{
    event.preventDefault();

    console.log("form submitted");
    
    //collect form data 
    dataOfForm=new FormData(form)
    console.log(dataOfForm);
    const db=Object.fromEntries(dataOfForm)
    


    try {
        // Use fetch API to send a POST request
        const response = await fetch('http://localhost:8092/api/register', {
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
            alert('Data submitted successfully!');
        } else {
            console.error('Error:', response.statusText);
            alert('Failed to submit data!');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while submitting data!');
    }

})