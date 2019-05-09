export function lengthAndPatternValidation() {
    let inputCollection = document.querySelectorAll('input');
    for (let input of inputCollection) {
        if (!input.validity.valid) {
            input.nextElementSibling.classList.add('error');
            input.nextElementSibling.textContent = `Enter valid ${input.dataset.name}`;
        } else if (input.value.length === 0) {
            input.nextElementSibling.classList.add('error');
            input.nextElementSibling.textContent = 'This field can\'t be empty';
        }
    }
}

export function removeErrorPlate() {
    let inputEl = event.target.closest('input');
    if (inputEl) {
        let errorSpanEl = inputEl.nextElementSibling;
        errorSpanEl.classList.remove('error');
        errorSpanEl.textContent = '';
    }
}