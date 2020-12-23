function openModal(modalSelector, modalTimerId) {
    const modal = document.querySelector(modalSelector);
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';

    console.log(modalTimerId);
    if (modalTimerId) {
        clearInterval(modalTimerId);
    }

}

function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);
    modal.classList.add('hide');
    modal.classList.remove('show');
    // Затемняет задний фон если модальное окно открыто и делает не активным
    document.body.style.overflow = '';
}

function modal(triggerSelector, modalSelector, modalTimerId) {
    /* Модальные окна */

    const modalTriger = document.querySelectorAll(triggerSelector),

        modal = document.querySelector(modalSelector);

    modalTriger.forEach(btn => {
        btn.addEventListener('click', () => openModal(modalSelector, modalTimerId));
    });


    // Закрываем окно если курсор мыши нажат за пределами окна
    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == "") {
            closeModal(modalSelector);
        }
    });
    // Закрываем окно клавишей Esc
    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modal.classList.contains('show')) {
            closeModal(modalSelector);
        }

    });

    // Устанавливаем событие если пользователь долистал до конца открыть модальное окно
    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal(modalSelector, modalTimerId);
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);



}

export default modal;
export {
    closeModal
};
export {
    openModal
};