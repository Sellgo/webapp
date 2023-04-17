import React, { useState } from 'react';
import styles from './index.module.scss';
import SellgoFreeAccountForm from './SellgoFreeAccountForm';
import Auth from '../../components/Auth/Auth';
import SellgoInAppPaymentV3 from './SellgoInAppPaymentV3';

interface Props {
  auth: Auth;
}
const SellgoRegistration = (props: Props) => {
  const { auth } = props;
  const [step, setStep] = useState<number>(1);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  //   const [errorMessage, setErrorMessage] = useState<string>('');
  const [name, setName] = useState<string>('');
  console.log(setStep);

  //   const stripe: any = useStripe();
  //   const elements = useElements();

  //   const registerUser = () => {
  //     auth.webAuth.signup(
  //       {
  //         connection: 'Username-Password-Authentication',
  //         email: email.toLowerCase(),
  //         password: password,
  //         userMetadata: {
  //           first_name: name,
  //           last_name: name,
  //         },
  //       },
  //       (err: any) => {
  //         if (err) {
  //           // This should not happen
  //           setErrorMessage(err.description);
  //           //   setLoading(false);
  //           return;
  //         } else {
  //           // Successful Signup
  //           const data: any = {
  //             email: email.trim().toLowerCase(), // trim out white spaces to prevent 500
  //             name: name,
  //             first_name: name,
  //             last_name: '',
  //             subscription_id: 11,
  //             password: password,
  //           };
  //           auth.getSellerID(data, 'freeAccountSignup');
  //         }
  //       }
  //     );
  //   };

  //   const handleSubmit = async (event: any) => {
  //     const firstName = name.split(' ')[0] ?? '';
  //     const lastName = name.split(' ')[1] ?? '';
  //     // setSignupLoading(true);
  //     event.preventDefault();
  //     axios.defaults.headers.common.Authorization = ``;

  //     if (!stripe || !elements) {
  //       // Stripe.js has not yet loaded.
  //       // Make  sure to disable form submission until Stripe.js has loaded.
  //       return;
  //     }

  //     const cardElement = elements.getElement(CardNumberElement);
  //     const { error, paymentMethod } = await stripe.createPaymentMethod({
  //       type: 'card',
  //       card: cardElement,
  //       billing_details: {
  //         name: `${firstName} ${lastName}`,
  //       },
  //     });

  //     let stripeSubscription: any = null;
  //     if (error) {
  //       //   handleError(error.message);
  //       return;
  //     } else {
  //       /* Make stripe payment */
  //       const paymentMethodId = paymentMethod.id;
  //       const bodyFormData = new FormData();
  //       bodyFormData.set('email', email.toLowerCase());
  //       bodyFormData.set('subscription_id', String(getSubscriptionID(accountType)));
  //       bodyFormData.set('payment_method_id', paymentMethodId);
  //       bodyFormData.set('payment_mode', paymentMode);
  //       bodyFormData.set('promo_code', promoCode);

  //       // @ts-ignore
  //       const referralID = typeof window !== 'undefined' && window.Rewardful.referral;
  //       if (referralID) {
  //         bodyFormData.set('referral', referralID);
  //       }

  //       try {
  //         const { data } = await axios.post(
  //           AppConfig.BASE_URL_API + `sellers/subscription/create`,
  //           bodyFormData
  //         );
  //         const { stripe_subscription } = data;
  //         if (
  //           (stripe_subscription && stripe_subscription.status === 'active') ||
  //           stripe_subscription.payment_intent.status === 'succeeded'
  //         ) {
  //           stripeSubscription = stripe_subscription;
  //           localStorage.removeItem('planType');
  //         } else if (data.message) {
  //           //   handleError(data.message);
  //           return;
  //         }
  //       } catch (e) {
  //         const { response } = e as any;
  //         if (response && response.data && response.data.message) {
  //           //   handleError(response.data.message);
  //         }
  //         // handleError('Failed to make payment');
  //         return;
  //       }

  //       /* Create auth0 account */
  //       if (stripeSubscription) {
  //         /* After successful sign up, auth.getSellerID will change the page */
  //         auth.webAuth.signup(
  //           {
  //             connection: 'Username-Password-Authentication',
  //             email: email.toLowerCase(),
  //             password: password,
  //             userMetadata: {
  //               first_name: firstName,
  //               last_name: lastName,
  //             },
  //           },
  //           (err: any) => {
  //             if (err) {
  //               // This should not happen
  //               //   handleError(err.description);
  //               return;
  //             } else {
  //               // Successful Signup
  //               const data: any = {
  //                 email: email.trim().toLowerCase(), // trim out white spaces to prevent 500
  //                 name: firstName + ' ' + lastName,
  //                 first_name: firstName,
  //                 last_name: lastName,
  //                 stripe_subscription_id: stripeSubscription.id,
  //                 stripe_customer_id: stripeSubscription.customer,
  //                 subscription_id: getSubscriptionID(accountType),
  //                 payment_mode: paymentMode,
  //                 password: password,
  //               };

  //               /* Tracking for google analytics upon successful payment */
  //               //   trackEvent({
  //               //     event: 'purchase',
  //               //     ecommerce: {
  //               //       transaction_id: stripeSubscription.id,
  //               //       affiliation: 'Stripe',
  //               //       revenue: stripeSubscription.plan.amount / 100,
  //               //       tax: 0,
  //               //       shipping: 0,
  //               //       currency: 'USD',
  //               //       items: [
  //               //         {
  //               //           name: accountType,
  //               //           id: getSubscriptionID(accountType),
  //               //           price: stripeSubscription.plan.amount / 100,
  //               //           brand: 'Stripe',
  //               //           category: 'Subscription',
  //               //           quantity: 1,
  //               //         },
  //               //       ],
  //               //     },
  //               //   });
  //               auth.getSellerID(data, 'newSubscription');
  //             }
  //           }
  //         );
  //       }
  //     }
  //   };

  return (
    <div className={styles.registrationPage}>
      <section className={styles.progress_bar}>
        <p className={styles.progress_bar__label}>Step {step} of 2</p>
        <div className={styles.progress_bar__wrapper}>
          <div className={styles.step} />
          <div className={`${styles.step} ${step < 2 ? styles.step__inactive : ''}`} />
          {/* <div className={`${styles.step} ${step < 3 ? styles.step__inactive : ''}`} /> */}
        </div>
      </section>
      {step === 1 && (
        <SellgoFreeAccountForm
          auth={auth}
          setStep={(a: number) => setStep(a)}
          setUserEmail={setEmail}
          setUserPassword={setPassword}
          setUserName={setName}
        />
      )}
      {step === 2 && (
        <SellgoInAppPaymentV3 auth={auth} userName={name} email={email} password={password} />
      )}
    </div>
  );
};

export default SellgoRegistration;
