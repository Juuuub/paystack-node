import { Axios } from 'axios';
import { BadRequest } from '../interface';
import {
  CapturePreAuthorization,
  GetPreAuthorizationResponse,
  InitializePreAuthorization,
  ListPreAuthorizationQueryParams,
  ListPreAuthorizationsResponse,
  PreAuthorizationInitialized,
  PreAuthorizationReleased,
  ReleasePreAuthorization,
  ReservePreAuthorization,
} from './interface';

/**
 * # PreAuthorization
 * Place a hold on a customer's card, then capture or release later.
 * Currently available for `ZAR` only.
 * @see https://paystack.com/docs/payments/card-preauthorization/
 */
export class PreAuthorization {
  private http: Axios;
  constructor(http: Axios) {
    this.http = http;
  }

  /**
   * Initialize a pre-authorization for a first-time customer.
   * Returns a checkout URL / access code.
   */
  async initialize(
    data: InitializePreAuthorization,
  ): Promise<PreAuthorizationInitialized | BadRequest> {
    return await this.http.post(
      '/preauthorization/initialize',
      JSON.stringify(data),
    );
  }

  /**
   * Place a hold using an existing authorization code.
   */
  async reserve(
    data: ReservePreAuthorization,
  ): Promise<GetPreAuthorizationResponse | BadRequest> {
    return await this.http.post(
      '/preauthorization/reserve_authorization',
      JSON.stringify(data),
    );
  }

  /**
   * Fetch and confirm the status of a pre-authorization.
   */
  async verify(
    reference: string,
  ): Promise<GetPreAuthorizationResponse | BadRequest> {
    return await this.http.get(`/preauthorization/${reference}`);
  }

  /**
   * Charge a pre-authorized transaction. Amount must be less than
   * or equal to the held amount.
   */
  async capture(
    data: CapturePreAuthorization,
  ): Promise<GetPreAuthorizationResponse | BadRequest> {
    return await this.http.post(
      '/preauthorization/capture',
      JSON.stringify(data),
    );
  }

  /**
   * Release a hold without charging the customer.
   */
  async release(
    data: ReleasePreAuthorization,
  ): Promise<PreAuthorizationReleased | BadRequest> {
    return await this.http.post(
      '/preauthorization/release',
      JSON.stringify(data),
    );
  }

  /**
   * List pre-authorizations on your integration.
   */
  async list(
    queryParams?: ListPreAuthorizationQueryParams,
  ): Promise<ListPreAuthorizationsResponse | BadRequest> {
    return await this.http.get('/preauthorization', {
      params: { ...queryParams },
    });
  }
}
