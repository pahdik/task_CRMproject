const notesContainer = document.querySelector('#notesContainer');



const nameInput = document.querySelector('#person-name')
const phoneInput = document.querySelector('#person-phone')
const jobTitleInput = document.querySelector('#person-jobtitle')
const birthInput = document.querySelector('#person-birth')
const idInput = document.querySelector('#person-id')


function getAllNotes() {
    fetch('https://localhost:7200/Contacts')
        .then(data => data.json())
        .then(response => displayNotes(response))
}

$(document).on('click', '.note', (event) => {
    $('#bthSave').text('Edit');
    $('#noteModal').modal('show');
    id = Number(event.target.getAttribute('data-id'))
    fetch(`https://localhost:7200/Contacts/${id}`)
        .then(data => data.json())
        .then(response => fillForm(response))
})

function fillForm(note) {
    nameInput.value = note.name;
    phoneInput.value = note.mobilePhone
    jobTitleInput.value = note.jobTitle
    birthInput.value = note.birthDate
    idInput.value = note.id
}


function displayNotes(notes) {

    let allNotes = '';
    notes.forEach(note => {
        let noteElement = `
        <div class="note row" data-id="${note.id}">
            <div class="col" data-id="${note.id}">
                ${note.name}
            </div>
            <div class="col" data-id="${note.id}">
                ${note.mobilePhone}
            </div>
            <div class="col" data-id="${note.id}">
                ${note.jobTitle}
            </div>
            <div class="col" data-id="${note.id}">
                ${note.birthDate}
            </div>
            
        </div>  
        `;
        allNotes += noteElement;
    });
    notesContainer.innerHTML = allNotes;
}




function addNote(name, mobilePhone, jobTitle, birthDate) {

    const body = {
        Id: 0,
        Name: name,
        MobilePhone: mobilePhone,
        JobTitle: jobTitle,
        BirthDate: new Date()
    }
    console.log(body);

    fetch('https://localhost:7200/Contacts', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                "content-type": "application/json"
            }
        })
        .then(data => data.json())
        .then(response => console.log(response));
}

function editNote(id, name, mobilePhone, jobTitle, birthDate) {
    const body = {
        Id: id,
        Name: name,
        MobilePhone: mobilePhone,
        JobTitle: jobTitle,
        BirthDate: new Date()
    }
    console.log(body)
    fetch('https://localhost:7200/Contacts', {
            method: 'PUT',
            body: JSON.stringify(body),
            headers: {
                "content-type": "application/json"
            }
        })
        .then(data => data.json())
        .then(response => console.log(response));

}

function isNameCorrect() {
    regexp = /^[a-zA-Zа-яА-Я'][a-zA-Zа-яА-Я-' ]+[a-zA-Zа-яА-Я']?$/u
    str = nameInput.value
    return str.match(regexp)
}

function isPhoneCorrect() {
    regexp = /^375\d{9}/
    str = phoneInput.value
    console.log(`isPhoneCorrect: ${str.match(regexp)}`)
    return str.match(regexp);
}

function isJobTitleCorrect() {

}

function isDateCorrect() {

}

function isDataCorrect() {
    return isNameCorrect() && isPhoneCorrect()
}

$('#bthSave').on('click', () => {
    if (!isDataCorrect()) {
        return;
    }
    console.log(!isDataCorrect())
    if (Number(idInput.value) === 0) {
        addNote(nameInput.value, phoneInput.value, jobTitleInput.value, birthInput.value);
    } else {
        editNote(idInput.value, nameInput.value, phoneInput.value, jobTitleInput.value, birthInput.value);
    }
    console.log('WOW')
})
$('#bthModal').on('click', () => {
    $('#bthSave').text('Add');
    $('#noteModal').modal('show');
})


getAllNotes();