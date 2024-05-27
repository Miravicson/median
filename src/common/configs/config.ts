import type { Config } from './config.interface';

const config: Config = {
  nest: {
    port: Number.parseInt(process.env.PORT ?? '', 10) || 3000,
  },
  cors: {
    enabled: true,
  },
  swagger: {
    enabled: true,
    title: 'Median',
    description: 'The Median API description',
    version: '0.1',
    path: 'swagger',
  },
  graphql: {
    playgroundEnabled: true,
    debug: true,
    schemaDestination: './src/schema.graphql',
    sortSchema: true,
  },
  security: {
    expiresIn: '2m',
    refreshIn: '7d',
    bcryptSaltOrRound: 10,
  },
};

export default (): Config => config;
