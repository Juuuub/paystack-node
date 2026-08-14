import { Authorization } from '../charge/interface';
import { Customer } from '../customer/interface';
import { Meta, QueryParams, Response } from '../interface';

export type PreAuthorizationExpireAction = 'capture' | 'release';

export interface InitializePreAuthorization {
  /**
   * Customer's email address
   */
  email: string;
  /**
   * Amount should be in **cents**, since currency is `ZAR`.
   * Minimum amount is 100.
   */
  amount: string;
  /**
   * Currency should be `ZAR`. Only `ZAR` is supported.
   */
  currency: 'ZAR';
  /**
   * Unique case sensitive transaction reference.
   * Only `-`, `.`, `=` and alphanumeric characters allowed.
   * If omitted, Paystack generates a unique reference.
   */
  reference?: string;
  /**
   * Number of days until `expire_action` is executed.
   * Minimum is 1 day and maximum is 30 days. Defaults to 5.
   */
  expire_after_days?: number;
  /**
   * Action to take on the expiry date: `capture` or `release`.
   * Defaults to `release`.
   */
  expire_action?: PreAuthorizationExpireAction;
  /**
   * JSON object of custom data.
   */
  metadata?: Record<string, unknown>;
  /**
   * Fully qualified URL. Overrides the dashboard callback URL
   * for this transaction.
   */
  callback_url?: string;
}

export interface ReservePreAuthorization {
  /**
   * Valid authorization code from a previous card transaction
   */
  authorization_code: string;
  /**
   * Customer's email address
   */
  email: string;
  /**
   * Amount should be in **cents**, since currency is `ZAR`.
   */
  amount: string;
  /**
   * Currency should be `ZAR`. Only `ZAR` is supported.
   */
  currency: 'ZAR';
  /**
   * Unique case sensitive transaction reference.
   */
  reference?: string;
  /**
   * Number of days until `expire_action` is executed.
   * Minimum is 1 day and maximum is 30 days. Defaults to 5.
   */
  expire_after_days?: number;
  /**
   * Action to take on the expiry date: `capture` or `release`.
   * Defaults to `release`.
   */
  expire_action?: PreAuthorizationExpireAction;
  /**
   * JSON object of custom data.
   */
  metadata?: Record<string, unknown>;
}

export interface CapturePreAuthorization {
  /**
   * PreAuthorization reference
   */
  reference: string;
  /**
   * Amount to capture. Must be less than or equal to the held amount.
   * Amount should be in **cents**.
   */
  amount: string;
  /**
   * Currency should be `ZAR`
   */
  currency: 'ZAR';
}

export interface ReleasePreAuthorization {
  /**
   * PreAuthorization reference
   */
  reference: string;
}

export interface ListPreAuthorizationQueryParams extends QueryParams {
  /**
   * Specify a customer ID whose pre-authorizations to retrieve
   */
  customer?: number;
  /**
   * Filter by status
   */
  status?: string;
}

export interface PreAuthorizationInitialized extends Response {
  data: {
    authorization_url: string;
    access_code: string;
    reference: string;
  };
}

export interface PreAuthorization {
  id: number;
  domain: string;
  status: string;
  reference: string;
  amount: number;
  message?: string | null;
  gateway_response?: string;
  paid_at?: string | null;
  created_at: string;
  channel?: string;
  currency: string;
  ip_address?: string;
  metadata?: Record<string, unknown> | null;
  log?: unknown;
  fees?: number | null;
  fees_split?: unknown;
  authorization?: Authorization;
  customer?: Customer;
  plan?: unknown;
  split?: unknown;
  order_id?: unknown;
  paidAt?: string | null;
  createdAt?: string;
  requested_amount?: number;
  pos_transaction_data?: unknown;
  source?: unknown;
  fees_breakdown?: unknown;
  transaction_date?: string;
  plan_object?: unknown;
  subaccount?: unknown;
  merchant_id?: number;
  merchant_name?: string;
  expire_action?: PreAuthorizationExpireAction;
  captured_at?: string | null;
  split_code?: string | null;
}

export interface GetPreAuthorizationResponse extends Response {
  data: PreAuthorization;
}

export interface ListPreAuthorizationsResponse extends Response {
  data: PreAuthorization[];
  meta: Meta;
}

export interface PreAuthorizationReleased extends Response {
  data: {
    status: string;
    reference: string;
  };
}
