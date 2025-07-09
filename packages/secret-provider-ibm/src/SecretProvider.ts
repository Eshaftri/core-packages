import SecretsManager from '@ibm-cloud/secrets-manager/secrets-manager/v2';
import { IamAuthenticator, ContainerAuthenticator } from 'ibm-cloud-sdk-core';

interface SecretsConfig {
  serviceUrl: string;
  cloudApiKey?: string;
  trustedProfileId?: string;
  nodeEnv?: string;
}

export const SecretProvider = (cfg: SecretsConfig) => {
  const { serviceUrl, cloudApiKey, trustedProfileId, nodeEnv = 'production' } = cfg;

  const authenticator =
    nodeEnv === 'development'
      ? new IamAuthenticator({ apikey: hasEnv('cloudApiKey', cloudApiKey) })
      : new ContainerAuthenticator({
          iamProfileName: hasEnv('trustedProfileId', trustedProfileId),
        });

  const sm = new SecretsManager({ authenticator, serviceUrl });

  const fetchSecret = async (secretId: string) => {
    const { result } = await sm.getSecret({ id: secretId });
    if (!result) {
      throw new Error(`Secret field missing in secret ${secretId}`);
    }
    return result;
  };

  return { fetchSecret };
};

const hasEnv = (name: string, value: unknown): string => {
  if (!value) throw new Error(`Missing required option: ${name}`);
  return String(value);
};
