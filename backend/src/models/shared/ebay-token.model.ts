import {Model, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class EbayToken extends Model {
  @property({
    type: 'string',
    required: true,
  })
  seller_id: string;

  @property({
    type: 'string',
    required: true,
  })
  access_token: string;

  @property({
    type: 'string',
    required: true,
  })
  refresh_token: string;

  @property({
    type: 'date',
    required: true,
  })
  refresh_token_exprise_at: Date;

  @property({
    type: 'date',
    required: true,
  })
  access_token_expires_at: Date;

  @property({
    type: 'array',
    itemType: 'string',
    required: true,
  })
  scopes: string[];

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<EbayToken>) {
    super(data);
  }
}

export interface EbayTokenRelations {
  // describe navigational properties here
}

export type EbayTokenWithRelations = EbayToken & EbayTokenRelations;
