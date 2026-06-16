import { apiGet, apiPost } from '@/lib/apiClient';
import type { ContactRequest, ContactSubmission } from '@/types/content';

export async function submitContact(body: ContactRequest): Promise<ContactSubmission> {
  return apiPost<ContactSubmission>('/contact', body);
}

export async function listContactSubmissions(status?: string): Promise<ContactSubmission[]> {
  const query = status ? `?status=${status}` : '';
  return apiGet<ContactSubmission[]>(`/contact${query}`);
}
