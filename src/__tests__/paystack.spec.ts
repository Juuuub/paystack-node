import axios from 'axios';
import { Paystack } from '../paystack';

jest.mock('axios');
const Axios = axios as jest.Mocked<typeof axios>;

beforeEach(() => {
  Axios.create.mockReturnValue({
    interceptors: { response: { use: jest.fn() } },
  } as unknown as ReturnType<typeof axios.create>);
});

describe('PaystackSDK', () => {
  it('sets correct headers on initialization', () => {
    new Paystack('test-key');

    expect(axios.create).toHaveBeenCalledWith({
      baseURL: 'https://api.paystack.co',
      headers: {
        Authorization: 'Bearer test-key',
        'Content-Type': 'application/json',
      },
    });
  });

  it('exposes the preAuthorization module', () => {
    const paystack = new Paystack('test-key');

    expect(paystack.preAuthorization).toBeDefined();
    expect(typeof paystack.preAuthorization.initialize).toBe('function');
    expect(typeof paystack.preAuthorization.reserve).toBe('function');
    expect(typeof paystack.preAuthorization.verify).toBe('function');
    expect(typeof paystack.preAuthorization.capture).toBe('function');
    expect(typeof paystack.preAuthorization.release).toBe('function');
  });
});
