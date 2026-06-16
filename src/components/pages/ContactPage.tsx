import { ContactForm } from '@/components/organisms/ContactForm';

export function ContactPage() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-16">
      <h1 className="text-center text-4xl font-bold">Contact Us</h1>
      <p className="mt-2 text-center text-gray-600 dark:text-gray-300">
        We would love to hear from you.
      </p>
      <div className="mt-10">
        <ContactForm />
      </div>
    </section>
  );
}
