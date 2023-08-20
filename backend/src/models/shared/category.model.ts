import {Model, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Category extends Model {
  // Define well-known properties here

  @property({
    type: 'string',
  })
  name?: string;

  @property({
    type: 'string',
  })
  path?: string;

  @property({
    type: 'string',
    required: true,
  })
  source: 'EBAY' | 'AMAZON';

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Category>) {
    super(data);
  }
}

export interface CategoryRelations {
  // describe navigational properties here
}

export type CategoryWithRelations = Category & CategoryRelations;
