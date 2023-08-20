import {Entity, model, property} from '@loopback/repository';
import {EbayTokenWithRelations} from './shared/ebay-token.model';
import {PrivacyWithRelations} from './shared/privacy.model';

@model({settings: {strict: false}})
export class Token extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
    enum: ['ebay', 'amazon'],
  })
  name: string;

  @property({
    type: 'string',
    required: true,
    enum: ['NOT_TESTED', 'VALID', 'INVALID', 'EXPIRED'],
  })
  connection_is: string;

  @property({
    type: 'object',
    required: true,
  })
  source: EbayTokenWithRelations;

  @property({
    type: 'boolean',
    required: true,
    jsonSchema: {
      default: true,
    },
  })
  is_active: Boolean;

  @property({
    type: 'date',
    required: true,
  })
  created_at: Date;

  @property({
    type: 'array',
    itemType: 'object',
  })
  privacies: PrivacyWithRelations[];

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Token>) {
    super(data);
  }
}

export interface TokenRelations {
  // describe navigational properties here
}

export type TokenWithRelations = Token & TokenRelations;
