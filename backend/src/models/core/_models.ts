export type ProductListingStatus = 'EBAY_LISTED' | 'EBAY_OFFERED' | 'EBAY_INVENTORED';

export type PricingVisibility = 'NONE' | 'PRE_CHECKOUT' | 'DURING_CHECKOUT';

export type FulfillmentTimeUnitEnum =
  | 'HOURS'
  | 'DAY'
  | 'WEEK'
  | 'MONTH'
  | 'YEAR'
  | 'BUSINESS_DAY'
  | 'CALENDAR_DAY';

export interface FulfillmentTime {
  unit: FulfillmentTimeUnitEnum;
  value: number;
}
