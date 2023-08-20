import {Model, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Address extends Model {
  @property({
    type: 'string',
    required: true,
    enum: ['PICKUP', 'SHIPPING', 'BILLING', 'RETURN', 'OTHER'],
  })
  type: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  address_line_1: string;

  @property({
    type: 'string',
    default: '',
  })
  address_line_2?: string;

  @property({
    type: 'string',
    required: true,
  })
  plz: string;

  @property({
    type: 'string',
    jsonSchema: {
      default: '',
    },
  })
  city?: string;

  @property({
    type: 'string',
    required: true,
    // enum: COUNTRIES.map(country => country.iso2),
  })
  country_code: string;

  @property({
    type: 'string',
  })
  country?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Address>) {
    super(data);
  }
}

export interface AddressRelations {
  // describe navigational properties here
}

export type AddressWithRelations = Address & AddressRelations;
