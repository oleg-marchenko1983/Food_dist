
import closeModal from './modal';
import openModal from './modal';
import {postData} from '../services/services';

function forms(formSelector, modalTimerId) {
    //Forms
    const forms = document.querySelectorAll(formSelector);

    const messages = {
        loading: "img/form/spinner.svg",
        success: "Спасибо Мы с Вами свяжимся",
        failure: "Что-то пошло не так"
    };

    forms.forEach(item => {
        bindPostData(item);
    });

   


    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessages = document.createElement('img');
            statusMessages.src = messages.loading;
            statusMessages.style.cssText = `
             display: block;
             margin: 0 auto;
             `;



            form.insertAdjacentElement('afterend', statusMessages);


            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));


            postData('http://localhost:3000/requests', json)
                .then(data => {
                    console.log(data);
                    showThanksModal(messages.success);
                    form.reset();
                    statusMessages.remove();
                }).catch(() => {
                    showThanksModal(messages.failure);
                }).finally(() => {
                    form.reset();
                });

        });
    }

    function showThanksModal(message) {
        const previosModalDialog = document.querySelector('.modal__dialog');

        previosModalDialog.classList.add('hide');

        openModal('.modal', modalTimerId);

        const thanksModal = document.createElement('div');

        thanksModal.classList.add('modal__dialog');

        thanksModal.innerHTML = `
          <div class="modal__content">
             <div class="modal__close" data-close>x</div>
             <div class="modal__title">${message}</div>
          </div>
         `;

        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            previosModalDialog.classList.add('show');
            previosModalDialog.classList.remove('hide');
            closeModal('.modal');
        }, 4000);

    }

    fetch('http://localhost:3000/menu')
        .then(data => data.json())
}

export default forms;