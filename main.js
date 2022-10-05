function saveToLocalStorage(event) {
    event.preventDefault();
    const name = event.target.username.value;
    const email = event.target.emailId.value;
    const phonenumber = event.target.phonenumber.value;
    
    const obj = {
        name,
        email,
        phonenumber
    }

    axios.post("https://crudcrud.com/api/73bbc8fc45d44ca49a938c9ab446b66b/appointmentData",obj)
    .then((response) => {
        showNewUserOnScreen(response.data)
        //console.log(response)
    })
    .catch((err) => {
        document.body.innerHTML = document.body.innerHTML + "<h4> Something Went Wrong </h4>"
        console.log(err)
    })
  
}

window.addEventListener("DOMContentLoaded", () => {
    axios.get("https://crudcrud.com/api/73bbc8fc45d44ca49a938c9ab446b66b/appointmentData")
    .then((response) => {
        console.log(response)

        for(var i=0; i< response.data.length; i++){
            showNewUserOnScreen(response.data[i])
        }
    })
    .catch((error) => {
        console.log(error)
    })
  
})

function showNewUserOnScreen(user){
    document.getElementById('email').value = '';
    document.getElementById('username').value = '';
    document.getElementById('phonenumber').value ='';
   
    if(localStorage.getItem(user.email) !== null){
        removeUserFromScreen(user.email)
    }

    const parentNode = document.getElementById('listOfUsers');
    const childHTML = `<li id=${user.email}> ${user.name} - ${user.email}
                            <button onclick=deleteUser('${user.email}')> Delete User </button>
                            <button onclick=editUserDetails('${user.email}','${user.name}','${user.phonenumber}')>Edit User </button>
                         </li>`

    parentNode.innerHTML = parentNode.innerHTML + childHTML;
}



function editUserDetails(emailId, name, phonenumber){

    document.getElementById('email').value = emailId;
    document.getElementById('username').value = name;
    document.getElementById('phonenumber').value =phonenumber;

    deleteUser(emailId)
 }



function deleteUser(emailId){
    console.log(emailId)
    localStorage.removeItem(emailId);
    removeUserFromScreen(emailId);

}

function removeUserFromScreen(emailId){
    const parentNode = document.getElementById('listOfUsers');
    const childNodeToBeDeleted = document.getElementById(emailId);
    if(childNodeToBeDeleted) {
        parentNode.removeChild(childNodeToBeDeleted)
    }
}
