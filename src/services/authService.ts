import { getFromStorage } from '../lib/storage';

export default async function getToken() {
  const tokenData = await getFromStorage('token');
  return tokenData.token;
}
