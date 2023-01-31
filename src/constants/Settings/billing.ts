export const DEFAULT_QUOTA = {
  used: 0,
  available: 0,
};

export const DEFAULT_QUOTA_COLLECTION = {
  sales_estimation: DEFAULT_QUOTA,
  profit_finder: DEFAULT_QUOTA,
  product_tracker: DEFAULT_QUOTA,
  seller_research: DEFAULT_QUOTA,
  seller_detail: DEFAULT_QUOTA,
};

export const DEFAULT_STRIPE_SUBSCRIPTION_INFO = {
  next_due_date: '',
  payment_amount: '',
};

export const DEFAULT_CREDIT_CARD = {
  brand: '',
  last4: '',
  exp_date: '',
};
