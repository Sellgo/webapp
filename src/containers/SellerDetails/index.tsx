/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
// import { useLocation } from 'react-router';

// import { connect } from 'react-redux';

/* Styling */
import styles from './index.module.scss';
import Summary from './Summary';
import TabsRow from '../../components/TabsRow';
import ContactInformation from './ContactInformation';
import { sellerIDSelector } from '../../selectors/Seller';
import { AppConfig } from '../../config';
import axios from 'axios';
import { error } from '../../utils/notifications';
import PageHeader from '../../components/PageHeader';
import { capitalizeWords } from '../../utils/format';
import OrgChart from './OrgChart';
import ReviewRatings from './ReviewRatings';

/* Containers */

/* Components */
// import FilterMessage from '../../../components/FilterMessage';

/* Selectors */
// import { getFilterMessage } from '../../../selectors/SellerResearch/SellerDatabase';

/* Interfaces */
// import {
//   SellerDatabasePayload,
//   ShowFilterMessage,
// } from '../../../interfaces/SellerResearch/SellerDatabase';

/* ACtions */
// import { fetchSellerDatabase } from '../../actions/SellerResearch/SellerDatabase';
// import DefaultDisplay from './DefaultDisplay';
// import SellgoGreetingVideoSection from '../../NewSellgoSubscription/VideoSection';

interface Props {
  match: any;
}

const SellerDetails = (props: Props) => {
  const { match } = props;
  //   const { fetchSellerDatabase } = props;
  const location = window.location.pathname;
  const tempLocation = location.split('/');
  const sellerNameWithid = tempLocation[tempLocation.length - 1];
  const tempId = sellerNameWithid.split('_');
  const id = tempId[tempId.length - 1];
  tempId.splice(-2);
  const brandName = tempId.join(' ');
  console.log('LOCATION ', location);
  const [currentTab, setCurrentTab] = useState<number>(0);
  const [currentSeller, setCurrentSeller] = useState<any>();
  // const getCurrentSeller = () => {
  //   // Call the seller api
  //   console.log('current seller');
  //   setCurrentSeller({
  //     address: '11083 State Route 9',
  //     asin: null,
  //     asins: ['B084BKW8WJ', 'B07XPZKB1D', 'B07WT5XKCW', 'B08WGY4HZH'],
  //     brands: ['Stone Lain'],
  //     business_name: 'GNS Sales LLC',
  //     city: 'Champlain',
  //     count_12_month: null,
  //     count_30_days: 2,
  //     count_90_days: null,
  //     count_lifetime: 8740,
  //     country: 'US',
  //     created_at: '2021-07-02T10:19:36.733000+00:00',
  //     feedback:
  //       '[{"stars": "5 out of 5 stars", "comment": "Wonderful company to deal with.  We had a small problem and the company more than compensated for a small mistake.  ", "comment_by": "\\n        By jonski on July 1, 2021.\\n    "}, {"stars": "5 out of 5 stars", "comment": "Great customer service!!", "comment_by": "\\n        By jonski on July 1, 2021.\\n    "}, {"stars": "5 out of 5 stars", "comment": null, "comment_by": "\\n        By jonski on July 1, 2021.\\n    "}, {"stars": "5 out of 5 stars", "comment": "Love these dishes. Sturdy and deep", "comment_by": "\\n        By jonski on July 1, 2021.\\n    "}, {"stars": "5 out of 5 stars", "comment": "Beautiful set!  Highly satisfied!", "comment_by": "\\n        By jonski on July 1, 2021.\\n    "}, {"stars": "5 out of 5 stars", "comment": null, "comment_by": "\\n        By jonski on July 1, 2021.\\n    "}]',
  //     inventory_count: 4,
  //     inventory_link: 'https://www.amazon.com/shops/A00433442FV6PCYF2IT64?ref_=v_sp_storefront',
  //     is_isbn: false,
  //     launched: '>1Y',
  //     marketplace_id: 'ATVPDKIKX0DER',
  //     negative_12_month: null,
  //     negative_30_days: null,
  //     negative_90_days: null,
  //     negative_lifetime: null,
  //     neutral_12_month: null,
  //     neutral_30_days: null,
  //     neutral_90_days: null,
  //     neutral_lifetime: null,
  //     phone: '866-209-4203',
  //     positive_12_month: null,
  //     positive_30_days: null,
  //     positive_90_days: null,
  //     positive_lifetime: null,
  //     review_ratings: null,
  //     seller_link: 'https://www.amazon.com/sp?seller=A00433442FV6PCYF2IT64',
  //     seller_logo: 'https://images-na.ssl-images-amazon.com/images/I/21IGSY5W4GL.jpg',
  //     seller_rating: 5,
  //     state: 'NY',
  //     yield_type: 'from_parse_inventory_info',
  //     zip_code: '12919',
  //     confirmed_name: null,
  //     growth_L180D: null,
  //     growth_L90D: null,
  //     growth_count_L180D: 2,
  //     growth_month: null,
  //     growth_month_count: 2,
  //     growth_year: null,
  //     latitude: 44.9679,
  //     longitude: -73.44937,
  //     sales_estimate: 158988,
  //     fba_percent: 59,
  //     company_info: {
  //       phone: null,
  //       fax: null,
  //       website_url: 'http://www.gnssale.com',
  //       links: {},
  //     },
  //     has_contact: true,
  //     employee_stats: {
  //       has_personal_email: true,
  //       employees_count: 5,
  //       has_professional_email: true,
  //       has_employee_phone: true,
  //       has_employee_social: true,
  //     },
  //     emails: [
  //       {
  //         email: 'info@gnssale.com',
  //         type: 'company',
  //         last_verified: '2023-02-10',
  //       },
  //     ],
  //     is_suspended: false,
  //     last_suspended: null,
  //     updated_at: '2023-03-09T18:57:06.697000+00:00',
  //     whls_top_brand: null,
  //     whls_top_product: 0,
  //     whls_total_brand: 1,
  //     whls_total_product: 7,
  //     id: '60dee838410071add68609ee',
  //     category: 'Grocery & Gourmet Food',
  //     seller_type: 'wholesale',
  //     tracking_status: false,
  //     merchant_id: 'A00433442FV6PCYF2IT64',
  //     merchant_name: 'Stone Lain Official',
  //     is_looked_up: true,
  //     is_contact_requested: false,
  //   });
  // };

  const fetchEmployeesInformation = async () => {
    try {
      const sellerId = sellerIDSelector();

      // eslint-disable-next-line max-len
      const URL = `${AppConfig.BASE_URL_API}sellers/${sellerId}/merchants-database/${id}`;

      const { data, status } = await axios.get(URL);

      if (data) {
        console.log(data);
        setCurrentSeller(data);
      }

      if (status === 429) {
        error(data.message);
      }
    } catch (err) {
      console.error('Error fetching employees', err);
      const { response } = err as any;
      const { status, data } = response;

      if (status === 429) {
        error(data.message);
      }
    }
    // setIsLoading(false);
  };
  console.log('seller data', fetchEmployeesInformation);
  useEffect(() => {
    fetchEmployeesInformation();
  }, []);
  return (
    <>
      <PageHeader
        title={`Seller Details`}
        breadcrumb={[
          { content: 'Home', to: '/' },
          { content: 'Brands', to: '' },
          {
            content: capitalizeWords(brandName),
            to: '',
          },
        ]}
        auth={match.params.auth}
      />
      {currentSeller && (
        <main className={styles.sellerDetailsPage}>
          <Summary rowData={currentSeller} />
          <TabsRow
            tabs={['contact', 'org chart', 'Reviews']}
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
            className={styles.tabs}
          />
          {currentTab === 0 && (
            <ContactInformation rowData={currentSeller} setCurrentData={setCurrentSeller} />
          )}
          {currentTab === 1 && <OrgChart setStep={setCurrentTab} />}
          {currentTab === 2 && <ReviewRatings />}
        </main>
      )}
    </>
  );
};

// const mapStateToProps = (state: any) => {
//   return {
//     showFilterMessage: getFilterMessage(state),
//   };
// };

// const mapDispatchToProps = (dispatch: any) => {
//   return {
//     fetchSellerDatabase: (payload: SellerDatabasePayload) => dispatch(fetchSellerDatabase(payload)),
//   };
// };
// export default connect(mapStateToProps, mapDispatchToProps)(SellerDatabase);

export default SellerDetails;
