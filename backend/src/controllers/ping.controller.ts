import {inject} from '@loopback/core';
import {get, Request, response, ResponseObject, RestBindings} from '@loopback/rest';
import {ModuleServiceBindings} from '../keys';
import {DummyService} from '../services';
import {EbayService} from '../services/modules/ebay/ebay.service';

/**
 * OpenAPI response for ping()
 */
const PING_RESPONSE: ResponseObject = {
  description: 'Ping Response',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        title: 'PingResponse',
        properties: {
          greeting: {type: 'string'},
          date: {type: 'string'},
          url: {type: 'string'},
          headers: {
            type: 'object',
            properties: {
              'Content-Type': {type: 'string'},
            },
            additionalProperties: true,
          },
        },
      },
    },
  },
};

/**
 * A simple controller to bounce back http requests
 */
export class PingController {
  constructor(
    @inject(RestBindings.Http.REQUEST) private req: Request,
    @inject(ModuleServiceBindings.EBAY_SERVICE) private ebayService: EbayService,
    @inject(ModuleServiceBindings.DUMMY_SERVICE) private dummyService: DummyService,
  ) {}

  // Map to `GET /ping`
  @get('/ping')
  @response(200, PING_RESPONSE)
  ping(): object {
    const test = this.ebayService.ping();
    const dummy = this.dummyService.testPing();
    // Reply with a greeting, the current time, the url, and request headers
    return {
      greeting: 'Hello from LoopBack',
      date: new Date(),
      url: this.req.url,
      headers: Object.assign({}, this.req.headers),
      test: test,
      dummy: dummy,
    };
  }
}
