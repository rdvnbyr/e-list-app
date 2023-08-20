// Uncomment these imports to begin using these cool features!
import {CountSchema} from '@loopback/repository';
import {get, response} from '@loopback/rest';

export class EbayController {
  constructor() {}

  @get('/ebay/ping')
  @response(200, {
    description: 'Product model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async ping(): Promise<any> {
    return {time: new Date().toISOString(), status: 200, message: 'ebay-pong'};
  }
}
