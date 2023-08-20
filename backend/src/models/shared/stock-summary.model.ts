import {Model, model, property} from '@loopback/repository';
import {FulfillmentTime} from '../core/_models';
import {AddressWithRelations} from './address.model';

@model({settings: {strict: false}})
export class StockSummary extends Model {
  // Define well-known properties here

  @property({
    type: 'array',
    items: {type: 'object'},
    required: true,
  })
  locations: AddressWithRelations[];

  @property({
    type: 'number',
    required: true,
  })
  quantity: number;

  @property({
    type: 'number',
  })
  available_quantity() {
    return this.quantity;
  }

  @property({
    type: 'number',
  })
  reserved_quantity: number;

  @property({
    type: 'number',
  })
  buyable_quantity?: number;

  @property({
    type: 'object',
  })
  fulfillment_time?: FulfillmentTime;

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<StockSummary>) {
    super(data);
  }
}

export interface StockSummaryRelations {
  // describe navigational properties here
}

export type StockSummaryWithRelations = StockSummary & StockSummaryRelations;
