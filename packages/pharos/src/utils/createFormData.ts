/**
 * @param form The form containing Pharos form elements.
 * @returns Form data with key/value pairs representing form fields and their values.
 */
const createFormData = (form: HTMLFormElement): FormData => {
  const formData = new FormData(form);

  if (window.FormDataEvent === undefined) {
    const event = new CustomEvent('formdata', {
      bubbles: true,
      cancelable: false,
      composed: false,
    });
    event.formData = formData;
    form.dispatchEvent(event);

    for (const [inputName, inputValue] of formData.entries()) {
      const element = form.elements[inputName];
      if (element) {
        (element as HTMLInputElement).value = inputValue as string;
      } else {
        // Web component form input doesn't participate in the form in Safari
        const hiddenInput = document.createElement('input');
        hiddenInput.type = 'hidden';
        hiddenInput.value = inputValue as string;
        hiddenInput.name = inputName;
        form.appendChild(hiddenInput);
      }
    }
  }

  return formData;
};

export default createFormData;
