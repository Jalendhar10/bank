import config from '../../../config/config';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'AFLI BE',
    version: '0.0.1',
    description: 'This is documentation of AFLI backend',
  },
  servers: [
    {
      url: `http://localhost:${config.port}/v1`,
      description: 'Development Server',
    },
  ],
};

export default swaggerDefinition;
