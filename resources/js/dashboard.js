const userAccount = sessionStorage.getItem("userAccount");

if (userAccount) {
    const accountData = JSON.parse(userAccount);
    document.getElementById("user-info").textContent = `Welcome, ${accountData.name }`;
} else {
    document.getElementById("user-info").textContent = "No user data found. Please sign in.";
}