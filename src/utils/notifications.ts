import { toast, ToastContent, ToastOptions } from 'react-toastify';

toast.configure();

type messageInterface = (message: ToastContent, options?: ToastOptions) => void;

export const success: messageInterface = (message, options) => toast.success(message);
export const error: messageInterface = (message, options) => toast.error(message, options);
