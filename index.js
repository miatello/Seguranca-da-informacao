document.getElementById("encryptForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const text = document.getElementById("encryptText").value;
    const key = document.getElementById("encryptKey").value;

    const response = await fetch("/encrypt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, key }),
    });
    const result = await response.json();
    document.getElementById("encryptedOutput").value = result.encryptedText || result.error;
});

document.getElementById("decryptForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const encryptedText = document.getElementById("decryptText").value;
    const key = document.getElementById("decryptKey").value;

    const response = await fetch("/decrypt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ encryptedText, key }),
    });
    const result = await response.json();
    document.getElementById("decryptedOutput").value = result.decryptedText || result.error;
});