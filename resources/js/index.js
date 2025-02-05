const msalConfig = {
  auth: {
      clientId: 'YOUR_CLIENT_ID', // Your application's client ID
      authority: 'https://login.microsoftonline.com/YOUR_TENANT_ID', // Your tenant ID
      redirectUri: 'http://localhost:3000', // Redirect URI you configured in Azure AD
  }
};

const msalInstance = new msal.PublicClientApplication(msalConfig);
