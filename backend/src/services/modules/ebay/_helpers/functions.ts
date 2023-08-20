export type PriceChanger = {
  type: 'no_modification' | 'fixed_price' | 'percentage_price';
  method: 'add' | 'subtract';
  value: number;
};
export const getPriceHandler = (price: number, changer: PriceChanger) => {
  if (changer.type === 'percentage_price') {
    return changer.method === 'add'
      ? price + (price * changer.value) / 100
      : price - (price * changer.value) / 100;
  }
  if (changer.type === 'fixed_price') {
    return changer.method === 'add' ? price + changer.value : price - changer.value;
  }
  return price;
};

export const getHttpRequestHeaders = (
  accessToken: string,
  extend?: {[key: string]: any},
): {
  headers: {[key: string]: string};
} => {
  return {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Language': 'de-DE',
      ...(extend && {...extend}),
    },
  };
};
