export type PoliciesMap = {
  [key: string]: {id: string; name?: string}[];
};

export interface Amount {
  value: number;
  currency: string;
  convertedFromCurrency?: string;
  convertedFromValue?: string;
}

export interface EbayOffer {
  offerId: string;
  sku: string;
  pricingSummary: {price?: {value: string}};
}
export interface EbayListingPolicies {
  bestOfferTerms?: {
    autoAcceptPrice?: Amount;
    autoDeclinePrice?: Amount;
    bestOfferEnabled?: boolean;
  };
  eBayPlusIfEligible?: boolean;
  fulfillmentPolicyId: string;
  paymentPolicyId: string;
  productCompliancePolicyIds?: string[];
  returnPolicyId: string;
  takeBackPolicyId?: string;
  shippingCostOverrides?: {
    additionalShippingCost: Amount;
    priority: number;
    shippingCost: Amount;
    shippingServiceType: 'DOMESTIC' | 'INTERNATIONAL';
    surcharge: Amount;
  }[];
}

export interface EbayPricingSummary {
  auctionReservePrice?: Amount;
  auctionStartPrice?: Amount;
  minimumAdvertisedPrice?: Amount;
  originalRetailPrice?: Amount;
  price: Amount;
  pricingVisibility?: 'NONE' | 'PRE_CHECKOUT' | 'DURING_CHECKOUT';
  originallySoldForRetailPriceOn?: 'ON_EBAY' | 'OFF_EBAY' | 'ON_AND_OFF_EBAY';
}
export type ListingDurationEnum =
  | 'DAYS_1'
  | 'DAYS_3'
  | 'DAYS_5'
  | 'DAYS_7'
  | 'DAYS_10'
  | 'DAYS_21'
  | 'DAYS_30'
  | 'GTC';

export interface EbayCreateOffer {
  availableQuantity: number;
  categoryId: string;
  charity?: {
    charityId: string;
    donationPercentage: string;
  };
  extendedProducerResponsibility?: {
    producerProductId?: string;
    productPackageId?: string;
    shipmentPackageId?: string;
    productDocumentationId?: string;
    ecoParticipationFee?: Amount;
  };
  format: 'AUCTION' | 'FIXED_PRICE';
  hideBuyerDetails?: boolean;
  includeCatalogProductDetails?: boolean;
  listingDescription: string;
  listingDuration?: ListingDurationEnum;
  listingPolicies: EbayListingPolicies;
  listingStartDate?: string;
  lotSize?: number;
  marketplaceId?: string; // should be enum of eBay marketplace ids (e.g. 'EBAY_US' | 'EBAY_DE')
  merchantLocationKey?: string; // max length: 36
  pricingSummary: EbayPricingSummary;
  quantityLimitPerBuyer?: number;
  secondaryCategoryId?: string;
  sku: string;
  storeCategoryNames?: string[];
  tax?: {
    applyTax: boolean;
    thirdPartyTaxCategory?: string;
    vatPercentage?: number;
  };
}

export type MarketplaceIdEnum =
  | 'EBAY_AT'
  | 'EBAY_AU'
  | 'EBAY_BE'
  | 'EBAY_CA'
  | 'EBAY_CH'
  | 'EBAY_CN'
  | 'EBAY_CZ'
  | 'EBAY_DE'
  | 'EBAY_DK'
  | 'EBAY_ES'
  | 'EBAY_FI'
  | 'EBAY_FR'
  | 'EBAY_GB'
  | 'EBAY_GR'
  | 'EBAY_HK'
  | 'EBAY_HU'
  | 'EBAY_ID'
  | 'EBAY_IE'
  | 'EBAY_IL'
  | 'EBAY_IN'
  | 'EBAY_IT'
  | 'EBAY_JP'
  | 'EBAY_MY'
  | 'EBAY_NL'
  | 'EBAY_NO'
  | 'EBAY_NZ'
  | 'EBAY_PE'
  | 'EBAY_PH'
  | 'EBAY_PL'
  | 'EBAY_PR'
  | 'EBAY_PT'
  | 'EBAY_RU'
  | 'EBAY_SE'
  | 'EBAY_SG'
  | 'EBAY_TH'
  | 'EBAY_TW'
  | 'EBAY_US'
  | 'EBAY_VN'
  | 'EBAY_ZA'
  | 'EBAY_HALF_US'
  | 'EBAY_MOTORS_US';

export interface EbayError {
  category: string;
  domain?: string;
  errorId: string;
  inputRefIds?: string[];
  longMessage?: string;
  message: string;
  outputRefIds?: string[];
  parameters?: {name: string; value: string}[];
  subdomain?: string;
}

export type PolicyEnum =
  | 'fulfillmentPolicy'
  | 'paymentPolicy'
  | 'returnPolicy'
  | 'allPolicies';

interface EbayAddress {
  addressLine1: string;
  addressLine2?: string;
  city: string;
  countryCode: string;
  county?: string;
  postalCode?: string;
  stateOrProvince?: string;
}
type CancelRequest = {
  cancelCompletedDate?: string;
  cancelInitiator?: string;
  cancelReason?: string;
  cancelRequestedDate: string;
  cancelRequestId?: string;
  cancelRequestState?: string; // enum types -> COMPLETED, REJECTED, REQUESTED
};

type AppliedPromotion = {
  description?: string;
  discountAmount?: Amount;
  promotionId?: string;
};
type EbayCollectAndRemitTax = {
  amount?: Amount;
  ebayReference?: {
    name?: string;
    value?: string;
  };
  taxType?: string; // enum -> https://developer.ebay.com/api-docs/sell/fulfillment/types/sel:TaxTypeEnum
  collectionMethod?: 'INVOICE' | 'NET'; // enum -> https://developer.ebay.com/api-docs/sell/fulfillment/types/sel:CollectionMethodEnum
};
type LineItemFulfillmentInstructions = {
  destinationTimeZone?: string;
  guaranteedDelivery: boolean;
  maxEstimatedDeliveryDate: string;
  minEstimatedDeliveryDate: string;
  shipByDate: string;
  sourceTimeZone?: string;
};
type LineItemRefund = {
  amount?: Amount;
  refundDate?: string;
  refundId?: string;
  refundReferenceId?: string;
};
type Tax = {
  amount?: Amount;
  taxType: string; // enum -> https://developer.ebay.com/api-docs/sell/fulfillment/types/sel:TaxTypeEnum
};
interface FulfillmentStartInstruction {
  destinationTimeZone?: string;
  ebaySupportedFulfillment?: boolean;
  finalDestinationAddress: EbayAddress;
  fulfillmentInstructionsType: string; // enum types -> DIGITAL, PREPARE_FOR_PICKUP, SELLER_DEFINED, SHIP_TO
  maxEstimatedDeliveryDate?: string;
  minEstimatedDeliveryDate?: string;
  pickupStep?: {
    merchantLocationKey?: string;
  };
  shippingStep?: {
    shippingCarrierCode: string;
    shippingServiceCode: string;
    shipTo: {
      companyName?: string;
      contactAddress: EbayAddress;
      email?: string;
      fullName: string;
      primaryPhone?: {
        phoneNumber?: string;
      };
    };
    shipToReferenceId?: string;
  };
}
interface LineItem {
  appliedPromotions: AppliedPromotion;
  deliveryCost: {
    importCharges?: Amount;
    shippingCost: Amount;
    shippingIntermediationFee?: Amount;
  };
  discountedLineItemCost?: Amount;
  ebayCollectAndRemitTaxes?: EbayCollectAndRemitTax[];
  giftDetails?: {
    message?: string;
    recipientEmail?: string;
    senderName?: string;
  };
  itemLocation?: Partial<EbayAddress> & {
    location?: string;
  };
  legacyItemId: string;
  legacyVariationId?: string;
  lineItemCost: Amount;
  lineItemFulfillmentInstructions: LineItemFulfillmentInstructions;
  lineItemFulfillmentStatus?: 'FULFILLED' | 'IN_PROGRESS' | 'NOT_STARTED'; // enum -> https://developer.ebay.com/api-docs/sell/fulfillment/types/sel:LineItemFulfillmentStatusEnum
  lineItemId: string;
  listingMarketplaceId: string; // enum -> https://developer.ebay.com/api-docs/sell/fulfillment/types/ba:MarketplaceIdEnum
  properties: {
    buyerProtection: boolean;
    fromBestOffer?: boolean;
    soldViaAdCampaign?: boolean;
  };
  purchaseMarketplaceId: string; // enum -> https://developer.ebay.com/api-docs/sell/fulfillment/types/ba:MarketplaceIdEnum
  quantity: number;
  refunds: LineItemRefund[];
  sku?: string;
  soldFormat: 'AUCTION' | 'FIXED_PRICE' | 'OTHER' | 'SECOND_CHANCE_OFFER'; // enum -> https://developer.ebay.com/api-docs/sell/fulfillment/types/sel:SoldFormatEnum
  taxes: Tax[];
  title: string;
  total: Amount;
}
type PaymentHolds = {
  expectedReleaseDate?: string;
  holdAmount?: Amount;
  holdReason?: string;
  holdState?: string; // enum -> HELD, HELD_PENDING, NOT_HELD, RELEASE_CONFIRMED, RELEASE_FAILED, RELEASE_PENDING, RELEASED
  releaseDate?: string;
  sellerActionsToRelease?: {sellerActionToRelease?: string}[];
};
type Payments = {
  amount: Amount;
  paymentDate?: string;
  paymentHolds?: PaymentHolds[];
  paymentMethod:
    | 'CREDIT_CARD'
    | 'PAYPAL'
    | 'CASHIER_CHECK'
    | 'PERSONAL_CHECK'
    | 'CASH_ON_PICKUP'
    | 'EFT'
    | 'EBAY'
    | 'ESCROW'; // enum -> https://developer.ebay.com/api-docs/sell/fulfillment/types/sel:PaymentMethodTypeEnum
  paymentReferenceId?: string;
  paymentStatus: 'FAILED' | 'PAID' | 'PENDING'; // enum -> https://developer.ebay.com/api-docs/sell/fulfillment/types/sel:PaymentStatusEnum
};
type OrderRefund = {
  amount?: Amount;
  refundDate?: string;
  refundId?: string;
  refundReferenceId?: string;
  refundStatus?: 'FAILED' | 'PENDING' | 'REFUNDED'; // enum -> https://developer.ebay.com/api-docs/sell/fulfillment/types/sel:RefundStatusEnum
  totalDueSeller?: Amount;
};
interface PaymentSummary {
  payments: Payments[];
  refunds: OrderRefund[];
}
interface PricingSummary {
  adjustment?: Amount;
  deliveryCost: Amount;
  deliveryDiscount?: Amount;
  fee?: Amount;
  priceDiscountSubtotal?: Amount;
  priceSubtotal: Amount;
  tax?: Amount;
  total: Amount;
}

export interface ResponseEbayOrder {
  buyer: {
    taxAddress: Partial<EbayAddress> & {
      stateOrProvince?: string;
    };
    taxIdentifier?: {
      taxpayerId?: string;
      taxIdentifierType?: string;
      issuingCountry?: string;
    };
    username: string;
    checkoutNotes?: string;
  };
  cancelStatus: {
    cancelledDate?: string;
    cancelRequests: CancelRequest[] | [];
    cancelState: 'CANCELLED' | 'IN_PROGRESS' | 'NONE_REQUESTED';
  };
  creationDate: string;
  ebayCollectAndRemitTax?: boolean;
  fulfillmentHrefs?: string[];
  fulfillmentStartInstructions: FulfillmentStartInstruction[];
  lastModifiedDate: string;
  legacyOrderId: string;
  lineItems: LineItem[];
  orderFulfillmentStatus: 'FULFILLED' | 'IN_PROGRESS' | 'NOT_STARTED'; // enum -> https://developer.ebay.com/api-docs/sell/fulfillment/types/sel:OrderFulfillmentStatus
  orderId: string;
  orderPaymentStatus:
    | 'FAILED'
    | 'FULLY_REFUNDED'
    | 'PAID'
    | 'PARTIALLY_REFUNDED'
    | 'PENDING'; // enum -> https://developer.ebay.com/api-docs/sell/fulfillment/types/sel:OrderPaymentStatusEnum
  paymentSummary: PaymentSummary;
  pricingSummary: PricingSummary;
  program?: {
    authenticityVerification?: {
      outcomeReason?:
        | 'NOT_AUTHENTIC'
        | 'NOT_AS_DESCRIBED'
        | 'CUSTOMIZED'
        | 'MISCATEGORIZED'
        | 'NOT_AUTHENTIC_NO_RETURN'; // enum -> https://developer.ebay.com/api-docs/sell/fulfillment/types/sel:AuthenticityVerificationReasonEnum
      status?: 'PENDING' | 'PASSED' | 'FAILED' | 'PASSED_WITH_EXCEPTION'; // enum -> https://developer.ebay.com/api-docs/sell/fulfillment/types/sel:AuthenticityVerificationStatusEnum
    };
    fulfillmentProgram?: {
      fulfilledBy: string;
    };
  };
  salesRecordReference?: string;
  sellerId: string;
  totalFeeBasisAmount: Amount;
  totalMarketplaceFee?: Amount;
  buyerCheckoutNotes?: string;
}

type AspectConstraint = {
  aspectApplicableTo?: ('ITEM' | 'PRODUCT')[];
  aspectDataType: 'DATE' | 'NUMBER' | 'STRING' | 'STRING_ARRAY';
  aspectEnabledForVariations: boolean;
  aspectFormat?: string;
  aspectMaxLength?: number;
  aspectMode: 'FREE_TEXT' | 'SELECTION_ONLY';
  aspectRequired: boolean;
  aspectUsage: 'RECOMMENDED' | 'OPTIONAL';
  expectedRequiredByDate?: string;
  itemToAspectCardinality: 'MULTI' | 'SINGLE';
};

type ValueConstraint = {
  applicableForLocalizedAspectName: string;
  applicableForLocalizedAspectValues: string[];
};
type AspectValue = {
  localizedValue: string;
  valueConstraints?: ValueConstraint[];
};

export interface ItemAspect {
  localizedAspectName: string;
  aspectConstraint: AspectConstraint;
  aspectValues: AspectValue[];
  relevanceIndicator?: {
    searchCount: number;
  };
}

export type TimeDurationUnitEnum =
  | 'YEAR'
  | 'MONTH'
  | 'DAY'
  | 'HOUR'
  | 'CALENDAR_DAY'
  | 'BUSINESS_DAY'
  | 'MINUTE'
  | 'SECOND'
  | 'MILLISECOND';
export type AvailabilityTypeEnum = 'IN_STOCK' | 'OUT_OF_STOCK' | 'SHIP_TO_STORE';
export type ConditionsEnum =
  | 'NEW'
  | 'LIKE_NEW'
  | 'NEW_OTHER'
  | 'NEW_WITH_DEFECTS'
  | 'MANUFACTURER_REFURBISHED'
  | 'CERTIFIED_REFURBISHED'
  | 'EXCELLENT_REFURBISHED'
  | 'VERY_GOOD_REFURBISHED'
  | 'GOOD_REFURBISHED'
  | 'SELLER_REFURBISHED'
  | 'USED_EXCELLENT'
  | 'USED_VERY_GOOD'
  | 'USED_GOOD'
  | 'USED_ACCEPTABLE'
  | 'FOR_PARTS_OR_NOT_WORKING';
export type LengthUnitEnum = 'INCH' | 'FEET' | 'CENTIMETER' | 'METER';
export type WeightUnitEnum = 'POUND' | 'KILOGRAM' | 'OUNCE' | 'GRAM';
export type PackageTypeEnum =
  | 'LETTER'
  | 'BULKY_GOODS'
  | 'CARAVAN'
  | 'CARS'
  | 'EUROPALLET'
  | 'EXPANDABLE_TOUGH_BAGS'
  | 'EXTRA_LARGE_PACK'
  | 'FURNITURE'
  | 'INDUSTRY_VEHICLES'
  | 'LARGE_CANADA_POSTBOX'
  | 'LARGE_CANADA_POST_BUBBLE_MAILER'
  | 'LARGE_ENVELOPE'
  | 'MAILING_BOX'
  | 'MEDIUM_CANADA_POST_BOX'
  | 'MEDIUM_CANADA_POST_BUBBLE_MAILER'
  | 'MOTORBIKES'
  | 'ONE_WAY_PALLET'
  | 'PACKAGE_THICK_ENVELOPE'
  | 'PADDED_BAGS'
  | 'PARCEL_OR_PADDED_ENVELOPE'
  | 'ROLL'
  | 'SMALL_CANADA_POST_BOX'
  | 'SMALL_CANADA_POST_BUBBLE_MAILER'
  | 'TOUGH_BAGS'
  | 'UPS_LETTER'
  | 'USPS_FLAT_RATE_ENVELOPE'
  | 'USPS_LARGE_PACK'
  | 'VERY_LARGE_PACK'
  | 'WINE_PAK';
export type Dimensions = {
  height: number;
  length: number;
  unit: LengthUnitEnum;
  width: number;
};
export type TimeDuration = {
  unit: TimeDurationUnitEnum;
  value: number;
};

export interface InventoryType {
  availability: {
    // Occurrence Optional
    pickupAtLocationAvailability?: [
      {
        availabilityType: AvailabilityTypeEnum;
        fulfillmentTime: TimeDuration;
        merchantLocationKey: string; // Max length: 36
        quantity: number;
      },
    ];
    // Occurrence: Optional
    shipToLocationAvailability?: {
      // Occurrence: Optional
      availabilityDistributions?: [
        {
          fulfillmentTime?: TimeDuration; // Occurrence: Optional
          merchantLocationKey: string; // Occurrence: Conditional
          quantity: number; // Occurrence: Conditional
        },
      ];
      quantity: number; // Occurrence: Conditional
    };
  };
  condition: ConditionsEnum; // Occurrence: Conditional
  conditionDescription?: string; // Occurrence: Optional , Max length: 1000
  // Occurrence: Conditional
  packageWeightAndSize: {
    dimensions: Dimensions; // Occurrence: Conditional
    packageType: PackageTypeEnum; // Occurrence: Conditional
    // Occurrence: Conditional
    weight: {
      unit: WeightUnitEnum;
      value: number;
    };
  };
  // Occurrence: Conditional
  product: {
    //! Occurrence: Conditional, Max length: 50, Max name length: 40
    aspects: {
      [key: string]: string[];
    };
    brand: string; // Occurrence: Conditional, Max length: 65
    description: string; // Occurrence: Conditional, Max length: 4000
    title: string; // Occurrence: Conditional, Max length: 80
    imageUrls: string[]; // Occurrence: Conditional
    mpn: string; // Occurrence: Conditional, Max length: 65
    ean?: string[]; // Occurrence: Optional
    epid?: string; // Occurrence: Optional
    isbn?: string[]; // Occurrence: Optional
    subtitle?: string; // Occurrence: Optional, Max length: 55
    upc?: string[]; // Occurrence: Optional
    videoIds?: string[]; // Occurrence: Conditional
  };
}

export type SuggestionAspect = {
  localizedAspectName: string;
  aspectConstraint: {
    aspectMode: 'FREE_TEXT' | 'SELECTED_ONLY';
    aspectRequired: boolean;
    aspectUsage?: string;
    [key: string]: any;
  };
  [key: string]: any;
};
export interface Suggestion {
  categoryId: string;
  aspects: SuggestionAspect[];
  [key: string]: any;
}

export interface LocationAvailability {
  availabilityType?: AvailabilityTypeEnum;
  fulfillmentTime?: TimeDuration;
  merchantLocationKey: string;
  quantity: number;
}
