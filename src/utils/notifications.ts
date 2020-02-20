import { toast, ToastContent, ToastOptions, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { render } from 'react-dom';

toast.configure({
  position: 'bottom-right',
  hideProgressBar: true,
  bodyClassName: 'toast-body',
});

type messageInterface = (message: ToastContent, options?: ToastOptions) => void;
type dismissInterface = (id: any) => void;

export const success: messageInterface = (message, options) => toast.success(message);
export const error: messageInterface = (message, options) => toast.error(message, options);
export const warn: messageInterface = (message, options) => toast.warn(message, options);
export const update: messageInterface = (message, options) => toast.info(message, options);
export const info: messageInterface = (message, options) => toast(message, options);

export const dismiss: dismissInterface = id => toast(id);
