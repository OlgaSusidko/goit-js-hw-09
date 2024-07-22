const STORAGE_KEY = "feedback-form-state";

let formData = {
    email: "",
    message: ""
}

const form = document.querySelector(".feedback-form");

populateForm();

form.addEventListener("submit", handleFormSubmit);
form.addEventListener("input", handleFormInput);

function handleFormSubmit(event){
  event.preventDefault();

  if (
    !form.elements.email.value.trim() ||
    !form.elements.message.value.trim()
  ) {
    alert('Fill please all fields');
    return;
  }
  
  console.log(formData);

  localStorage.removeItem(STORAGE_KEY);

  event.currentTarget.reset();
}

function handleFormInput(event) {
  const value = event.target.value.trim();
  const key = event.target.name;
  formData[key] = value;

  console.log(formData)
  
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(formData)) } catch (err) {
    console.log(err);
    return;
  }
}

function populateForm() {
  try { formData = JSON.parse(localStorage.getItem(STORAGE_KEY)); }  catch (err) {
    console.log(err);
    return;
  }

  if (!formData) {
    return;
  };
  
  for (const key in formData) {
    form.elements[key].value = formData[key];
  }
}