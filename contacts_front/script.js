const tbody = document.querySelector('tbody');
const remarks = document.querySelector('#remarks');

const nameInput = document.querySelector('#person-name');
const phoneInput = document.querySelector('#person-phone');
const jobTitleInput = document.querySelector('#person-jobtitle');
const birthInput = document.querySelector('#person-birth');
const idInput = document.querySelector('#person-id');


function getAllNotes() {
    fetch('https://localhost:7200/Contacts')
        .then(data => data.json())
        .then(response => displayNotes(response));
}

$(document).on('click', '.note', (event) => {
    if (event.target.classList.contains('del')) {
        return;
    }
    $('#bthSave').text('Edit');
    $('#noteModal').modal('show');
    id = Number(event.target.getAttribute('data-id'));
    fetch(`https://localhost:7200/Contacts/${id}`)
        .then(data => data.json())
        .then(response => fillForm(response));
})

function fillForm(note) {
    nameInput.value = note.name;
    phoneInput.value = note.mobilePhone
    jobTitleInput.value = note.jobTitle
    birthInput.value = note.birthDate.substr(0, 10)
    idInput.value = note.id
}

function displayNotes(notes) {

    let allNotes = '';
    notes.forEach(note => {

        let noteElement = `
        <tr class="note">
            <td data-id="${note.id}">${note.name}</td>
            <td data-id="${note.id}">${note.mobilePhone}</td>
            <td data-id="${note.id}">${note.jobTitle}</td>
            <td data-id="${note.id}">${note.birthDate.substr(0,10)}</td>
            <td data-id="${note.id}">
            <button type="button" class="btn btn-dark del" data-id="${note.id}">delete</button>
            </td>
        </tr>
        `;
        allNotes += noteElement;
    });
    tbody.innerHTML = allNotes;
}

function addNote(name, mobilePhone, jobTitle, birthDate) {

    const body = {
        Id: 0,
        Name: name,
        MobilePhone: mobilePhone,
        JobTitle: jobTitle,
        BirthDate: birthDate
    }


    fetch('https://localhost:7200/Contacts', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            "content-type": "application/json"
        }
    });

}

function editNote(id, name, mobilePhone, jobTitle, birthDate) {
    const body = {
        Id: id,
        Name: name,
        MobilePhone: mobilePhone,
        JobTitle: jobTitle,
        BirthDate: birthDate
    }
    fetch('https://localhost:7200/Contacts', {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: {
            "content-type": "application/json"
        }
    });

}

function isNameCorrect() {
    regexp = /^[a-zA-Zа-яА-Я'][a-zA-Zа-яА-Я-' ]+[a-zA-Zа-яА-Я']?$/u;
    str = nameInput.value;
    b = str.match(regexp);
    if (!b) {
        remarks.innerHTML += `
        <p>name can only contain letters</p>
        `;
    }
    return b;
}

function isPhoneCorrect() {
    regexp = /^375\d{9}$/
    str = phoneInput.value;
    b = str.match(regexp);
    if (!b) {
        remarks.innerHTML += `
        <p>phone number entered incorrectly</p>
        `;
    }
    return str.match(regexp);
}

function isJobTitleCorrect() {
    regexp = /^[a-zA-Zа-яА-Я'][a-zA-Zа-яА-Я-' ]+[a-zA-Zа-яА-Я']?$/u
    str = jobTitleInput.value
    b = str.match(regexp);
    if (!b) {
        remarks.innerHTML += `
        <p>job title can only contain letters</p>
        `;
    }
    return str.match(regexp);
}

function isDateCorrect() {
    b = str.match(regexp);
    if (!b) {
        remarks.innerHTML += `
        <p>enter the following date format yyyy.mm.dd</p>
        `;
    }
    return str.match(regexp);
}

function isDataCorrect() {
    isName = isNameCorrect();
    isPhone = isPhoneCorrect();
    isJobTitle = isJobTitleCorrect();
    isDate = isDateCorrect();
    return isName && isPhone && isJobTitle && isDate;
}

$('#bthSave').on('click', () => {
    remarks.innerHTML = '';
    if (!isDataCorrect()) {
        return;
    }
    if (Number(idInput.value) === 0) {
        addNote(nameInput.value, phoneInput.value, jobTitleInput.value, birthInput.value);
    } else {
        editNote(idInput.value, nameInput.value, phoneInput.value, jobTitleInput.value, birthInput.value);
    }
    $('#noteModal').modal('hide');
    setTimeout(() => {
        tbody.innerHTML = '';
        getAllNotes();
    }, 500);

})
$('#bthModal').on('click', () => {
    $('#bthSave').text('Add');
    $('#noteModal').modal('show');
})

$(document).on('click', '.del', (event) => {
    id = Number(event.target.getAttribute('data-id'));
    fetch(`https://localhost:7200/Contacts/${id}`, {
        method: 'DELETE',
        headers: {
            "content-type": "application/json"
        }
    });
    setTimeout(() => {
        tbody.innerHTML = '';
        getAllNotes();
    }, 1500);
})


getAllNotes();