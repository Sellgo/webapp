import React, { useState } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

/* Styling */
import styles from './index.module.scss';

/* Components */
import InputFilter from '../../../../../components/FormFilters/InputFilter';
import {
  UNITS_SOLD_PER_MONTH,
  UNITS_SOLD_TYPE,
  UNIT_ID_TYPE,
  getSellerPlan,
  getSellerPlanById,
  getNearestUnitsSold,
  getSliderValue,
} from './data';
import PricingPlansCard from '../../../../../components/AistockPricingPlansCard';
import RainbowText from '../../../../../components/RainbowText';
import { SellerSubscription } from '../../../../../interfaces/Seller';

interface Props {
  requestChangeSubscription: (name: string, id: number, mode: string) => void;
  isPaidSellerSubscription: boolean;
  sellerSubscription: SellerSubscription;
}

const HeroBox = (props: Props) => {
  const { requestChangeSubscription, sellerSubscription } = props;
  const [isMonthly, setIsMonthly] = useState<boolean>(true);
  const [unitsSoldInput, setUnitsSoldInput] = useState<number>(1000);
  const [unitsSold, setUnitsSold] = useState<UNITS_SOLD_TYPE>('1,000');
  const sellerPlan = getSellerPlan(unitsSold);
  const [subId, setSubId] = useState<UNIT_ID_TYPE>(105);
  const sellerCurrentPlan = getSellerPlanById(subId);
  console.log(unitsSoldInput);
  console.log('sellerSubscription.subscription_id' + sellerSubscription.subscription_id);
  console.log('sellerPlan.id' + sellerPlan.id);
  console.log('sellerSubscription.payment_mode ' + sellerSubscription.payment_mode);
  console.log('subId' + subId);
  console.log('sellerCurrentPlan.id' + sellerCurrentPlan.id);
  console.log('isMonthly' + isMonthly);

  React.useEffect(() => {
    // @ts-ignore
    setUnitsSold(getNearestUnitsSold(unitsSoldInput));

    // @ts-ignore
    setSubId(sellerSubscription.subscription_id);
    setIsMonthly(sellerSubscription.payment_mode === 'monthly' ? true : false);
  }, [unitsSoldInput, subId]);

  return (
    <section className={styles.heroBoxWrapper}>
      <div className={`big-page-container ${styles.calculatePriceSection}`} id="calculatePrice">
        <div className={styles.priceCalculator}>
          <div className={styles.ordersPerMonthDisplay}>
            <div className={styles.ordersPerMonthText}>
              <p />
              <br />
              <span>
                <RainbowText type="pink_purple_blue_gradient">
                  How many orders per month do you have?
                </RainbowText>
              </span>
            </div>
            <InputFilter
              className={`
								${styles.formInput}
							`}
              label=""
              placeholder="Orders/mo (numbers)"
              isNumber
              handleChange={value => setUnitsSoldInput(parseInt(value, 10))}
              value={unitsSoldInput.toString()}
            />
          </div>
          <Slider
            className="slider"
            min={11}
            marks={UNITS_SOLD_PER_MONTH}
            step={null}
            onChange={(key: any) => {
              // @ts-ignore
              setUnitsSold(UNITS_SOLD_PER_MONTH[key]);
              setUnitsSoldInput(parseInt(UNITS_SOLD_PER_MONTH[key].replace(/,/g, ''), 10));
              return null;
            }}
            value={parseInt(getSliderValue(unitsSold), 10)}
            defaultValue={7}
          />
        </div>

        <div className={styles.planInformation}>
          <PricingPlansCard
            name={sellerPlan.name}
            planId={sellerPlan.id}
            monthlyPrice={sellerPlan.monthlyPrice}
            launchDiscount={sellerPlan.launchDiscount}
            launchSaving={sellerPlan.launchSaving}
            launchSavingPercentage={sellerPlan.launchSavingPercentage}
            annualPrice={sellerPlan.annualPrice}
            desc={sellerPlan.desc}
            featureSubName={sellerPlan.featureSubName}
            featuresLists={sellerPlan.featuresListsAnnual}
            setIsMonthly={setIsMonthly}
            requestChangeSubscription={requestChangeSubscription}
            // Plan details
            isPaidSellerSubscription={
              sellerSubscription.payment_mode === 'yearly'
                ? sellerPlan.id === sellerSubscription.subscription_id
                : false
            }
            ctaText={sellerPlan.ctaText}
            isMonthly={false}
            className={styles.planInformationBox}
          />
          <PricingPlansCard
            name={sellerPlan.name}
            planId={sellerPlan.id}
            monthlyPrice={sellerPlan.monthlyPrice}
            launchDiscount={sellerPlan.launchDiscount}
            launchSaving={sellerPlan.launchSaving}
            launchSavingPercentage={sellerPlan.launchSavingPercentage}
            annualPrice={sellerPlan.annualPrice}
            desc={sellerPlan.desc}
            featureSubName={sellerPlan.featureSubName}
            featuresLists={sellerPlan.featuresListsMonthly}
            setIsMonthly={setIsMonthly}
            requestChangeSubscription={requestChangeSubscription}
            // Plan details
            isPaidSellerSubscription={
              sellerSubscription.payment_mode === 'monthly'
                ? sellerPlan.id === sellerSubscription.subscription_id
                : false
            }
            ctaText={sellerPlan.ctaText}
            isMonthly={true}
            className={styles.planInformationBox}
          />
        </div>
      </div>
    </section>
  );
};

export default HeroBox;
