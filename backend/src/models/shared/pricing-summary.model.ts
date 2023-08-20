import {Model, model, property} from '@loopback/repository';
import {PricingVisibility} from '../core/_models';
import {AmountWithRelations} from './amount.model';

@model()
export class PricingSummary extends Model {
  @property({
    type: 'object',
    required: true,
  })
  price: AmountWithRelations;

  @property({
    type: 'string',
    required: true,
  })
  pricing_visibility: PricingVisibility;

  @property({
    type: 'object',
  })
  min_advertised_price?: object;

  constructor(data?: Partial<PricingSummary>) {
    super(data);
  }
}

export interface PricingSummaryRelations {
  // describe navigational properties here
}

export type PricingSummaryWithRelations = PricingSummary & PricingSummaryRelations;
