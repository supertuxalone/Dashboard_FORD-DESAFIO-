const formValidationPatterns = {
    "nome": {
        "regex": "^(?!\s*$).+",
        "message": "O nome não pode ser nulo."
    },
    "email": {
        "regex": "^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+).(\.[a-z]{2,3})$",
        "message": "O e-mail inserido é inválido."
    },
    "motivoContato": {
        "regex": "^(?!.*(motivo))",
        "message": "Selecione um motivo para contato."
    },
    "mensagem": {
        "regex": "^(?!\s*$).+",
        "message": "A mensagem não pode estar vazia."
    },
    "telefone": {
        "regex": "^[0-9]*$",
        "message": "O telefone só pode conter números."
    }
}

let nonValidField = [];

const formElement = document.getElementById("formulario-contato");
formElement.addEventListener("submit", (evt) => {
    evt.preventDefault();
});

//class contato
class contato {
    constructor(nome, email, telefone, motivoContato, mensagem){
        this.nome = nome;
        this.email = email;
        this.telefone = telefone;
        this.motivoContato = motivoContato;
        this.mensagem = mensagem;
    }
}

function Post(form) {
    let data = new contato(
        form.elements.namedItem("nome").value,
        form.elements.namedItem("email").value, 
        form.elements.namedItem("telefone").value, 
        form.elements.namedItem("motivocontato").value, 
        form.elements.namedItem("mensagem").value
        );
    
    Enviar(form, data);
}

function Enviar(form, data) {
    validationLoop(data);

    if(hasAnyNonValidField()){
        displayErrorMessage("Ocorreu um erro no formulário.");
        nonValidField.splice(0, nonValidField.length);
        throw("Form could not be submitted due to an error. Please, check the form and try sending again.");
    } else{
        displaySuccessfulMessage("The form was sent successfully.");
        form.reset();
    }
}

function validationLoop(data){
    var validationKeys = Object.keys(formValidationPatterns);

    validationKeys.forEach( fieldName => {
        if(data.hasOwnProperty(fieldName)){
            let pattern = formValidationPatterns[fieldName]["regex"];
            let fieldValue = data[fieldName];
            checkFieldValidation(pattern, fieldValue, fieldName);
        }
    });
}

function checkFieldValidation(pattern, fieldValue, fieldName){
    let regex = new RegExp(pattern);
    let isValid = regex.test(fieldValue);

    if(isValid){
        setActionForFieldWithClassName("remove", fieldName.toLowerCase(), "field-error");
        removeFieldErrorMessage(fieldName);
    } else{
        nonValidField.push(fieldName);
        setActionForFieldWithClassName("add", fieldName.toLowerCase(), "field-error");
        createFieldErrorMessage(fieldName);

    }
}

function displaySuccessfulMessage(message){
    let span = createSimpleSpan("form-success", message);

    formElement.appendChild(span);

    addFadeOutEffect(span);
}

function displayErrorMessage(message) {
    let span = createSimpleSpan("form-error", message);

    formElement.appendChild(span);

    addFadeOutEffect(span);
}

function createFieldErrorMessage(fieldName){
    let elm = formElement.querySelector(`#${fieldName.toLowerCase()}id`);
    let nextSibling = elm.nextElementSibling.className;

    if(!nextSibling.includes("error-message")){
        let span = createSimpleSpan("error-message", formValidationPatterns[fieldName]["message"]);  
        span.style.display = "block"; 
        elm.after(span);
    }
}

function removeFieldErrorMessage(fieldName){
    let elm = formElement.querySelector(`#${fieldName.toLowerCase()}id`);
    let nextSibling = elm.nextElementSibling.className;

    if(nextSibling.includes("error-message")){
        elm.nextElementSibling.remove(nextSibling);
    }
}

function hasAnyNonValidField(){
    return nonValidField.length > 0 ? true : false;
}

function setActionForFieldWithClassName(action, field, className){
    let elm = document.getElementById(`${field}id`);
    elm.classList[action](className);
}

function addFadeOutEffect(element){
    setTimeout( () => {
        element.classList.add("fadeOut");

        element.addEventListener("transitionend", () => {
            formElement.removeChild(element);
        });
    }, 5000);
}

function createSimpleSpan(className, message){
    let span = document.createElement("span");
    span.classList.add(className);
    span.textContent = message;
    return span;
}