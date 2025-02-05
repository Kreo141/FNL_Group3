// MSAL Configuration
const msalConfig = {
    auth: {
        clientId: "a91e98b3-3956-4f4f-85e9-409f12084f14", 
        authority: "https://login.microsoftonline.com/common",
        redirectUri: "http://localhost:3000/" 
    }
};

const msalInstance = new msal.PublicClientApplication(msalConfig);

const loginRequest = {
    scopes: ["user.read"] 
};

msalInstance.handleRedirectPromise()
    .then(response => {
        if (response) {
            console.log("Login successful", response);
            gotoDashboard();
        }
    })
    .catch(error => {
        console.error("Redirect error", error);
    });

function signIn() {
    msalInstance.loginRedirect(loginRequest);
}

function signOut() {
    msalInstance.logoutRedirect();
}

// i store sa sessionStorage then i redirect
function gotoDashboard() {
    const accounts = msalInstance.getAllAccounts();
    if (accounts.length > 0) {
        sessionStorage.setItem("userAccount", JSON.stringify(accounts[0]));
        
        window.location.href = "pages/02-Dashboard/dashboard.html";
    } else {
        console.error("No accounts found. Please sign in first.");
    } 
}