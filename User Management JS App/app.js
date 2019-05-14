const countHandle = document.getElementById('count')
const listHandle = document.getElementById('list')
const userFormHandle = document.getElementById('userForm')

function removeUser(ele) {
    const confirmDelete = confirm("Are you sure?")
    if (confirmDelete) {
        axios.delete(`http://localhost:3000/users/delete/${ele.id}`)
            .then(function (response) {
                listHandle.removeChild(ele.parentNode)
                alert(response.data.notice)
                countHandle.innerHTML = Number(countHandle.innerHTML) - 1
            })
    }
}

function buildLI(user) {
    const li = document.createElement('li')
    li.textContent = user.name
    const button = document.createElement('button')
    button.textContent = 'delete'
    button.setAttribute('id', user.id)
    button.setAttribute('onclick', "removeUser(this)")
    li.appendChild(button)
    listHandle.appendChild(li)
}

axios.get('http://localhost:3000/users/list')
    .then(function (response) {
        const users = response.data
        countHandle.innerHTML = users.length

        users.forEach(function (user) {
            buildLI(user)
        })
    })
    .catch(function (err) {
        alert(err)
    })


userFormHandle.addEventListener('submit', function (e) {
    e.preventDefault()
    const formData = {
        name: e.target[0].value,
        email: e.target[1].value
    }

    // With axios create user
    axios.post('http://localhost:3000/users/create', formData)
        .then(function (response) {
            const { user, notice } = response.data
            alert(notice)
            buildLI(user)
            countHandle.innerHTML = Number(countHandle.innerHTML) + 1
            userFormHandle.reset()
        })
        .catch(function (err) {
            alert(err)
        })

// With xhr create user
    const xhr = new XMLHttpRequest() 
    xhr.open('POST', 'http://localhost:3000/users/create')
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.send(JSON.stringify(formData))

    xhr.onload = function(){
        const { user, notice } = JSON.parse(xhr.responseText)
        alert(notice)
        buildLI(user)
        countHandle.innerHTML = Number(countHandle.innerHTML) + 1
        userFormHandle.reset()
    }
})