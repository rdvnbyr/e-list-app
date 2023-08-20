import { BindingScope, inject, injectable } from '@loopback/core';
import { ModuleServiceBindings } from '../../../keys';
import { EbaySellAccount, EbaySellInventory } from './api';

@injectable({ scope: BindingScope.TRANSIENT })
export class EbayService {
  constructor(
    @inject(ModuleServiceBindings.EBAY_SELL_ACCOUNT)
    private ebaySellAccountService: EbaySellAccount,
    @inject(ModuleServiceBindings.EBAY_SELL_INVENTORY)
    private ebaySellInventoryService: EbaySellInventory
  ) {
    console.log('EbayService');
    console.log('ebaySellAccountService', this.ebaySellAccountService);
    console.log('ebaySellInventoryService', this.ebaySellInventoryService);
  }

  ping() {
    return 'pong from ebay service';
  }
}
