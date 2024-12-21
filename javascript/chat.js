const form = document.querySelector('.chat-area .typing-area'),
      inputField = form.querySelector('.input-field'),
      sendBtn = form.querySelector('button[type="submit"]'),
      encryptBtn = form.querySelector('#encrypt-btn'), // Encryption button
      chatBox = document.querySelector('.chat-area .chat-box'),
      uploadBtn = form.querySelector('#upload-btn'),
      imageInput = form.querySelector('#image-upload');

let isEncrypted = false; // Flag to track if the message is encrypted
let imageURL = ''; // Store the uploaded image URL

// Prevent form submission
form.onsubmit = (e) => {
    e.preventDefault();
};

// Encrypt and Send
encryptBtn.onclick = () => {
    const password = prompt("Enter a password to encrypt your message:");
    if (password && inputField.value.trim() !== "") {
        const encryptedMessage = btoa(inputField.value + ":" + password); // Encrypt message
        inputField.value = encryptedMessage; // Replace input with encrypted message
        isEncrypted = true; // Set flag to true
    } else {
        alert("Please provide a password and a message!");
    }
};

// Trigger the file input when the upload button is clicked
uploadBtn.onclick = () => {
    imageInput.click();
};

// Handle file selection
imageInput.onchange = (e) => {
    const file = e.target.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = function() {
            imageURL = reader.result; // Store the image as a data URL
            inputField.value = ''; // Clear the text input
            inputField.placeholder = 'Image attached...'; // Indicate that image is attached
        }

        reader.readAsDataURL(file); // Convert the file to a data URL
    }
};

// Inserting chat message into the database
sendBtn.onclick = () => {
    let message = inputField.value.trim();
    const image = imageURL ? imageURL : ''; // Use image URL if an image is uploaded
    const isEncryptedValue = isEncrypted ? 1 : 0; // Set is_encrypted flag

    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'php/chat-insert.php', true);
    xhr.onload = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                inputField.value = ""; // Clear input field
                imageURL = ''; // Reset image URL
                inputField.placeholder = 'Type a message here'; // Reset placeholder
                scrollToBottom();
                isEncrypted = false; // Reset flag after sending
            }
        }
    };

    let formData = new FormData(form);
    formData.append("is_encrypted", isEncryptedValue); // Append the encryption flag
    formData.append("image", image); // Append image data if exists
    xhr.send(formData);
};

// Fetching chat messages dynamically
setInterval(() => {
    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'php/chat-get.php', true);
    xhr.onload = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                let data = xhr.response;
                chatBox.innerHTML = data;

                if (!chatBox.classList.contains('active')) {
                    scrollToBottom();
                }
            }
        }
    };
    let formData = new FormData(form);
    xhr.send(formData);
}, 500);

// Scroll to bottom
function scrollToBottom() {
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Decrypt messages if needed
document.addEventListener("click", (event) => {
    if (event.target.classList.contains("decrypt-btn")) {
        const encryptedMsgElement = event.target.previousElementSibling;
        const encryptedMsg = encryptedMsgElement.dataset.msg;
        const password = prompt("Enter the password to decrypt the message:");

        if (password) {
            try {
                const decryptedMessage = atob(encryptedMsg).split(":");
                if (decryptedMessage[1] === password) {
                    showDecryptedDialog(decryptedMessage[0]);
                } else {
                    alert("Incorrect password!");
                }
            } catch (e) {
                alert("Failed to decrypt the message.");
            }
        }
    }
});

// Function to display decrypted message in a dialog
function showDecryptedDialog(message) {
    let dialog = document.querySelector("dialog");
    if (!dialog) {
        dialog = document.createElement("dialog");
        dialog.classList.add("decrypted-dialog");
        document.body.appendChild(dialog);
    }

    dialog.innerHTML = `
        <h3>Decrypted Message</h3>
        <p>${message}</p>
        <button id="close-dialog">Close</button>
    `;

    dialog.showModal();

    document.getElementById("close-dialog").onclick = () => dialog.close();
}
