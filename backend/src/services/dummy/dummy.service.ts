import {BindingScope, injectable} from '@loopback/core';

@injectable({scope: BindingScope.TRANSIENT})
export class DummyService {
  constructor() {}

  testPing() {
    return 'test ping from dummy service';
  }
}
