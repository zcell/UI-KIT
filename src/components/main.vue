<script>
import Swal from 'sweetalert2';

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

export default {
    getSuccessAlert,
    getErrorAlert,
    getConfirmAlert,
};
</script>

<style lang="scss">
@import '../assets/globals';

  :root .swal2-container {
    &.swal2-custom-container {
      filter: drop-shadow(0px 12px 30px rgba(0, 0, 0, 0.15));
      padding: 0 !important;
      width: 100%;
  }

    & .swal2-custom-popup.swal2-toast {
      width: auto;
      margin-top: 20px;
      padding: 11px 57px;
      box-shadow: none !important;
      border-radius: 2px;

      & .swal2-custom-header {
    }

      & .swal2-custom-icon {
        border: 0.15em solid $white;
        min-width: 20px;
        width: 20px;
        height: 20px;

        & .swal2-icon-content {
          color: $white;
          font-size: 18px;
          font-weight: 400;
          line-height: 1.1;
      }
    }

      & .swal2-custom-title {
        color: $white;
        font-family: $FontFamily;
        font-weight: 400;
        font-size: 14px !important;
        line-height: 14px;
        letter-spacing: 0.3px;
    }
  }

    & .swal2-custom-popup.swal2-modal {
      border-radius: 2px;
      font-family: $FontFamily;
      font-style: normal;

      & .swal2-custom-icon {
        margin: 20px auto;
        border: none;
        background-color: $red;

        & .swal2-x-mark-line-left, & .swal2-x-mark-line-right {
          background-color: $white;
          height: 8px;
      }

        & .swal2-icon-content {
          color: $white;
      }
    }

      & .swal2-custom-title {
      font-weight: 500;
      font-size: 20px;
      line-height: 23px;
    }

      & .swal2-custom-content {
        font-weight: normal;
        font-size: 14px !important;
        line-height: 120%;
    }

      & .swal2-custom-cancelButton, & .swal2-custom-confirmButton {
        width: 163px;
        margin: 0 10px;
        padding: 11px 0;
        border-radius: 2px;
        border: 1px solid;

        font-family: $FontFamily;
        font-style: normal;
        font-weight: 500;
        font-size: 12px;
        line-height: 14px;
        letter-spacing: 0.3px;
    }

      & .swal2-custom-cancelButton {
        color: $mainText;
        border-color: $gray;
        background-color: $white;
    }

      & .swal2-custom-confirmButton {
        color: $white;
        border-color: $mainGreen;
        background-color: $mainGreen;
    }
  }
}

</style>