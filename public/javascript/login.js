const loginInputs = [];
const registerInputs = [];

const isValid = (element) => {
  if (!element.value || element.value.length < 3) {
    return false;
  }
  return true;
};

const checkLogin = (elementsArray) => {
  for (let i = 0; i < elementsArray.length; i++) {
    if (!isValid(elementsArray[i])) {
      return false;
    }
  }
  return true;
};

const disable = (button) => {
  button.disabled = true;
  button.classList.add('disabledButton');
};

const enable = (button) => {
  button.disabled = false;
  button.classList.remove('disabledButton');
};

const addFieldValidation = (element, button, elementsArray) => {
  element.addEventListener('focus', () => {
    element.classList.remove('invalidInput');
  });

  element.addEventListener('blur', () => {
    if (!isValid(element)) {
      element.classList.add('invalidInput');
    }
  });

  element.addEventListener('keyup', () => {
    if (checkLogin(elementsArray)) {
      enable(button);
    } else {
      disable(button);
    }
  });
};

this.document.addEventListener('DOMContentLoaded', () => {
  const loginButton = this.document.getElementById('login-button');
  const registerButton = this.document.getElementById('register-button');

  disable(loginButton);
  disable(registerButton);

  const loginUsername = this.document.getElementById('login-username');
  const loginPassword = this.document.getElementById('login-password');
  loginInputs.push(loginUsername);
  loginInputs.push(loginPassword);

  addFieldValidation(loginUsername, loginButton, loginInputs);
  addFieldValidation(loginPassword, loginButton, loginInputs);

  const registerUsername = this.document.getElementById('register-username');
  const registerEmail = this.document.getElementById('register-email');
  const registerPassword = this.document.getElementById('register-password');
  const registerConfirmPassword = this.document.getElementById('register-confirm-password');
  registerInputs.push(registerUsername);
  registerInputs.push(registerEmail);
  registerInputs.push(registerPassword);
  registerInputs.push(registerConfirmPassword);

  addFieldValidation(registerUsername, registerButton, registerInputs);
  addFieldValidation(registerEmail, registerButton, registerInputs);
  addFieldValidation(registerPassword, registerButton, registerInputs);
  addFieldValidation(registerConfirmPassword, registerButton, registerInputs);
});
