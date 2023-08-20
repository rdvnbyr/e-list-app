import {BindingScope, injectable /* Provider */} from '@loopback/core';
import {HttpErrors} from '@loopback/rest';
import axios from 'axios';
import {chunk} from 'lodash';
import {EbayCreateOffer, EbayError, EbayOffer} from '../../types';
import {EBAY_SELL_INVENTORY_API_URL} from '../../_helpers/config';
import {
  getHttpRequestHeaders,
  getPriceHandler,
  PriceChanger,
} from '../../_helpers/functions';

@injectable({scope: BindingScope.TRANSIENT})
export class EbaySellInventory {
  private _url = `${EBAY_SELL_INVENTORY_API_URL}`;
  constructor() {}
  httpHeaders = (accessToken: string) => {
    return getHttpRequestHeaders(accessToken);
  };
  bulkCreateOrReplaceInventoryItem() {}

  /**
   * Bulk Get Inventory Item Method
   * @param accessToken  eBay Access Token (required)
   * @param itemSKUs  List of item SKUs (required)
   * @returns List of Inventory Items
   * TODO(return types are defined in the eBay API)
   */
  async bulkGetInventoryItem(accessToken: string, itemSKUs: string[]): Promise<any> {
    const url = `${this._url}/bulk_get_inventory_item`;
    const headers = this.httpHeaders(accessToken);
    const bulkRequests = itemSKUs.map(sku => ({sku}));
    if (bulkRequests.length === 0) {
      throw new HttpErrors.BadRequest('No SKUs provided');
    }
    if (bulkRequests.length > 25) {
      const _chunks = chunk(bulkRequests, 25);
      const _results = [];
      for (const _chunk of _chunks) {
        const response = await axios.post(url, {requests: _chunk}, headers);
        _results.push(response.data);
      }
      return _results;
    } else {
      const response = await axios.post(url, {requests: bulkRequests}, headers);
      return response.data;
    }
  }

  /**
   * Bulk Updtate Inventory Item Price & Quantity Method
   * @param accessToken eBay Access Token (required)
   * @param updates  List of Inventory Item Updates (required)
   * @param changer  Price Changer (optional)
   * @returns
   * TODO(return types are defined in the eBay API)
   */
  async bulkUpdateInventoryItemPriceQuantity(
    accessToken: string,
    updates: {
      readonly sku: string;
      readonly quantity: number;
      readonly offer: EbayOffer;
    }[],
    // if we need to update price
    changer = {
      type: 'no_modification',
      method: 'add',
      value: 0,
    } as PriceChanger,
  ): Promise<any> {
    const headers = this.httpHeaders(accessToken);
    const bulkRequests = [];
    for (const update of updates) {
      const newPrice = getPriceHandler(+(update.offer.pricingSummary.price ?? 0), changer);
      const request = {
        offers: [
          {
            availableQuantity: update.quantity,
            offerId: update.offer.offerId,
            price: newPrice.toFixed(2),
          },
        ],
        sku: update.sku,
        shipToLocationAvailability: {
          quantity: update.quantity,
        },
      };
      bulkRequests.push(request);
    }
    return axios.post(
      `${this._url}/bulk_update_price_quantity`,
      {requests: bulkRequests},
      headers,
    );
  }

  /**
   * Create or Replace Inventory Item
   * @param accessToken  eBay Access Token (required)
   * @param sku  SKU (required)
   * @param inventory  Inventory Item (required)
   */
  async createOrReplaceInventoryItem(
    accessToken: string,
    sku: string,
    ebayInventory: any, //!EbayInventory,
  ): Promise<void> {
    try {
      const headers = this.httpHeaders(accessToken);
      const url = `${this._url}/inventory_item/${sku}`;
      await axios.put(url, ebayInventory.inventory, headers);
    } catch (error) {
      throw new HttpErrors.BadRequest(
        `Error creating or replacing inventory item: ${JSON.stringify(
          error?.response?.data || error?.response || error,
        )}`,
      );
    }
  }

  /**
   * Delete Inventory Item
   * @param accessToken  eBay Access Token (required)
   * @param itemSku  SKU (required)
   * @returns void
   */
  async deleteInventoryItem(accessToken: string, itemSku: string): Promise<void> {
    const urlEncodedSku = encodeURIComponent(itemSku);
    const headers = this.httpHeaders(accessToken);
    return axios.delete(`${this._url}/inventory_item/${urlEncodedSku}`, headers);
  }

  /**
   * Get Inventory Item
   * @param accessToken eBay Access Token (required)
   * @param itemSku  SKU (required)
   * @returns
   */
  async getInventoryItem(accessToken: string, itemSku: string): Promise<any> {
    const getItem = await axios.get(
      `${this._url}/inventory_item/${itemSku}`,
      this.httpHeaders(accessToken),
    );
    if (getItem.data.errors) {
      throw new HttpErrors.InternalServerError(` ${itemSku}[Error]:${getItem.data.errors}`);
    }
    return getItem.data;
  }

  /**
   * Get Inventory Items
   * @param accessToken  eBay Access Token (required)
   * @param limit  Limit (optional) (default: 100)
   * @param offset  Offset (optional) (default: 0)
   * @returns
   */
  async getInventoryItems(accessToken: string, limit = 100, offset = 0): Promise<any[]> {
    const getItems = await axios.get(
      `${this._url}/inventory_item?limit=${limit}&offset=${offset}`,
      this.httpHeaders(accessToken),
    );
    return getItems.data.inventoryItems;
  }

  /**
   * Bulk Migration of Inventory Items
   * @param accessToken - eBay Access Token (required)
   * @param listingIds - Listing Ids to migrate (required)
   * @returns List of Migrated Inventory Items
   */
  async bulkMigrateListing(accessToken: string, listingIds: string[]): Promise<any[]> {
    const listingRequest = {
      requests: listingIds.map(id => ({listingId: id})),
    };
    const createMigration = await axios.post(
      `${this._url}/bulk_migrate_listing`,
      listingRequest,
      this.httpHeaders(accessToken),
    );
    return createMigration.data.responses;
  }

  /**
   * @url https://developer.ebay.com/api-docs/sell/inventory/resources/inventory_item/methods/getOffers
   * @note This call creates multiple offers (up to 25) for specific inventory items on a specific eBay marketplace.
   * The following fields are always required in the request payload: sku, marketplaceId, and (listing) format.
   * @param accessToken - eBay Access Token (required)
   * @param offers - List of offers to create (required)
   * @returns - List of created offers
   */
  async bulkCreateOffer(accessToken: string, offers: EbayOffer[]): Promise<any> {
    const url = `${this._url}/bulk_create_offer`;
    const headers = this.httpHeaders(accessToken);
    if (offers.length > 25) {
      const chunkOffers = chunk(offers, 25);
      const _results = [];
      for (const _chunk of chunkOffers) {
        const response = await axios.post(url, {requests: _chunk}, headers);
        _results.push(response.data.responses);
      }
      return _results;
    } else {
      const response = await axios.post(url, {requests: offers}, headers);
      return response.data.responses;
    }
  }

  /**
   * @url https://developer.ebay.com/api-docs/sell/inventory/resources/offer/methods/bulkPublishOffer
   * @note Each listing can be revised up to 250 times in one calendar day.
   * If this revision threshold is reached, the seller will be blocked from revising the item until the next calendar day.
   * @param accessToken - eBay Access Token (required)
   * @param oferIds - List of offer ids for published (required)
   * @returns - List of published offers
   */
  async bulkPublishOffer(accessToken: string, oferIds: {offerId: string}[]): Promise<any> {
    const url = `${this._url}/bulk_publish_offer`;
    const headers = this.httpHeaders(accessToken);
    if (oferIds.length > 25) {
      const chunkOfferIds = chunk(oferIds, 25);
      const _results = [];
      for (const _chunk of chunkOfferIds) {
        const response = await axios.post(url, {requests: _chunk}, headers);
        _results.push(response.data.responses);
      }
      return _results;
    } else {
      const response = await axios.post(url, {requests: oferIds}, headers);
      return response.data.responses;
    }
  }

  /**
   * Create Offer
   * @param accessToken - eBay Access Token (required)
   * @param offer - Ebay Offer (required)
   * @returns - Promise return offer id
   */
  async createOffer(
    accessToken: string,
    offer: EbayCreateOffer,
  ): Promise<{offerId: string; warnings?: any[]}> {
    try {
      const url = `${this._url}/offer`;
      const response = await axios.post(url, offer, this.httpHeaders(accessToken));
      return response.data;
    } catch (error) {
      throw new HttpErrors.BadRequest(
        `${offer.sku}[Error]:${JSON.stringify(error.response.data)}`,
      );
    }
  }

  /**
   * Delete Offer
   * @param accessToken - eBay Access Token (required)
   * @param offerId - Offer Id (required)
   * @returns - Promise return void
   */
  async deleteOffer(accessToken: string, offerId: string): Promise<void> {
    const url = `${this._url}/offer/${offerId}`;
    return axios.delete(url, this.httpHeaders(accessToken));
  }

  /**
   * Get Listing Fees
   * This call is used to retrieve the expected listing fees for up to 250 unpublished offers.
   * @param accessToken - eBay Access Token (required)
   * @param offers - list of offers include offer id (required)
   * @returns
   */
  async getListingFees(accessToken: string, offers: {offerId: string}[]): Promise<any> {
    const url = `${this._url}/offer/get_listing_fees`;
    const requestBody = {offers};
    const response = await axios.post(url, requestBody, this.httpHeaders(accessToken));
    return response.data.offers;
  }

  /**
   * Get Offer
   * @param accessToken - eBay Access Token (required)
   * @param offerId - Offer Id (required)
   * @returns - Promise return ebay offer
   */
  async getOffer(accessToken: string, offerId: string): Promise<any> {
    const url = `${this._url}/offer/${offerId}`;
    const response = await axios.get(url, this.httpHeaders(accessToken));
    return response.data;
  }

  /**
   * Get Inventory Offers
   * @param accessToken eBay Access Token	(required)
   * @param sku SKU of the item	(required)
   * @returns Returns the list of offers for the item.
   */
  async getOffers(accessToken: string, sku: string): Promise<EbayOffer[]> {
    const encodedSku = encodeURIComponent(sku);
    const getOffers = await axios.get(
      `${this._url}/offer?sku=${encodedSku}`,
      this.httpHeaders(accessToken),
    );
    if (!getOffers.data?.offers) {
      throw new Error('No offers found');
    }
    const offers = getOffers.data.offers.map((offer: EbayOffer) => ({
      offerId: offer.offerId,
      sku: offer.sku,
      pricingSummary: offer.pricingSummary,
    })) as EbayOffer[];
    return offers;
  }

  /**
   * Publish Offer
   * Note: Each listing can be revised up to 250 times in one calendar day.
   * If this revision threshold is reached, the seller will be blocked from revising the item until the next calendar day.
   * @param accessToken
   * @param offerId
   * @returns - Promise return listing id and warnings
   */
  async publishOffer(
    accessToken: string,
    offerId: string,
  ): Promise<{listingId?: string; warnings?: EbayError[]}> {
    const response = await axios.post(
      `${this._url}/offer/${offerId}/publish/`,
      {},
      this.httpHeaders(accessToken),
    );
    return response.data;
  }

  /**
   * Publish Offer By Inventory Item Group
   * Note: Please note that any eBay listing created using the Inventory API cannot be revised or relisted using the Trading API calls.
   * Note: Each listing can be revised up to 250 times in one calendar day.
   * If this revision threshold is reached, the seller will be blocked from revising the item until the next calendar day.
   * @param accessToken - eBay Access Token (required)
   * @param inventoryItemGroupKey - Inventory Item Group Key (required)
   * @param marketplaceId - Marketplace Id (required)
   * @returns - Promise return listing id and warnings
   */
  async publishOfferByInventoryItemGroup(
    accessToken: string,
    inventoryItemGroupKey: string,
    marketplaceId: string,
  ): Promise<{listingId?: string; warnings?: EbayError[]}> {
    const url = `${this._url}/offer/publish_by_inventory_item_group`;
    const requestPayload = {inventoryItemGroupKey, marketplaceId};
    const headers = this.httpHeaders(accessToken);
    const response = await axios.post(url, requestPayload, headers);
    return response.data;
  }

  /**
   * Update Offer
   * @param accessToken - eBay Access Token (required)
   * @param offerId - Offer Id (required)
   * @param updatedOffer - Updated Ebay Offer (required)
   * @returns - Promise return listing id or warnings if any error
   */
  async updateOffer(
    accessToken: string,
    offerId: string,
    updatedOffer: EbayOffer,
  ): Promise<{listingId?: string; warnings?: EbayError[]}> {
    const url = `${this._url}/offer/${offerId}`;
    const headers = this.httpHeaders(accessToken);
    const response = await axios.put(url, updatedOffer, headers);
    return response.data;
  }

  /**
   * Withdraw Offer
   * @param accessToken - eBay Access Token (required)
   * @param offerId - Offer Id (required)
   * @returns - Promise return listing id or warnings if any error
   */
  async withdrawOffer(
    accessToken: string,
    offerId: string,
  ): Promise<{listingId?: string; warnings?: EbayError[]}> {
    const url = `${this._url}/offer/${offerId}/withdraw`;
    const headers = this.httpHeaders(accessToken);
    const response = await axios.post(url, {}, headers);
    return response.data;
  }

  /**
   * Withdraw Offer By Inventory Item Group
   * @param accessToken - eBay Access Token (required)
   * @param inventoryItemGroupKey - Inventory Item Group Key (required)
   * @param marketplaceId - Marketplace Id (required)
   * @returns - Promise void
   */
  async withdrawOfferByInventoryItemGroup(
    accessToken: string,
    inventoryItemGroupKey: string,
    marketplaceId: string,
  ): Promise<void> {
    const url = `${this._url}/offer/withdraw_by_inventory_item_group`;
    const headers = this.httpHeaders(accessToken);
    const requestPayload = {inventoryItemGroupKey, marketplaceId};
    return axios.post(url, requestPayload, headers);
  }

  /**
   * Create or Replace Inventory Item Group
   * @param accessToken - eBay Access Token (required)
   * @param inventoryItemGroupKey - Inventory Item Group Key (required)
   * @param inventoryGroup - Inventory Group (required)
   * @returns void
   */
  async createOrReplaceInventoryItemGroup(
    accessToken: string,
    inventoryItemGroupKey: string,
    inventoryGroup: any, //!PrepareEbayInventoryGroupItem,
  ): Promise<void> {
    const url = `${this._url}/inventory_item_group/${inventoryItemGroupKey}`;
    return axios.put(url, inventoryGroup, this.httpHeaders(accessToken));
  }

  /**
   * Get Inventory Item Group
   * @param accessToken  - eBay Access Token (required)
   * @param inventoryItemGroupKey  - Inventory Item Group Key (required)
   * @returns  Inventory Group
   */
  async getInventoryItemGroup(
    accessToken: string,
    inventoryItemGroupKey: string,
  ): Promise<any> {
    const getItem = await axios.get(
      `${this._url}/inventory_item_group/${inventoryItemGroupKey}`,
      this.httpHeaders(accessToken),
    );
    return getItem.data;
  }

  /**
   * Delete Inventory Item Group
   * @param accessToken  - eBay Access Token (required)
   * @param inventoryItemGroupKey  - Inventory Item Group Key (required)
   * @returns  void
   */
  async deleteInventoryItemGroup(
    accessToken: string,
    inventoryItemGroupKey: string,
  ): Promise<void> {
    return axios.delete(
      `${this._url}/inventory_item_group/${inventoryItemGroupKey}`,
      this.httpHeaders(accessToken),
    );
  }

  async deleteInventoryLocation() {}
  async disableInventoryLocation() {}
  async enableInventoryLocation() {}
  async getInventoryLocation() {}
  async getInventoryLocations(accessToken: string, limit = 100, offset = 0) {
    const url = `${this._url}/location?limit=${limit}&offset=${offset}`;
    const response = await axios.get(url, this.httpHeaders(accessToken));
    return response.data.locations;
  }
  async updateInventoryLocation() {}
}
