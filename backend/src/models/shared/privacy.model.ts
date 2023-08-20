import {Model, model, property} from '@loopback/repository';

@model()
export class Privacy extends Model {
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
  name: string;

  @property({
    type: 'date',
    default: () => new Date(),
  })
  created_at?: Date;

  @property({
    type: 'string',
    required: true,
  })
  accepted: boolean;

  @property({
    type: 'string',
    required: true,
  })
  accepted_text: string;

  @property({
    type: 'string',
  })
  reason: string;

  constructor(data?: Partial<Privacy>) {
    super(data);
  }
}

export interface PrivacyRelations {
  // describe navigational properties here
}

export type PrivacyWithRelations = Privacy & PrivacyRelations;
