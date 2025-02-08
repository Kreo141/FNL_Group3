// 1. MSALSAL Config
const msalConfig = {
    auth: {
        clientId: "a91e98b3-3956-4f4f-85e9-409f12084f14",
        authority: "https://login.microsoftonline.com/common",
        redirectUri: "http://localhost:3000/",
        postLogoutRedirectUri: "http://localhost:3000/index.html"
    },
    cache: {
        cacheLocation: "sessionStorage",
        storeAuthStateInCookie: true
    }
};

const msalInstance = new msal.PublicClientApplication(msalConfig);

const loginRequest = {
    scopes: ["user.read"]
};

// 2. Handle Redirect Otentication
msalInstance.handleRedirectPromise()
    .then(response => {
        const account = msalInstance.getAllAccounts()[0];
        if (response || account) {
            console.log("Login successful", response || account);
            storeUserSession(account);
            if (!window.location.pathname.includes("/pages/02-Dashboard/dashboard.html")) {
                redirectToDashboard();
            }
        }
    })
    .catch(error => {
        console.error("Redirect error", error);
    });

// 3. Silent Authentication
msalInstance.acquireTokenSilent(loginRequest)
    .then(response => {
    })
    .catch(error => {
        if (error instanceof msal.InteractionRequiredAuthError) {
            msalInstance.acquireTokenRedirect(loginRequest);
        } else {
            console.error("Token acquisition error:", error);
        }
    });

// 4. User Session Manage
function storeUserSession(account) {
    if (!account) return;
    
    fetch("/api/store-session", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: account.username })
    })
    .then(response => {
        if (response.ok) {
            console.log("User session stored securely");
            if (!window.location.pathname.includes("/pages/02-Dashboard/dashboard.html")) {
                redirectToDashboard();
            }
        } else {
            console.error("Failed to store user session");
        }
    })
    .catch(error => console.error("Session storage error:", error));
}

// 5. Login and Logout Functions
function signIn() {
    msalInstance.loginRedirect(loginRequest);
}

function signOut() {
    fetch("/api/logout", { method: "POST", credentials: "include" }) 
        .then(() => {
            msalInstance.logoutRedirect();
        })
        .catch(error => console.error("Logout error:", error));
}

// 6. Navigation Handling
function redirectToDashboard() {
    window.location.href = "/pages/02-Dashboard/dashboard.html";
}

// 7. Page Load Logiic
window.onload = function() {
    const account = msalInstance.getAllAccounts()[0];
    const isOnDashboard = window.location.pathname.includes("/pages/02-Dashboard/dashboard.html");
    
    if (account && !isOnDashboard) {
        redirectToDashboard();
    } else if (!account && isOnDashboard) {
        window.location.href = "/index.html";
    }
};
