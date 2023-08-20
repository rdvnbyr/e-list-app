import {Model, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class EbayInventoryItemProduct extends Model {
  // Define well-known properties here
  @property({
    type: 'object',
    required: true,
  })
  aspects: {
    [key: string]: string[];
  };

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      maxLength: 65,
    },
  })
  brand: string;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      maxLength: 4000,
    },
  })
  description: string;

  @property({
    type: 'string',
    jsonSchema: {
      maxLength: 80,
    },
  })
  title: string;

  @property({
    type: 'array',
  })
  imageUrls: string[];

  @property({
    type: 'string',
    jsonSchema: {
      maxLength: 65,
    },
  })
  mpn: string;

  @property({
    type: 'array',
  })
  ean?: string[];

  @property({
    type: 'string',
  })
  epid?: string;

  @property({
    type: 'array',
  })
  isbn?: string[];

  @property({
    type: 'string',
    jsonSchema: {
      maxLength: 55,
    },
  })
  subtitle?: string;

  @property({
    type: 'array',
  })
  upc?: string[];

  @property({
    type: 'array',
  })
  videoIds?: string[];
  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<EbayInventoryItemProduct>) {
    super(data);
  }
}

export interface EbayInventoryItemProductRelations {
  // describe navigational properties here
}

export type EbayInventoryItemProductWithRelations = EbayInventoryItemProduct &
  EbayInventoryItemProductRelations;
