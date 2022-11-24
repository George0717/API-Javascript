let listUser = document.getElementById("listUser")
let email = document.getElementById("email")
let name = document.getElementById("name")
let gender = document.getElementById("gender")
let status = document.getElementById("status")
let alert = document.getElementById("alert")
let btn = document.getElementById('button')
let dataForm = document.getElementById('form')


getUser()

function getUser() {
    fetch("https://gorest.co.in/public/v2/users/" , {
        headers:{
            Authorization: "Bearer ab03f0e11af4e49674af3f684717a0f9b89ac98ccc28f7bf729adb5410707a83"
        }
    })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            data.forEach(showUser)
        })
        .catch(error => {
            console.log(error)
        });
}

function showUser(value, index) {
    listUser.innerHTML += `<tr>
    <td>${value.email}</td>
    <td>${value.name}</td>
    <td>${value.gender}</td>
    <td>${value.status}</td>
    <td><button class="btn btn-info" onclick="editUser(${value.id})">Edit</button></td>
    <td><button class="btn btn-danger" onclick="deleteUser(${value.id})">Delete</button></td>
    </tr>`
}

function deleteUser(id) {
    console.log("Hapus data id: " + id)
    fetch("https://gorest.co.in/public/v2/users/" + id, {
            method: "DELETE",
            headers: {
                
                'Authorization': "Bearer ab03f0e11af4e49674af3f684717a0f9b89ac98ccc28f7bf729adb5410707a83"
            }
        })
        .then(response => {
            console.log(response)
            listUser.innerHTML = "" // kosongkan tabel list user
            getUser() // panggil function getUser()
        })
        .catch(error => {
            console.log(error)
        })
}

function createUser(statusSimpan = 0, id = 0){
    if(statusSimpan == 0){
        console.log("Hapus data id: " + id)
    fetch("https://gorest.co.in/public/v2/users/" + id, {
            method: "POST",
            headers: {
                'Content-Type' : 'application/json',
                Authorization: "Bearer ab03f0e11af4e49674af3f684717a0f9b89ac98ccc28f7bf729adb5410707a83"
            },
            body: JSON.stringify({
                "email" : email.value,
                "name" : name.value,
                "gender" : gender.value,
                "status" : status.value,
            })
        })
        .then(response => {
           response.json()
           if(response.status == 201){
            alert.innerHTML = `
            <div class="alert alert-success" role="alert">
            Data Berhasil Disimpan
          </div>`
           }
           else{
            alert.innerHTML = `
            <div class="alert alert-danger" role="alert">
            Data Gagal Disimpan
          </div>`
           }
        })
       
        .then(results => {
            console.log(results)
        })
        .catch(error => {
            console.log(error)
        })
        // Mengubah Attribute OnClick
      

    }
    else{
        fetch("https://gorest.co.in/public/v2/users/" + id, {
            method: "PUT",
            headers: {
                'Content-Type' : 'application/json',
                'Authorization': "Bearer ab03f0e11af4e49674af3f684717a0f9b89ac98ccc28f7bf729adb5410707a83"
            },
            body: JSON.stringify({
                "email" : email.value,
                "name" : name.value,
                "gender" : gender.value,
                "status" : status.value,
            })
            
        })
        .then(response => {
            response.json()
            if(response.status == 200){
             alert.innerHTML = `
             <div class="alert alert-success" role="alert">
             Berhasil Diubah
           </div>`
            }
            else{
             alert.innerHTML = `
             <div class="alert alert-danger" role="alert">
             Gagal Diubah
           </div>`
            }
            console.log(response)
            listUser.innerHTML = "" // kosongkan tabel list user
            getUser() // panggil function getUser()
         })
         .then(results => {
            console.log(results)
        })
        .catch(error => {
            console.log(error)
        })
        console.log("Button Ditekan")
    }
    
}



function editUser(id) {
    console.log("Edit data id: " + id);
    fetch("https://gorest.co.in/public/v2/users/" + id)
      
    .then(response => response.json())
    .then(data => {
        console.log(data)
        email.value = data.email
        name.value = data.name
        gender.value = data.gender
        status.value = data.status
        dataForm.innerHTML = ``
        btn.innerHTML = "Ubah"
        btn.setAttribute("onclick", "createUser(1, " + id + ")")
    })
    .catch(error => {
        console.log(error)
    });
}






