# @eshaftri/secret-provider-ibm

A utility for securely retrieving secrets from **IBM Cloud Secrets Manager** in Node.js or TypeScript apps.

## 📦 Installation

```bash
npm install @eshaftri/secret-provider-ibm
```

Make sure your `.npmrc` is configured:

```
//npm.pkg.github.com/:_authToken=YOUR_GITHUB_READ_TOKEN
@eshaftri:registry=https://npm.pkg.github.com
```

## ✅ Usage

```ts
import { SecretProvider } from '@eshaftri/secret-provider-ibm';

const provider = new SecretProvider({
    serviceUrl: 'sm-service-url',
    cloudApiKey: 'cloud-api-key',
    trustedProfileId: 'sm-trusted-profile-id',
    nodeEnv: 'node-env',
});

const apiKey = await provider.fetchSecret('secret-id');
console.log(apiKey);
```

## 🛠️ Requirements

- Node.js 18+
- IAM API Key for IBM Cloud Secrets Manager
- Package registry access

---

### License

MIT © [Mohamed Eshaftri](https://github.com/eshaftri)
