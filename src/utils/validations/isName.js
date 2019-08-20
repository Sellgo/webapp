export default (errorMessage = 'Invalid characters') => value => (/^[^±!@£$%^&*_+§¡€#¢§¶•ªº«\\/<>?:;|=.,0-9]{1,}$/.test(value) ? undefined : errorMessage);
