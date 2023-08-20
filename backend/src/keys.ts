import {TokenService, UserService} from '@loopback/authentication';
import {BindingKey} from '@loopback/core';
import {User} from './models';
import {Credentials} from './repositories/user.repository';
import {PasswordHasher} from './services';
import {
  EbayCommerceTaxonomy,
  EbaySellAccount,
  EbaySellInventory,
} from './services/modules/ebay/api';

export namespace TokenServiceConstants {
  export const TOKEN_SECRET_VALUE = 'myjwts3cr3t';
  export const TOKEN_EXPIRES_IN_VALUE = '3h';
}

export namespace TokenServiceBindings {
  export const TOKEN_SECRET = BindingKey.create<string>('authentication.jwt.secret');
  export const TOKEN_EXPIRES_IN = BindingKey.create<string>(
    'authentication.jwt.expires.in',
  );
  export const TOKEN_SERVICE = BindingKey.create<TokenService>(
    'services.authentication.jwt.tokenservice',
  );
}

export namespace PasswordHasherBindings {
  export const PASSWORD_HASHER = BindingKey.create<PasswordHasher>('services.hasher');
  export const ROUNDS = BindingKey.create<number>('services.hasher.round');
}

export namespace UserServiceBindings {
  export const USER_SERVICE =
    BindingKey.create<UserService<Credentials, User>>('services.user.service');
}

export namespace ModuleServiceBindings {
  export const EBAY_SERVICE = BindingKey.create<any>('services.module.ebay.service');
  export const EBAY_SELL_INVENTORY = BindingKey.create<EbaySellInventory>(
    'services.modules.ebay.api.sell-api.inventory.service',
  );
  export const EBAY_SELL_FULFILLMENT = BindingKey.create<object>(
    'services.modules.ebay.api.sell-api.fulfillment.service',
  );
  export const EBAY_SELL_ACCOUNT = BindingKey.create<EbaySellAccount>(
    'services.modules.ebay.api.sell-api.account.service',
  );
  export const EBAY_COMMERCE_TAXONOMY = BindingKey.create<EbayCommerceTaxonomy>(
    'services.modules.ebay.api.commerce-api.taxonomy.service',
  );

  export const DUMMY_SERVICE = BindingKey.create<object>(
    'services.modules.dummy.dummy.service',
  );
}
