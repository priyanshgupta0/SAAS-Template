import { createSwaggerSpec } from 'next-swagger-doc';

export const getApiDocs = () => {
  const spec = createSwaggerSpec({
    apiFolder: 'src/app/api',
    definition: {
      openapi: '3.0.3',
      info: {
        title: 'SaaS Starter Template API',
        version: '1.0.0',
        description: 'REST API for the dynamic SaaS starter template',
      },
      servers: [{ url: '/api' }],
    },
  });
  return spec;
};
