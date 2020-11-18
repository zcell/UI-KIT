import Swal from 'sweetalert2';
import './style.scss';
import './animate.min.css';

const getSuccessAlert = (options = { text: null, timer: 0 }) => {
    Swal.fire({
        title: options.text || null,
        timer: options.timer || 3000,
        customClass: {
            container: 'swal2-custom-container',
            title: 'swal2-custom-title',
            header: 'swal2-custom-header',
            popup: 'swal2-custom-popup',
            icon: 'swal2-custom-icon',
        },
        background: 'rgba(58, 161, 142)',
        showClass: {
            popup: 'animate__animated animate__backInDown',
        },
        hideClass: {
            popup: 'animate__animated animate__backOutUp',
        },
        toast: true,
        position: 'top',
        // icon: 'info',
        showConfirmButton: false,
    });
};

const getErrorAlert = (options = { text: null, timer: 0 }) => {
    Swal.fire({
        title: options.text || null,
        timer: options.timer || 3000,
        customClass: {
            container: 'swal2-custom-container',
            title: 'swal2-custom-title',
            header: 'swal2-custom-header',
            popup: 'swal2-custom-popup',
            icon: 'swal2-custom-icon',
        },
        background: 'rgba(219, 82, 70)',
        showClass: {
            popup: 'animate__animated animate__backInDown',
        },
        hideClass: {
            popup: 'animate__animated animate__backOutUp',
        },
        toast: true,
        position: 'top',
        // icon: 'info',
        showConfirmButton: false,
    });
};

const getConfirmAlert = async (options = { text: null, title: null, timer: 0, icon: null }) => {
    let value = undefined;

    await Swal.fire({
        customClass: {
            container: 'swal2-custom-container',
            title: 'swal2-custom-title',
            header: 'swal2-custom-header',
            popup: 'swal2-custom-popup',
            icon: 'swal2-custom-icon',
            content: 'swal2-custom-content',
            cancelButton: 'swal2-custom-cancelButton',
            confirmButton: 'swal2-custom-confirmButton',
        },
        showClass: {
            popup: 'animate__animated animate__fadeInDown animate__faster',
        },
        hideClass: {
            popup: 'animate__animated animate__fadeOutUp animate__faster',
        },
        title: options.title || 'Удалить запись',
        text: options.text || 'Вы действительно хотите удалить эту запись безвозвратно?',
        icon: options.icon || 'error',
        showCancelButton: true,
        confirmButtonText: 'Подтвердить',
        cancelButtonText: 'Отменить',
        reverseButtons: true,
        showCloseButton: true,
    }).then(response => {
        value = response;
    });

    return value;
};

export { getSuccessAlert, getErrorAlert, getConfirmAlert };
