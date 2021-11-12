/* All action types */
export const actionTypes = {
  UPDATE_PRODUCTS_DATABASE_FILTER: 'UPDATE_PRODUCTS_DATABASE_FILTER',
  IS_LOADING_PRODUCTS_DATABASE: 'IS_LOADING_PRODUCTS_DATABASE',
  SET_PRODUCTS_DATABASE: 'SET_PRODUCTS_DATABASE',
  SET_PRODUCTS_DATABASE_PAGINATION_INFO: 'SET_PRODUCTS_DATABASE_PAGINATION_INFO',
  FETCH_PRODUCTS_DATABASE: 'FETCH_PRODUCTS_DATABASE',
  SET_PRODUCTS_DATABASE_FILTERS: 'SET_PRODUCTS_DATABASE_FILTERS',
};

/* Filter Types */
export const DEFAULT_MIN_MAX_FILTER = {
  min: '',
  max: '',
};

export const DEFAULT_MIN_MAX_PERIOD_FILTER = {
  ...DEFAULT_MIN_MAX_FILTER,
  period: '30_days',
};

export const DEFAULT_INCLUDE_EXCLUDE_FILTER = {
  include: '',
  exclude: '',
};

export const DEFAULT_INCLUDE_EXCLUDE_ERROR = {
  include: false,
  exclude: false,
};

export const DEFAULT_CHECKBOX_FILTER = {};

export const F_TYPES = {
  TEXT: 'TEXT',
  INPUT_INCLUDE_EXCLUDE: 'INPUT_INCLUDE_EXCLUDE',
  MIN_MAX: 'MIN_MAX',
  CHECK_BOX: 'CHECK_BOX',
  MULTIPLE_CHECK_BOX: 'MULTIPLE_CHECK_BOX',
};

/* Map the payload keys to query keys for API */
export const FILTER_QUERY_KEY_MAPPER: { [key: string]: { keyName: string; type: string } } = {
  // simple
  categories: { keyName: 'categories', type: F_TYPES.MULTIPLE_CHECK_BOX },
  monthlyRevenue: { keyName: 'monthly_revenue', type: F_TYPES.MIN_MAX },
  monthlySales: { keyName: 'monthly_sales', type: F_TYPES.MIN_MAX },
  price: { keyName: 'price', type: F_TYPES.MIN_MAX },
  reviewCount: { keyName: 'review_count', type: F_TYPES.MIN_MAX },
  reviewRating: { keyName: 'rating', type: F_TYPES.MIN_MAX },

  // Advanced
  sellerCount: { keyName: 'seller_count', type: F_TYPES.MIN_MAX },
  weight: { keyName: 'weight_lbs', type: F_TYPES.MIN_MAX },
  titleKeywords: { keyName: 'title_keywords', type: F_TYPES.INPUT_INCLUDE_EXCLUDE },
  brands: { keyName: 'brands', type: F_TYPES.INPUT_INCLUDE_EXCLUDE },
  bsr: { keyName: 'bsr', type: F_TYPES.MIN_MAX },
  sizeTier: { keyName: 'size_tier', type: F_TYPES.TEXT },
  imageCount: { keyName: 'image_count', type: F_TYPES.MIN_MAX },
  variationCount: { keyName: 'variation_count', type: F_TYPES.MIN_MAX },
  fulfillment: { keyName: 'fulfillment', type: F_TYPES.CHECK_BOX },
};

export const PRODUCTS_DATABASE_SIZE_TIERS = [
  { key: 'Small standard-size', value: 'Small standard-size', text: 'Small standard-size' },
  { key: 'Small oversize', value: 'Small oversize', text: 'Small oversize' },
  { key: 'Medium oversize', value: 'Medium oversize', text: 'Medium oversize' },
  { key: 'Large standard-size', value: 'Large standard-size', text: 'Large standard-size' },
  { key: 'large oversize', value: 'large oversize', text: 'large oversize' },
  { key: 'Special oversize', value: 'Special oversize', text: 'Special oversize' },
];

export const FULFILMENT_TYPES = [
  { key: 'is_fba', value: 'is_fba', text: 'FBA' },
  { key: 'is_fbm', value: 'is_fbm', text: 'FBM' },
  { key: 'is_amazon', value: 'is_amazon', text: 'Amazon' },
];

export const DEFAULT_FULFILMENT_FILTER = { is_fba: false, is_fbm: false, is_amazon: false };

/* Categories dropdown values for filter */
export const PRODUCTS_DATABASE_CATEGORIES = [
  { key: 'Books', value: 'Books', text: 'Books' },
  {
    key: 'Tools & Home Improvement',
    value: 'Tools & Home Improvement',
    text: 'Tools & Home Improvement',
  },
  {
    key: 'Collectibles & Fine Art',
    value: 'Collectibles & Fine Art',
    text: 'Collectibles & Fine Art',
  },
  {
    key: 'Everything Else',
    value: 'Everything Else',
    text: 'Everything Else',
  },
  {
    key: 'Clothing, Shoes & Jewelry',
    value: 'Clothing, Shoes & Jewelry',
    text: 'Clothing, Shoes & Jewelry',
  },
  { key: 'Video Games', value: 'Video Games', text: 'Video Games' },
  {
    key: 'Baby Products',
    value: 'Baby Products',
    text: 'Baby Products',
  },
  { key: 'Apps & Games', value: 'Apps & Games', text: 'Apps & Games' },
  { key: 'Movies & TV', value: 'Movies & TV', text: 'Movies & TV' },
  { key: 'Pet Supplies', value: 'Pet Supplies', text: 'Pet Supplies' },
  { key: 'Vehicles', value: 'Vehicles', text: 'Vehicles' },
  {
    key: 'Arts, Crafts & Sewing',
    value: 'Arts, Crafts & Sewing',
    text: 'Arts, Crafts & Sewing',
  },
  {
    key: 'Musical Instruments',
    value: 'Musical Instruments',
    text: 'Musical Instruments',
  },
  {
    key: 'Cell Phones & Accessories',
    value: 'Cell Phones & Accessories',
    text: 'Cell Phones & Accessories',
  },
  {
    key: 'Handmade Products',
    value: 'Handmade Products',
    text: 'Handmade Products',
  },
  {
    key: 'Home & Kitchen',
    value: 'Home & Kitchen',
    text: 'Home & Kitchen',
  },
  { key: 'CDs & Vinyl', value: 'CDs & Vinyl', text: 'CDs & Vinyl' },
  {
    key: 'Health & Household',
    value: 'Health & Household',
    text: 'Health & Household',
  },
  { key: 'Automotive', value: 'Automotive', text: 'Automotive' },
  {
    key: 'Office Products',
    value: 'Office Products',
    text: 'Office Products',
  },
  { key: 'Toys & Games', value: 'Toys & Games', text: 'Toys & Games' },
  { key: 'Software', value: 'Software', text: 'Software' },
  {
    key: 'Magazine Subscriptions',
    value: 'Magazine Subscriptions',
    text: 'Magazine Subscriptions',
  },
  { key: 'Electronics', value: 'Electronics', text: 'Electronics' },
  {
    key: 'Grocery & Gourmet Food',
    value: 'Grocery & Gourmet Food',
    text: 'Grocery & Gourmet Food',
  },
  {
    key: 'Beauty & Personal Care',
    value: 'Beauty & Personal Care',
    text: 'Beauty & Personal Care',
  },
  {
    key: 'Sports & Outdoors',
    value: 'Sports & Outdoors',
    text: 'Sports & Outdoors',
  },
  { key: 'Appliances', value: 'Appliances', text: 'Appliances' },
  {
    key: 'Patio, Lawn & Garden',
    value: 'Patio, Lawn & Garden',
    text: 'Patio, Lawn & Garden',
  },
  {
    key: 'Industrial & Scientific',
    value: 'Industrial & Scientific',
    text: 'Industrial & Scientific',
  },
];

export const MX_PRODUCTS_DATABASE_CATEGORIES = [
  { key: 'Belleza', value: 'Belleza', text: 'Belleza' },
  {
    key: 'Industria, Empresas y Ciencia',
    value: 'Industria, Empresas y Ciencia',
    text: 'Industria, Empresas y Ciencia',
  },
  { key: 'Alimentos y Bebidas', value: 'Alimentos y Bebidas', text: 'Alimentos y Bebidas' },
  { key: 'Productos Handmade', value: 'Productos Handmade', text: 'Productos Handmade' },
  { key: 'Libros', value: 'Libros', text: 'Libros' },
  {
    key: 'Instrumentos Musicales',
    value: 'Instrumentos Musicales',
    text: 'Instrumentos Musicales',
  },
  {
    key: 'Automotriz y Motocicletas',
    value: 'Automotriz y Motocicletas',
    text: 'Automotriz y Motocicletas',
  },
  { key: 'Música', value: 'Música', text: 'Música' },
  { key: 'Jardín', value: 'Jardín', text: 'Jardín' },
  { key: 'Bebé', value: 'Bebé', text: 'Bebé' },
  { key: 'Software', value: 'Software', text: 'Software' },
  {
    key: 'Salud y Cuidado Personal',
    value: 'Salud y Cuidado Personal',
    text: 'Salud y Cuidado Personal',
  },
  { key: 'Electrónicos', value: 'Electrónicos', text: 'Electrónicos' },
  {
    key: 'Ropa, Zapatos y Accesorios',
    value: 'Ropa, Zapatos y Accesorios',
    text: 'Ropa, Zapatos y Accesorios',
  },
  {
    key: 'Productos para Animales',
    value: 'Productos para Animales',
    text: 'Productos para Animales',
  },
  {
    key: 'Herramientas y Mejoras del Hogar',
    value: 'Herramientas y Mejoras del Hogar',
    text: 'Herramientas y Mejoras del Hogar',
  },
  { key: 'Juguetes y Juegos', value: 'Juguetes y Juegos', text: 'Juguetes y Juegos' },
  { key: 'Hogar y Cocina', value: 'Hogar y Cocina', text: 'Hogar y Cocina' },
  { key: 'Deportes y Aire libre', value: 'Deportes y Aire libre', text: 'Deportes y Aire libre' },
  {
    key: 'Películas y Series de TV',
    value: 'Películas y Series de TV',
    text: 'Películas y Series de TV',
  },
  { key: 'Tienda Kindle', value: 'Tienda Kindle', text: 'Tienda Kindle' },
  { key: 'Videojuegos', value: 'Videojuegos', text: 'Videojuegos' },
  { key: 'Oficina y Papelería', value: 'Oficina y Papelería', text: 'Oficina y Papelería' },
];

export const IT_PRODUCTS_DATABASE_CATEGORIES = [
  {
    key: 'Salute e cura della persona',
    value: 'Salute e cura della persona',
    text: 'Salute e cura della persona',
  },
  { key: 'Gioielli', value: 'Gioielli', text: 'Gioielli' },
  { key: 'Abbigliamento', value: 'Abbigliamento', text: 'Abbigliamento' },
  { key: 'Orologi', value: 'Orologi', text: 'Orologi' },
  { key: 'App e Giochi', value: 'App e Giochi', text: 'App e Giochi' },
  { key: 'Valigeria', value: 'Valigeria', text: 'Valigeria' },
  { key: 'Illuminazione', value: 'Illuminazione', text: 'Illuminazione' },
  { key: 'Prodotti Handmade', value: 'Prodotti Handmade', text: 'Prodotti Handmade' },
  { key: 'Informatica', value: 'Informatica', text: 'Informatica' },
  { key: 'Prima infanzia', value: 'Prima infanzia', text: 'Prima infanzia' },
  {
    key: 'Prodotti per animali domestici',
    value: 'Prodotti per animali domestici',
    text: 'Prodotti per animali domestici',
  },
  {
    key: 'Commercio, Industria e Scienza',
    value: 'Commercio, Industria e Scienza',
    text: 'Commercio, Industria e Scienza',
  },
  { key: 'Elettronica', value: 'Elettronica', text: 'Elettronica' },
  { key: 'it-spine', value: 'it-spine', text: 'it-spine' },
  {
    key: 'Cancelleria e prodotti per ufficio',
    value: 'Cancelleria e prodotti per ufficio',
    text: 'Cancelleria e prodotti per ufficio',
  },
  { key: 'Strumenti musicali', value: 'Strumenti musicali', text: 'Strumenti musicali' },
  { key: 'Bellezza', value: 'Bellezza', text: 'Bellezza' },
  {
    key: 'Alimentari e cura della casa',
    value: 'Alimentari e cura della casa',
    text: 'Alimentari e cura della casa',
  },
  { key: 'Casa e cucina', value: 'Casa e cucina', text: 'Casa e cucina' },
  { key: 'Musica Digitale', value: 'Musica Digitale', text: 'Musica Digitale' },
  { key: 'Giochi e giocattoli', value: 'Giochi e giocattoli', text: 'Giochi e giocattoli' },
  { key: 'Kindle Store', value: 'Kindle Store', text: 'Kindle Store' },
  {
    key: 'Grandi elettrodomestici',
    value: 'Grandi elettrodomestici',
    text: 'Grandi elettrodomestici',
  },
  { key: 'Fai da te', value: 'Fai da te', text: 'Fai da te' },
  {
    key: 'Giardino e giardinaggio',
    value: 'Giardino e giardinaggio',
    text: 'Giardino e giardinaggio',
  },
  { key: 'CD e Vinili', value: 'CD e Vinili', text: 'CD e Vinili' },
  { key: 'Videogiochi', value: 'Videogiochi', text: 'Videogiochi' },
  { key: 'Moda', value: 'Moda', text: 'Moda' },
  { key: 'Auto e Moto', value: 'Auto e Moto', text: 'Auto e Moto' },
  { key: 'Prime Video', value: 'Prime Video', text: 'Prime Video' },
  { key: 'Film e TV', value: 'Film e TV', text: 'Film e TV' },
  { key: 'Scarpe e borse', value: 'Scarpe e borse', text: 'Scarpe e borse' },
  { key: 'Libri', value: 'Libri', text: 'Libri' },
  { key: 'None', value: 'None', text: 'None' },
  { key: 'Sport e tempo libero', value: 'Sport e tempo libero', text: 'Sport e tempo libero' },
  { key: 'Altro', value: 'Altro', text: 'Altro' },
];

export const UK_PRODUCTS_DATABASE_CATEGORIES = [
  { key: 'PC & Video Games', value: 'PC & Video Games', text: 'PC & Video Games' },
  { key: 'DVD & Blu-ray', value: 'DVD & Blu-ray', text: 'DVD & Blu-ray' },
  {
    key: 'Health & Personal Care',
    value: 'Health & Personal Care',
    text: 'Health & Personal Care',
  },
  { key: 'Clothing', value: 'Clothing', text: 'Clothing' },
  { key: 'Beauty', value: 'Beauty', text: 'Beauty' },
  { key: 'Apps & Games', value: 'Apps & Games', text: 'Apps & Games' },
  { key: 'Electronics & Photo', value: 'Electronics & Photo', text: 'Electronics & Photo' },
  { key: 'Watches', value: 'Watches', text: 'Watches' },
  { key: 'Pet Supplies', value: 'Pet Supplies', text: 'Pet Supplies' },
  { key: 'Home & Kitchen', value: 'Home & Kitchen', text: 'Home & Kitchen' },
  {
    key: 'Computers & Accessories',
    value: 'Computers & Accessories',
    text: 'Computers & Accessories',
  },
  { key: 'Books', value: 'Books', text: 'Books' },
  {
    key: 'Audible Audiobooks & Originals',
    value: 'Audible Audiobooks & Originals',
    text: 'Audible Audiobooks & Originals',
  },
  { key: 'DIY & Tools', value: 'DIY & Tools', text: 'DIY & Tools' },
  { key: 'Sports & Outdoors', value: 'Sports & Outdoors', text: 'Sports & Outdoors' },
  {
    key: 'Business, Industry & Science',
    value: 'Business, Industry & Science',
    text: 'Business, Industry & Science',
  },
  { key: 'Lighting', value: 'Lighting', text: 'Lighting' },
  { key: 'Garden & Outdoors', value: 'Garden & Outdoors', text: 'Garden & Outdoors' },
  { key: 'Grocery', value: 'Grocery', text: 'Grocery' },
  { key: 'Fashion', value: 'Fashion', text: 'Fashion' },
  {
    key: 'Musical Instruments & DJ',
    value: 'Musical Instruments & DJ',
    text: 'Musical Instruments & DJ',
  },
  { key: 'Kindle Store', value: 'Kindle Store', text: 'Kindle Store' },
  {
    key: 'Stationery & Office Supplies',
    value: 'Stationery & Office Supplies',
    text: 'Stationery & Office Supplies',
  },
  { key: 'Handmade Products', value: 'Handmade Products', text: 'Handmade Products' },
  { key: 'Digital Music', value: 'Digital Music', text: 'Digital Music' },
  { key: 'CDs & Vinyl', value: 'CDs & Vinyl', text: 'CDs & Vinyl' },
  { key: 'Jewellery', value: 'Jewellery', text: 'Jewellery' },
  { key: 'Toys & Games', value: 'Toys & Games', text: 'Toys & Games' },
  { key: 'Large Appliances', value: 'Large Appliances', text: 'Large Appliances' },
  { key: 'Shoes & Bags', value: 'Shoes & Bags', text: 'Shoes & Bags' },
  { key: 'Software', value: 'Software', text: 'Software' },
  { key: 'Baby Products', value: 'Baby Products', text: 'Baby Products' },
  { key: 'Everything Else', value: 'Everything Else', text: 'Everything Else' },
  { key: 'Home & Garden', value: 'Home & Garden', text: 'Home & Garden' },
  { key: 'Prime Video', value: 'Prime Video', text: 'Prime Video' },
  { key: 'None', value: 'None', text: 'None' },
  { key: 'Automotive', value: 'Automotive', text: 'Automotive' },
  { key: 'Luggage', value: 'Luggage', text: 'Luggage' },
];

export const CA_PRODUCTS_DATABASE_CATEGORIES = [
  { key: 'Kindle Store', value: 'Kindle Store', text: 'Kindle Store' },
  { key: 'Apps for Android', value: 'Apps for Android', text: 'Apps for Android' },
  { key: 'Books', value: 'Books', text: 'Books' },
  { key: 'Luggage & Bags', value: 'Luggage & Bags', text: 'Luggage & Bags' },
  {
    key: 'Clothing, Shoes & Accessories',
    value: 'Clothing, Shoes & Accessories',
    text: 'Clothing, Shoes & Accessories',
  },
  { key: 'Electronics', value: 'Electronics', text: 'Electronics' },
  { key: 'Prime Video', value: 'Prime Video', text: 'Prime Video' },
  { key: 'Patio, Lawn & Garden', value: 'Patio, Lawn & Garden', text: 'Patio, Lawn & Garden' },
  { key: 'Music', value: 'Music', text: 'Music' },
  {
    key: 'Health & Personal Care',
    value: 'Health & Personal Care',
    text: 'Health & Personal Care',
  },
  { key: 'Handmade', value: 'Handmade', text: 'Handmade' },
  {
    key: 'Beauty & Personal Care',
    value: 'Beauty & Personal Care',
    text: 'Beauty & Personal Care',
  },
  { key: 'Video Games', value: 'Video Games', text: 'Video Games' },
  {
    key: 'Tools & Home Improvement',
    value: 'Tools & Home Improvement',
    text: 'Tools & Home Improvement',
  },
  { key: 'Jewelry', value: 'Jewelry', text: 'Jewelry' },
  { key: 'Automotive', value: 'Automotive', text: 'Automotive' },
  { key: 'Shoes & Handbags', value: 'Shoes & Handbags', text: 'Shoes & Handbags' },
  { key: 'Toys & Games', value: 'Toys & Games', text: 'Toys & Games' },
  { key: 'Everything Else', value: 'Everything Else', text: 'Everything Else' },
  {
    key: 'Grocery & Gourmet Food',
    value: 'Grocery & Gourmet Food',
    text: 'Grocery & Gourmet Food',
  },
  {
    key: 'Musical Instruments, Stage & Studio',
    value: 'Musical Instruments, Stage & Studio',
    text: 'Musical Instruments, Stage & Studio',
  },
  {
    key: 'Industrial & Scientific',
    value: 'Industrial & Scientific',
    text: 'Industrial & Scientific',
  },
  { key: 'Movies & TV', value: 'Movies & TV', text: 'Movies & TV' },
  {
    key: 'Clothing & Accessories',
    value: 'Clothing & Accessories',
    text: 'Clothing & Accessories',
  },
  { key: 'Featured Stores', value: 'Featured Stores', text: 'Featured Stores' },
  { key: 'Home & Kitchen', value: 'Home & Kitchen', text: 'Home & Kitchen' },
  { key: 'Office Products', value: 'Office Products', text: 'Office Products' },
  { key: 'Watches', value: 'Watches', text: 'Watches' },
  { key: 'Baby', value: 'Baby', text: 'Baby' },
  { key: 'Pet Supplies', value: 'Pet Supplies', text: 'Pet Supplies' },
  { key: 'Sports & Outdoors', value: 'Sports & Outdoors', text: 'Sports & Outdoors' },
];

export const getProductCategories = (marketplaceCode: string) => {
  if (marketplaceCode === 'MX') {
    return MX_PRODUCTS_DATABASE_CATEGORIES;
  } else if (marketplaceCode === 'IT') {
    return IT_PRODUCTS_DATABASE_CATEGORIES;
  } else if (marketplaceCode === 'CA') {
    return CA_PRODUCTS_DATABASE_CATEGORIES;
  } else if (marketplaceCode === 'GB') {
    return UK_PRODUCTS_DATABASE_CATEGORIES;
  } else {
    /* Default */
    return PRODUCTS_DATABASE_CATEGORIES;
  }
};
