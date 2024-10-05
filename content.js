// Content script that runs on the webpage and extracts emails using regular expressions
function extractEmails() {
    const pageText = document.body.innerText;
    const emailPattern = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
    const emails = pageText.match(emailPattern);
    return emails ? [...new Set(emails)] : [];
}

// After extracting emails, send them back to the popup or background script
chrome.runtime.sendMessage({ emails: extractEmails() });
