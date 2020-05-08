import { toast, ToastContent, ToastOptions, ToastId, Flip, cssTransition } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './notificationsAnimations.scss';

toast.configure({
  position: 'bottom-right',
  hideProgressBar: true,
  bodyClassName: 'toast-body',
});

type messageInterface = (message: ToastContent, options?: ToastOptions) => ToastId | void;
type dismissInterface = (id?: string | number | undefined) => void;
type showOrUpdateToastInterface = (message: ToastContent, options?: ToastOptions) => ToastId | void;

export const success: messageInterface = (message, options) =>
  showOrUpdateToast(message, { ...options, type: 'success' });
export const error: messageInterface = (message, options) =>
  showOrUpdateToast(message, { ...options, type: 'error' });
export const warn: messageInterface = (message, options) =>
  showOrUpdateToast(message, { ...options, type: 'warning' });
export const info: messageInterface = (message, options) =>
  showOrUpdateToast(message, { ...options, type: 'info' });
export const toastCustom: messageInterface = (message, options) =>
  showOrUpdateToast(message, options);

export const dismiss: dismissInterface = id => toast.dismiss(id);

const Flip2 = cssTransition({
  enter: 'Flip2__flip-enter',
  exit: 'Flip2__flip-exit',
});
let updateTransition = Flip;

/* 
  To configure default toast behavior to only show 1 notification at a time.
 */
const showOrUpdateToast: showOrUpdateToastInterface = (message, options) => {
  const id = (options && options.toastId) || 'global-toast-id';
  if (toast.isActive(id)) {
    const updateOptions = { ...options, render: message, transition: updateTransition };

    // have to change transition else it wouldn't retrigger on subsequent updates.
    updateTransition = updateTransition === Flip ? Flip2 : Flip;

    toast.update(id, updateOptions);
  } else {
    toast(message, { ...options, toastId: id });
  }
};
