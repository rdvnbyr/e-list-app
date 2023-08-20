import {HttpErrors} from '@loopback/rest';
import {CONNECTION_SANDBOX, SCOPES} from './config';
const EbayAuthClient = require('ebay-oauth-nodejs-client');

export async function ebayOAuth(refreshToken: string): Promise<{
  access_token: string;
  token_type?: string | undefined | null;
  expires_in: number;
}> {
  const ebayAuthClient = new EbayAuthClient({
    ...CONNECTION_SANDBOX,
  });
  const response = await ebayAuthClient.getAccessToken('PRODUCTION', refreshToken, SCOPES);
  if (!response) {
    throw new HttpErrors.Unauthorized('Invalid refresh token');
  }
  const result = JSON.parse(response);
  if (result.error) {
    throw new HttpErrors.Unauthorized(result.error?.message || 'Invalid refresh token');
  }
  return result;
}
