import {Model, model, property} from '@loopback/repository';
import {
  Dimensions,
  PackageTypeEnum,
  WeightUnitEnum,
} from '../../services/modules/ebay/types';

@model({settings: {strict: false}})
export class PackageSummary extends Model {
  @property({
    type: 'object',
    required: true,
  })
  dimensions?: Dimensions;

  @property({
    type: 'string',
  })
  type?: PackageTypeEnum;

  @property({
    type: 'object',
    required: true,
  })
  weight: {
    unit: WeightUnitEnum;
    value: number;
  };

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<PackageSummary>) {
    super(data);
  }
}

export interface PackageSummaryRelations {
  // describe navigational properties here
}

export type PackageSummaryWithRelations = PackageSummary & PackageSummaryRelations;
