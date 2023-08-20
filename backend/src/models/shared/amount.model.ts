import {Model, model, property} from '@loopback/repository';

@model()
export class Amount extends Model {
  @property({
    type: 'number',
    required: true,
  })
  value: number;

  @property({
    type: 'string',
    required: true,
    enum: ['EUR', 'USD'],
  })
  currency: string;

  constructor(data?: Partial<Amount>) {
    super(data);
  }
}

export interface AmountRelations {
  // describe navigational properties here
}

export type AmountWithRelations = Amount & AmountRelations;
