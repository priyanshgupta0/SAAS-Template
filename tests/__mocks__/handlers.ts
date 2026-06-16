import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('/api/health', () => {
    return HttpResponse.json({ status: 'ok', timestamp: new Date().toISOString() });
  }),
  http.post('/api/contact', async ({ request }) => {
    const body = await request.json();
    return HttpResponse.json({ id: 'test-id', status: 'NEW', createdAt: new Date().toISOString(), ...body as object }, { status: 201 });
  }),
];
