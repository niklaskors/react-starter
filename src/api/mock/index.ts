import { createServer } from 'miragejs';

/**
 * Create routes that need to be mocked.
 * These will be intercepted directly in the browser and will be handled by this file.
 */

function successResponse(data: any) {
  return {
    status: 200,
    data
  };
}

export default function createMockServer({ environment = 'development' }) {
  console.log('Running with mock server');
  return createServer({
    environment,
    routes() {
      this.namespace = '/v1';
      this.get('/user', () => successResponse({ id: '1', name: 'Luke' }));
      this.post('/login', () => successResponse({ token: 'testtoken' }));

      this.passthrough();
    }
  });
}
