export type Options = {
  body: any;
};

export type GenericBody = { [key: string]: string };
export type GenericParams = { [key: string]: string };

export type TokenMethod = 'HEADER' | 'QS';

export type ApiRequestOptions = {
  token: string | undefined;
  tokenMethod: TokenMethod | undefined;
  body: GenericBody;
  qs: GenericParams;
};

export type Body<T> = {
  body: T;
};

export type Qs<T> = {
  qs: T;
};

export type Params<T> = {
  params: T;
};

export type GenericDefintion = {
  auth?: boolean;
};

export type Method = 'POST' | 'GET' | 'DELETE' | 'PUT';

export class ErrorResponse {
  status: 'error';

  message: string;
}

export class OkResponse {
  status: 'ok';
}

export class OkDataResponse<T> extends OkResponse {
  data: T;
}
