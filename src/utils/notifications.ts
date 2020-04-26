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
type showOrUpdateToastInterface = (
  toastFunction: (content: ToastContent, options?: ToastOptions) => ToastId,
  message: ToastContent,
  options?: ToastOptions
) => ToastId | void;

export const success: messageInterface = (message, options) =>
  showOrUpdateToast(toast.success, message, options);
export const error: messageInterface = (message, options) =>
  showOrUpdateToast(toast.error, message, options);
export const warn: messageInterface = (message, options) =>
  showOrUpdateToast(toast.warn, message, options);
export const info: messageInterface = (message, options) =>
  showOrUpdateToast(toast.info, message, options);
export const toastCustom: messageInterface = (message, options) =>
  showOrUpdateToast(toast, message, options);

export const dismiss: dismissInterface = id => toast.dismiss(id);

const Flip2 = cssTransition({
  enter: 'Flip2__flip-enter',
  exit: 'Flip2__flip-exit',
});
let updateTransition = Flip;

/* 
  To configure default toast behavior to only show 1 notification at a time.
 */
const showOrUpdateToast: showOrUpdateToastInterface = (toastFunction, message, options) => {
  const id = (options && options.toastId) || 'global-toast-id';
  if (toast.isActive(id)) {
    const updateOptions = { ...options, render: message, transition: updateTransition };

    // have to change transition else it wouldn't retrigger on subsequent updates.
    updateTransition = updateTransition === Flip ? Flip2 : Flip;

    toast.update(id, updateOptions);
  } else {
    toastFunction(message, { ...options, toastId: id });
  }
};
