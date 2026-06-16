'use client';

import { useState } from 'react';
import { FormField } from '@/components/molecules/FormField';
import { Button } from '@/components/atoms/Button';
import { submitContact } from '@/services/api/contactApi';

export function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      await submitContact({ name, email, message });
      setStatus('success');
      setName('');
      setEmail('');
      setMessage('');
    } catch {
      setStatus('error');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-lg space-y-4">
      <FormField label="Name" value={name} onChange={(e) => setName(e.target.value)} required />
      <FormField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">Message</label>
        <textarea
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-900"
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
      </div>
      <Button type="submit" fullWidth>
        Send Message
      </Button>
      {status === 'success' && <p className="text-sm text-green-600">Message sent!</p>}
      {status === 'error' && <p className="text-sm text-red-500">Failed to send. Try again.</p>}
    </form>
  );
}
