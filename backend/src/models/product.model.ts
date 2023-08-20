import {Entity, property} from '@loopback/repository';
import {ProductListingStatus} from './core/_models';
import {CategoryWithRelations} from './shared/category.model';
import {PackageSummaryWithRelations} from './shared/package-summary.model';
import {StockSummaryWithRelations} from './shared/stock-summary.model';
export class Product extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  sku: string;

  @property({
    type: 'array',
    itemType: 'object',
    required: true,
  })
  categories: CategoryWithRelations[];

  @property({
    type: 'array',
    itemType: 'string',
    enum: ['EBAY', 'AMAZON', 'SHOPIFY', 'OTHER'],
  })
  availablity: string[];

  @property({
    type: 'array',
    itemType: 'string',
  })
  ean: string[];

  @property({
    type: 'object',
    required: true,
  })
  stock_summary: StockSummaryWithRelations;

  @property({
    type: 'object',
  })
  package_summary?: PackageSummaryWithRelations;

  @property({
    type: 'array',
    itemType: 'string',
    jsonSchema: {
      minItems: 1,
    },
  })
  image_urls: string[];

  @property({
    type: 'array',
    itemType: 'string',
  })
  video_urls?: string[];

  @property({
    type: 'array',
    itemType: 'string',
  })
  aspects: string[];

  @property({
    type: 'string',
    required: true,
  })
  brand: string;

  @property({
    type: 'string',
    required: true,
  })
  description: string;

  @property({
    type: 'string',
    required: true,
  })
  mpn: string;

  @property({
    type: 'string',
    required: true,
    enum: ['NEW', 'LIKE_NEW', 'NEW_OTHER', 'FOR_PARTS_OR_NOT_WORKING'],
  })
  condition: string;

  @property({
    type: 'string',
  })
  condition_description?: string;

  @property({
    type: 'string',
    required: true,
  })
  title: string;

  @property({
    type: 'string',
  })
  subtitle?: string;

  @property({
    type: 'array',
    itemType: 'string',
  })
  upc?: string[];

  @property({
    type: 'array',
    itemType: 'string',
  })
  listing_status?: ProductListingStatus[];

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Product>) {
    super(data);
  }
}

export interface ProductRelations {
  // describe navigational properties here
}

export type ProductWithRelations = Product & ProductRelations;
