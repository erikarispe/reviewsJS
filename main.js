class User {
    constructor(usericon, username, usertitle, userreview) {
        this.usericon = usericon;
        this.username = username;
        this.usertitle = usertitle;
        this.userreview = userreview;
    }
}

///////////
///////////
let users = [];

/////////
//////////Saveusers

function saveUsers() {
    localStorage.setItem('users', JSON.stringify(users));
}

function addUserAndSave(usericon, username, usertitle, userreview) {
    const newUser = new User(usericon, username, usertitle, userreview);
    users.push(newUser);
    saveUsers();
}

function loadUsers() {
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
        users = JSON.parse(storedUsers);
    }
}



///////////////////////////
/////////////////////////// DELETE
function deleteUserAndSave(index) {
    users.splice(index, 1); // Remove the user at the specified index
    if (users.length === 0) {
        localStorage.removeItem('users'); // Clear localStorage if no users left
    } else {
        saveUsers(); // Save the updated users array back to localStorage
    }
    currentIndex = 0; // Reset currentIndex to prevent displaying a deleted user
    updateUserDetails(); // Update the displayed user
}
//////////////
/////////////
let currentIndex = 0;

function updateUserDetails() {
    if (users.length === 0) {
        // If there are no users, clear the user details
        document.querySelector('.usericon').textContent = '';
        document.querySelector('.username').textContent = '';
        document.querySelector('.usertitle').textContent = '';
        document.querySelector('.userreview').textContent = '';
    } else {
        const currentUser = users[currentIndex];
        document.querySelector('.usericon').textContent = currentUser.usericon;
        document.querySelector('.username').textContent = currentUser.username;
        document.querySelector('.usertitle').textContent = currentUser.usertitle;
        document.querySelector('.userreview').textContent = currentUser.userreview;
    }
}

/////////
//////////

document.addEventListener('DOMContentLoaded', () => {
    loadUsers();
    updateUserDetails();
    console.log('user displayed');

    // Add event listener to delete button
    document.querySelector('#delete').addEventListener('click', function(event) {
        event.preventDefault();
        deleteUserAndSave(currentIndex);
        console.log('Deleted user at index', currentIndex);
    });
});

document.querySelector('#userinput').addEventListener('submit', function(event) {
    event.preventDefault();

    const usericoninput = document.querySelector('#usericoninput').value;
    const usernameinput = document.querySelector('#usernameinput').value;
    const usertitleinput = document.querySelector('#usertitleinput').value;
    const userreviewinput = document.querySelector('#userreviewinput').value;

    addUserAndSave(usericoninput, usernameinput, usertitleinput, userreviewinput);
    updateUserDetails();

    // Clear input fields after adding user
    document.getElementById("usericoninput").value = "";
    document.getElementById("usernameinput").value = "";
    document.getElementById("usertitleinput").value = "";
    document.getElementById("userreviewinput").value = "";

    console.log("Updated users array:", users);
    console.log(localStorage);
});

//////
////// left and right buttons

document.querySelector('.buttonleft').addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + users.length) % users.length;
    updateUserDetails();
    console.log('previous user');
});

document.querySelector('.buttonright').addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % users.length;
    updateUserDetails();
    console.log('next user');
});
