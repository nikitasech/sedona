let hotelsButton = document.querySelector('.hotels__button');
let hotelsModal = document.querySelector('.hotels__modal');
let hotelsForm = {
    arrival: hotelsModal.querySelector('[name=date-of-arrival]'),
    departure: hotelsModal.querySelector('[name=date-of-departure]'),
    adults: hotelsModal.querySelector('[name=number-of-adults]'),
    abultMinus: document.querySelector('.form__number-container_abult .form__button_minus'),
    abultPlus: document.querySelector('.form__number-container_abult .form__button_plus'),
    children: hotelsModal.querySelector('[name=number-of-children]'),
    childrenMinus: document.querySelector('.form__number-container_children .form__button_minus'),
    childrenPlus: document.querySelector('.form__number-container_children .form__button_plus'),
    isOpen: true,
};
let hotelsFormElements = [hotelsForm.arrival, hotelsForm.departure, hotelsForm.adults, hotelsForm.children];

let storage = {
    adults: null,
    children: null,
    isSupport: true,
};

try {
    storage.abults = localStorage.getItem('adults');
    storage.children = localStorage.getItem('children');
} catch (err) {
    storage.isSupport = false;
}

if (hotelsForm.isOpen) {
    hotelsModal.classList.add('modal_disabled');
    hotelsForm.isOpen = false;
}

hotelsButton.addEventListener('click', function (evt) {
    evt.preventDefault();

    if (!hotelsForm.isOpen) {
        hotelsModal.classList.remove('hotels__modal_err');
        if (storage.isSupport) {
            if (storage.abults) {
                hotelsForm.adults.value = storage.abults;
            }
            if (storage.children) {
                hotelsForm.children.value = storage.children;
            }
        }
        hotelsModal.classList.remove('modal_disabled');
        setTimeout(function () {
            hotelsForm.arrival.focus();
        }, 1200);
        hotelsForm.isOpen = true;
    } else {
        hotelsModal.classList.remove('hotels__modal_err');
        hotelsModal.classList.add('hotels__modal_close');
        setTimeout(function () {
            hotelsModal.classList.add('modal_disabled');
            hotelsModal.classList.remove('hotels__modal_close');
        }, 500);
        hotelsForm.isOpen = false;
    }
});

hotelsModal.addEventListener('submit', function (evt) {
    if (!hotelsForm.arrival.value || !hotelsForm.departure.value || !hotelsForm.adults.value || !hotelsForm.children.value) {
        evt.preventDefault();
        hotelsModal.classList.remove('hotels__modal_err');
        hotelsModal.offsetWidth = hotelsModal.offsetWidth;
        hotelsModal.classList.add('hotels__modal_err');
        for (let i = 0; i < hotelsFormElements.length; i++) {
            if (!hotelsFormElements[i].value) {
                setTimeout(function() {
                    hotelsFormElements[i].focus();
                }, 550);
                break;
            }
        }
    } else {
        localStorage.setItem('adults', hotelsForm.adults.value);
        localStorage.setItem('children', hotelsForm.children.value);
    }
});

hotelsForm.abultMinus.addEventListener('click', function (evt) {
    evt.preventDefault();

    hotelsForm.adults.value--;
});

hotelsForm.abultPlus.addEventListener('click', function (evt) {
    evt.preventDefault();

    hotelsForm.adults.value++;
});

hotelsForm.childrenMinus.addEventListener('click', function (evt) {
    evt.preventDefault();

    hotelsForm.children.value--;
});

hotelsForm.childrenPlus.addEventListener('click', function (evt) {
    evt.preventDefault();

    hotelsForm.children.value++;
});