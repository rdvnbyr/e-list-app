import {Model, model, property} from '@loopback/repository';
import {
  EbayListingPolicies,
  EbayPricingSummary,
  ListingDurationEnum,
  MarketplaceIdEnum,
} from '../../services/modules/ebay/types';
import {AmountRelations} from '../shared/amount.model';

@model({settings: {strict: false}})
export class EbayInvetoryOffer extends Model {
  // Define well-known properties here
  @property({
    type: 'string',
  })
  offerId?: string;

  @property({
    type: 'string',
    required: true,
  })
  sku: string;

  @property({
    type: 'string',
    required: true,
  })
  categoryId: string;

  @property({
    type: 'array',
    itemType: 'string',
  })
  storeCategoryNames?: string[];

  @property({
    type: 'number',
    required: true,
  })
  availableQuantity: number;

  @property({
    type: 'object',
  })
  charity?: {
    charityId: string;
    donationPercentage: string;
  };

  @property({
    type: 'object',
  })
  tax?: {
    applyTax: boolean;
    thirdPartyTaxCategory?: string;
    vatPercentage?: number;
  };

  @property({
    type: 'object',
  })
  extendedProducerResponsibility?: {
    producerProductId?: string;
    productPackageId?: string;
    shipmentPackageId?: string;
    productDocumentationId?: string;
    ecoParticipationFee?: AmountRelations;
  };

  @property({
    type: 'string',
  })
  format: 'AUCTION' | 'FIXED_PRICE';

  @property({
    type: 'boolean',
  })
  hideBuyerDetails?: boolean;

  @property({
    type: 'boolean',
  })
  includeCatalogProductDetails?: boolean;

  @property({
    type: 'string',
    required: true,
  })
  listingDescription: string;

  @property({
    type: 'string',
  })
  listingDuration?: ListingDurationEnum;

  @property({
    type: 'object',
    required: true,
  })
  listingPolicies: EbayListingPolicies;

  @property({
    type: 'string',
    required: true,
  })
  merchantLocationKey: string;

  @property({
    type: 'string',
    required: true,
  })
  marketplaceId: MarketplaceIdEnum;

  @property({
    type: 'string',
  })
  listingStartDate?: string;

  @property({
    type: 'number',
  })
  lotSize?: number;

  @property({
    type: 'number',
  })
  quantityLimitPerBuyer?: number;

  @property({
    type: 'string',
  })
  secondaryCategoryId?: string;

  @property({
    type: 'object',
  })
  pricingSummary: EbayPricingSummary;
  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<EbayInvetoryOffer>) {
    super(data);
  }
}

export interface EbayInvetoryOfferRelations {
  // describe navigational properties here
}

export type EbayInvetoryOfferWithRelations = EbayInvetoryOffer & EbayInvetoryOfferRelations;
