import {BindingScope, injectable /* Provider */} from '@loopback/core';
import axios from 'axios';
import {MarketplaceIdEnum} from '../../types';
import {EBAY_SELL_ACCOUNT_API_URL} from '../../_helpers/config';
import {getHttpRequestHeaders} from '../../_helpers/functions';

@injectable({scope: BindingScope.TRANSIENT})
export class EbaySellAccount {
  private _url = `${EBAY_SELL_ACCOUNT_API_URL}`;
  constructor() {}
  httpHeaders = (accessToken: string) => {
    return getHttpRequestHeaders(accessToken);
  };

  async getPolicies(
    accessToken: string,
  ): Promise<{name: string; id: string; identifiedKey: string}[]> {
    const promises = Promise.all([
      this.getFulfillmentPolicies(accessToken, 'EBAY_DE'),
      this.getPaymentPolicies(accessToken, 'EBAY_DE'),
      this.getReturnPolicies(accessToken, 'EBAY_DE'),
    ]);
    const [fulfillmentPolicies, paymentPolicies, returnPolicies] = await promises;
    return [...fulfillmentPolicies, ...paymentPolicies, ...returnPolicies];
  }

  async getFulfillmentPolicyByName(
    accessToken: string,
    marketPlaceId: MarketplaceIdEnum,
    name: string,
  ) {
    const url = `${this._url}/fulfillment_policy/get_by_policy_name?marketplace_id=${marketPlaceId}&name=${name}`;
    const response = await axios.get(url, this.httpHeaders(accessToken));
    return response.data;
  }

  async getFulfillmentPolicies(
    accessToken: string,
    marketPlaceId: MarketplaceIdEnum,
    limit = 1000,
    offset = 0,
  ): Promise<{name: string; id: string; identifiedKey: 'fulfillmentPolicyId'}[]> {
    const url = `${this._url}/fulfillment_policy?marketplace_id=${marketPlaceId}`;
    const response = await axios.get(url, this.httpHeaders(accessToken));
    const {fulfillmentPolicies} = response.data;
    const policies = fulfillmentPolicies.map(
      (policy: {fulfillmentPolicyId: string; [key: string]: any}) => ({
        name: policy.name,
        id: policy.fulfillmentPolicyId,
        identifiedKey: 'fulfillmentPolicyId',
      }),
    );
    return policies;
  }

  async getFulfillmentPolicy(
    accessToken: string,
    fulfillmentPolicyId: string,
  ): Promise<any> {
    const url = `${this._url}fulfillment_policy/${fulfillmentPolicyId}`;
    const response = await axios.get(url, this.httpHeaders(accessToken));
    return response.data;
  }

  async getPaymentPolicies(
    accessToken: string,
    marketPlaceId: MarketplaceIdEnum,
    limit = 1000,
    offset = 0,
  ): Promise<{id: string; name: string; identifiedKey: 'paymentPolicyId'}[]> {
    const url = `${this._url}/payment_policy?marketplace_id=${marketPlaceId}&limit=${limit}&offset=${offset}`;
    const response = await axios.get(url, this.httpHeaders(accessToken));
    const {paymentPolicies} = response.data;
    const paymentPolicyIds = paymentPolicies.map(
      (policy: {paymentPolicyId: string; name: string}) => ({
        id: policy.paymentPolicyId,
        name: policy.name,
        identifiedKey: 'paymentPolicyId',
      }),
    );
    return paymentPolicyIds;
  }

  async getPaymentPolicy(accessToken: string, paymentPolicyId: string): Promise<any> {
    const url = `${this._url}/payment_policy/${paymentPolicyId}`;
    const response = await axios.get(url, this.httpHeaders(accessToken));
    return response.data;
  }

  async getPaymentPolicyByName(
    accessToken: string,
    marketPlaceId: MarketplaceIdEnum,
    name: string,
  ) {
    const url = `${this._url}/payment_policy/get_by_policy_name?marketplace_id=${marketPlaceId}&name=${name}`;
    const response = await axios.get(url, this.httpHeaders(accessToken));
    return response.data;
  }

  async getReturnPolicies(
    accessToken: string,
    marketPlaceId: string,
    limit = 1000,
    offset = 0,
  ): Promise<{id: string; name: string; identifiedKey: 'returnPolicyId'}[]> {
    const url = `${this._url}/return_policy?marketplace_id=${marketPlaceId}&limit=${limit}&offset=${offset}`;
    const response = await axios.get(url, this.httpHeaders(accessToken));
    const {returnPolicies} = response.data;
    const policies = returnPolicies.map(
      (policy: {returnPolicyId: string; name: string}) => ({
        id: policy.returnPolicyId,
        name: policy.name,
        identifiedKey: 'returnPolicyId',
      }),
    );
    return policies;
  }

  async getReturnPolicy(accessToken: string, returnPolicyId: string) {
    const url = `${this._url}/return_policy/${returnPolicyId}`;
    const response = await axios.get(url, this.httpHeaders(accessToken));
    return response.data;
  }

  async getReturnPolicyByName(
    accessToken: string,
    marketPlaceId: MarketplaceIdEnum,
    name: string,
  ) {
    const url = `${this._url}/return_policy/get_by_policy_name?marketplace_id=${marketPlaceId}&name=${name}`;
    const response = await axios.get(url, this.httpHeaders(accessToken));
    return response.data;
  }
}
