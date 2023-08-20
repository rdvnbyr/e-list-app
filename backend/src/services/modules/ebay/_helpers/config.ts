export const SCOPES = [
  'https://api.ebay.com/oauth/api_scope',
  'https://api.ebay.com/oauth/api_scope/sell.marketing.readonly',
  'https://api.ebay.com/oauth/api_scope/sell.marketing',
  'https://api.ebay.com/oauth/api_scope/sell.inventory.readonly',
  'https://api.ebay.com/oauth/api_scope/sell.inventory',
  'https://api.ebay.com/oauth/api_scope/sell.account.readonly',
  'https://api.ebay.com/oauth/api_scope/sell.account',
  'https://api.ebay.com/oauth/api_scope/sell.fulfillment.readonly',
  'https://api.ebay.com/oauth/api_scope/sell.fulfillment',
  'https://api.ebay.com/oauth/api_scope/commerce.identity.readonly',
];
export const CONNECTION_SANDBOX = {
  clientId: 'xxxxxx',
  clientSecret: 'xxxxxxx',
  devid: 'xxxxx',
  redirectUri: 'xxxxxxx',
  baseUrl: 'api.sandbox.ebay.com',
  env: 'SANDBOX',
};
export const CONNECTION_PRODUCTION = {
  clientId: '',
  clientSecret: '',
  devid: '',
  redirectUri: '',
  baseUrl: 'api.ebay.com',
  env: 'PRODUCTION',
};

export const EBAY_SELL_INVENTORY_API_URL = 'https://api.ebay.com/sell/inventory/v1';
export const EBAY_SELL_FULFILLMENT_API_URL = 'https://api.ebay.com/sell/fulfillment/v1';
export const EBAY_SELL_ACCOUNT_API_URL = 'https://api.ebay.com/sell/account/v1';

export const EBAY_COMMERCE_TAXONOMY_API_URL = 'https://api.ebay.com/commerce/taxonomy/v1';
