import {Model, model, property} from '@loopback/repository';
import {ConditionsEnum, LocationAvailability} from '../../services/modules/ebay/types';
import {PackageSummaryWithRelations} from '../shared/package-summary.model';
import {EbayInventoryItemProductWithRelations} from './ebay-inventory-item-product.model';

@model({settings: {strict: false}})
export class EbayInventoryItem extends Model {
  // Define well-known properties here

  @property({
    type: 'object',
  })
  availability: {
    pickupAtLocationAvailability?: LocationAvailability[];
    shipToLocationAvailability: {
      availabilityDistributions?: Omit<LocationAvailability, 'availabilityType'>[];
      quantity: number;
    };
    [key: string]: any;
  };

  @property({
    type: 'string',
    required: true,
  })
  condition: ConditionsEnum;

  @property({
    type: 'string',
    jsonSchema: {
      maxLength: 1000,
    },
  })
  conditionDescription?: string;

  @property({
    type: 'object',
  })
  packageWeightAndSize?: PackageSummaryWithRelations;

  @property({
    type: 'object',
  })
  product: EbayInventoryItemProductWithRelations;

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<EbayInventoryItem>) {
    super(data);
  }
}

export interface EbayInventoryItemRelations {
  // describe navigational properties here
}

export type EbayInventoryItemWithRelations = EbayInventoryItem & EbayInventoryItemRelations;
