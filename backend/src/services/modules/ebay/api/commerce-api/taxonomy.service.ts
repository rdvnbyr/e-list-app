import {BindingScope, injectable /* Provider */} from '@loopback/core';
import axios from 'axios';
import {ItemAspect} from '../../types';
import {EBAY_COMMERCE_TAXONOMY_API_URL} from '../../_helpers/config';
import {getHttpRequestHeaders} from '../../_helpers/functions';

@injectable({scope: BindingScope.TRANSIENT})
export class EbayCommerceTaxonomy {
  private _url = `${EBAY_COMMERCE_TAXONOMY_API_URL}`;
  private httpHeaders = (accessToken: string) => {
    return getHttpRequestHeaders(accessToken);
  };
  constructor() {}

  async fetchItemAspects() {}
  async getDefaultCategoryTreeId() {}
  async getCategoryTree() {}
  async getCategorySubtree() {}
  async getCompatibilityProperties() {}

  async getCategorySuggestions(
    accessToken: string,
    searchText: string,
    categoryTreeId = '77',
  ): Promise<any> {
    const url = `${this._url}/category_tree/${categoryTreeId}/get_category_suggestions`;
    const headers = this.httpHeaders(accessToken);
    const response = await axios.get(url, {
      ...headers,
      params: {
        q: searchText,
      },
    });
    return response.data;
  }

  async getItemAspectsForCategory(
    accessToken: string,
    categoryId: string,
    categoryTreeId = '77',
  ): Promise<ItemAspect[]> {
    const url = `${this._url}/category_tree/${categoryTreeId}/get_item_aspects_for_category`;
    const headers = this.httpHeaders(accessToken);
    const response = await axios.get<{aspects: ItemAspect[]}>(url, {
      ...headers,
      params: {
        category_id: categoryId,
      },
    });
    return response.data.aspects;
  }
}
