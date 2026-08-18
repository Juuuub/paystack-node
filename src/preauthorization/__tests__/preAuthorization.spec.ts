import { Axios } from 'axios';
import { PreAuthorization } from '../preauthorization';

describe('PreAuthorization', () => {
  const http = {
    post: jest.fn(),
    get: jest.fn(),
  };
  const preAuthorization = new PreAuthorization(http as unknown as Axios);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('initializes a pre-authorization', async () => {
    const payload = {
      email: 'customer@example.com',
      amount: '1000',
      currency: 'ZAR' as const,
      expire_after_days: 3,
      expire_action: 'release' as const,
    };
    http.post.mockResolvedValue({ status: true });

    await preAuthorization.initialize(payload);

    expect(http.post).toHaveBeenCalledWith(
      '/preauthorization/initialize',
      JSON.stringify(payload),
    );
  });

  it('reserves a pre-authorization with an authorization code', async () => {
    const payload = {
      email: 'customer@example.com',
      amount: '1000',
      currency: 'ZAR' as const,
      authorization_code: 'AUTH_dalhwqi5vw',
    };
    http.post.mockResolvedValue({ status: true });

    await preAuthorization.reserve(payload);

    expect(http.post).toHaveBeenCalledWith(
      '/preauthorization/reserve_authorization',
      JSON.stringify(payload),
    );
  });

  it('verifies a pre-authorization by reference', async () => {
    http.get.mockResolvedValue({ status: true });

    await preAuthorization.verify('pre_ref_123');

    expect(http.get).toHaveBeenCalledWith('/preauthorization/pre_ref_123');
  });

  it('captures a pre-authorization', async () => {
    const payload = {
      reference: 'pre_ref_123',
      amount: '1000',
      currency: 'ZAR' as const,
    };
    http.post.mockResolvedValue({ status: true });

    await preAuthorization.capture(payload);

    expect(http.post).toHaveBeenCalledWith(
      '/preauthorization/capture',
      JSON.stringify(payload),
    );
  });

  it('releases a pre-authorization', async () => {
    const payload = { reference: 'pre_ref_123' };
    http.post.mockResolvedValue({ status: true });

    await preAuthorization.release(payload);

    expect(http.post).toHaveBeenCalledWith(
      '/preauthorization/release',
      JSON.stringify(payload),
    );
  });

  it('lists pre-authorizations', async () => {
    http.get.mockResolvedValue({ status: true });

    await preAuthorization.list({ page: 1, perPage: 50 });

    expect(http.get).toHaveBeenCalledWith('/preauthorization', {
      params: { page: 1, perPage: 50 },
    });
  });
});
