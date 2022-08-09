import { GenericDefintion, OkDataResponse, Body } from './api/common/types';

const defaultDefinition: {
  method: 'GET';
  auth: true;
  body: any;
  params: any;
} = {
  auth: true,
  method: 'GET',
  body: {},
  params: {}
};

export type ApiDefinition = {
  login: {
    uri: 'login';
    method: 'POST';
    response?: OkDataResponse<{
      expiresIn: number;
      payload: any;
      token: string;
    }>;
    qs?: any;
    params?: any;
  } & GenericDefintion &
    Body<{ email: string; password: string }>;
};

export const apiDefinition: ApiDefinition = {
  login: {
    ...defaultDefinition,
    uri: 'login',
    method: 'POST',
    auth: false
  }
};
