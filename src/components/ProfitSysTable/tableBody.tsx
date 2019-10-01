import React from 'react';
import { Table } from 'semantic-ui-react';
import Topseller from './topSeller';
import ProductDescription from './productDescription';
import Pricing from './pricing';
import DetailButtons from './detailButtons';
import Ratings from './ratings';

const TableBody = (props: any) => {
  const { data, onSelectItem } = props;
  return (
    <Table.Body>
      {Array.isArray(data) &&
        data.map((item, i) => (
          <Table.Row key={i}>
            <Table.Cell collapsing>
              <Topseller
                crownSrc={item.crownImg}
                checked={item.checked}
                topSellerImg={item.topSellerImg}
                onSelectItem={onSelectItem}
                index={i}
              />
            </Table.Cell>
            <Table.Cell collapsing>
              <h2>{item.productName}</h2>
              <div className="wrap_prod_information">
                <ProductDescription
                  seller={item.seller}
                  productId={item.productId}
                  productImg={item.productImg}
                  sections={item.sections}
                />
                <div className="rgt_prod">
                  <Ratings totalReviews={item.totalReviews} starRatings={item.starRatings} />
                  <Pricing
                    price={item.price}
                    category={item.category}
                    amazonSrc={item.amazonImg}
                    primeSrc={item.primeImg}
                  />
                </div>
              </div>
            </Table.Cell>
            <Table.Cell collapsing>${item.profit} /item</Table.Cell>
            <Table.Cell collapsing>{item.margin}%</Table.Cell>
            <Table.Cell collapsing>
              <p className="mg_botm0">{item.unitSoldPerDay} /day</p>
              <p className="fnt12">{item.unitSoldPerMonth} /mo</p>
            </Table.Cell>
            <Table.Cell collapsing>${item.profitPerMon}</Table.Cell>
            <Table.Cell collapsing>{item.roi}%</Table.Cell>
            <Table.Cell collapsing>
              <DetailButtons ratings={item.ratings} />
            </Table.Cell>
          </Table.Row>
        ))}
    </Table.Body>
  );
};

export default TableBody;
