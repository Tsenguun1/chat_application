const form = document.querySelector('.signup form'),
      continueBtn = form.querySelector('.button input'),
      errorText = form.querySelector('.error-txt');

form.onsubmit = (e) => {
    e.preventDefault(); // Prevent form from submitting normally
}

continueBtn.onclick = () => {
    // AJAX
    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'php/login.php', true);
    xhr.onload = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                let data = xhr.response;
                console.log(data); // Debugging the response
                if (data.trim() === 'SUCCESS!') {
                    location.href = 'users.php';
                } else {
                    errorText.textContent = data;
                    errorText.style.display = 'block';
                }
            }
        }
    };
    
    // Sending form data through ajax to PHP
    let formData = new FormData(form);
    xhr.send(formData);
}
