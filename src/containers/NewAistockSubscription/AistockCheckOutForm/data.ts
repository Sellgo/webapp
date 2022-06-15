import ProfilePicture from '../../../assets/images/andrew.png';

export const TESTIMONIAL = {
  title: `The 1st inventory planning for Amazon sellers!`,
  testimonial: `"AiStock gives our supply chain one place to get whatever help we need. It gives us a
    single point of integration for all our logistic process, helping us focus on increasing
    sales and launch new products as we grow."`,
  authorImg: ProfilePicture,
  authorName: 'Andrew Erickson',
  authorTitle: `7-figure Brand Entrepreneur`,
};

export const ORDER_ITEMS = [
  {
    title: 'Seller account first month - $29.97 billed today',
    price: 29.97,
  },
];

export const getTotalOrderPrice = () => {
  return ORDER_ITEMS.reduce((acc, item) => acc + item.price, 0);
};
