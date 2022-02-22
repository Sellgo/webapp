import ExtensionIcon from '../../../../assets/images/rainbowChromeLogo.svg';
import KeywordIcon from '../../../../assets/images/rainbowKeywordIcon.svg';
import ProductIcon from '../../../../assets/images/rainbowProductIcon.svg';
import SellerIcon from '../../../../assets/images/rainbowSellerIcon.svg';
import WholesaleIcon from '../../../../assets/images/rainbowWholesaleIcon.svg';
import StockIcon from '../../../../assets/images/rainbowStockIcon.svg';

export const FEATURES: { icon: string; title: string; subtitle: string; content: string }[] = [
  {
    icon: ExtensionIcon,
    title: `Chrome Extension`,
    subtitle: `Scope out high demand products while browsing`,
    content: `Validate any product before sourcing and make confident business decisions, 
            done quickly while browsing on Amazon.`,
  },
  {
    icon: KeywordIcon,
    title: `Keyword Research`,
    subtitle: `Boost more sales with better keywords`,
    content: `What if we have a tool that showed you the exact search terms that 
            would drive traffic to your Amazon listing?`,
  },
  {
    icon: ProductIcon,
    title: `Product Research`,
    subtitle: `Analyze products easy and quick from`,
    content: `Easily explore the richest in the nichest. Quickly focus on The 
            Nichest in the Richest. Analyze your dream products in seconds.`,
  },
  {
    icon: SellerIcon,
    title: `Seller Research`,
    subtitle: `Find your neighborhood Amazon sellers, in a Google Map style`,
    content: `Locate and scout dozens of sellers. Break- down millions of 
            sellers by location, brands, products, and more ...`,
  },
  {
    icon: WholesaleIcon,
    title: `Wholesale Bulk Calculation`,
    subtitle: `Calculate your profit for each product on the fly`,
    content: `Accurately calculate and compare all the products in Amazon catalog 
            including product variations and multipacks.`,
  },
  {
    icon: StockIcon,
    title: `Perfect Stock`,
    subtitle: `Never stockout, rarely overstock.`,
    content: `Accurately calculates when sellers should order to prevent a stockout, 
            and how many units to restock.`,
  },
];
