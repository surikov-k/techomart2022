const openFormButton = document.querySelector('.contacts .button');
const openMapButton = document.querySelector('.contacts-open-map');

const formPopup = document.querySelector('.modal-letter');
const mapPopup = document.querySelector('.modal-map');

function handlePopup(openButton, popup, callback = () => {
}) {
  function openPopup(popup) {
    popup.classList.add('modal-show');
    document.addEventListener('keydown', escKeydownHandler);
    callback();
  }

  function escKeydownHandler(evt) {

    if (evt.key === 'Escape') {
      evt.preventDefault();
      closePopup(popup);
    }
  }

  function closePopup(popup) {
    popup.classList.remove('modal-show', 'modal-error');
    document.removeEventListener('keydown', escKeydownHandler);
  }

  const closeButton = popup.querySelector('.modal-close');
  closeButton.addEventListener('click', () => {
    closePopup(popup)
  });

  openButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    openPopup(popup);
  });
}

if (openFormButton && formPopup) {
  handlePopup(openFormButton, formPopup, () => {
    const letterForm = formPopup.querySelector('.letter-form');
    const textArea = formPopup.querySelector('.letter-form-text textarea');
    const formName = letterForm.querySelector('#form-name');
    const formEmail = letterForm.querySelector('#form-email');

    let isStorageSupported = true;
    let storage = {};

    try {
      storage.name = localStorage.getItem('name');
      storage.email = localStorage.getItem('email');
    } catch (error) {
      isStorageSupported = false;
    }

    if (storage.name) {
      formName.value = storage.name;
    } else {
      formName.focus();
    }

    if (storage.email) {
      formEmail.value = storage.email;
    }

    textArea.focus();
    letterForm.addEventListener('submit', (evt) => {

      if (!formName.value || !formEmail.value) {
        evt.preventDefault();
        formPopup.classList.add('modal-error');
      } else {
        if (isStorageSupported) {
          localStorage.setItem('name', formName.value);
          localStorage.setItem('email', formEmail.value);
        }
      }
    })
  });

}

if (openMapButton && mapPopup) {
  handlePopup(openMapButton, mapPopup);
}
