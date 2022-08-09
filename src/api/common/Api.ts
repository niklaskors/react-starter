import axios from 'axios';
import { apiDefinition, ApiDefinition } from '../../ApiDefinition';
import { ApiRequestOptions, Method, TokenMethod } from './types';

export default class Api {
  constructor(protected baseUrl: string) {}

  private static async fetch(
    url: string,
    method: Method,
    options: ApiRequestOptions
  ) {
    const headers: { Authorization?: string } = {};

    if (options.token && options.tokenMethod === 'HEADER') {
      headers.Authorization = `Bearer ${options.token}`;
    }

    const result = await axios.request({
      url,
      method,
      data: options.body,
      params: options.qs,
      headers
    });

    return result.data;
  }

  public req<T extends keyof ApiDefinition>(
    route: T,
    options: {
      token?: string;
      tokenMethod?: TokenMethod;
    } & Pick<ApiDefinition[T], 'qs'> &
      Pick<ApiDefinition[T], 'body'> &
      Pick<ApiDefinition[T], 'params'>
  ): Promise<ApiDefinition[T]['response']> {
    const reqDefinition = apiDefinition[route];
    let token: string | undefined;
    let tokenMethod: TokenMethod | undefined;

    if (reqDefinition.auth) {
      token = options.token;
      tokenMethod = options.tokenMethod || 'HEADER';
    }

    let { uri } = reqDefinition;

    if (options && options.params) {
      Object.keys(options.params).forEach((param) => {
        uri = uri.replace(
          new RegExp(`:${param}`, 'g'),
          (options.params! as any)[param]
        ) as any;
      });
    }

    return Api.fetch(`${this.baseUrl}/${uri}`, reqDefinition.method, {
      body: options.body!,
      qs: options.qs!,
      token,
      tokenMethod
    });
  }
}
