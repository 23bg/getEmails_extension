document.getElementById('getEmails').addEventListener('click', () => {
    // Get the currently active tab
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      // Execute the script on the current tab to extract emails
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        function: () => {
          // This function runs in the context of the webpage
          const pageText = document.body.innerText;
          const emailPattern = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
          const emails = pageText.match(emailPattern);
          return emails ? [...new Set(emails)] : [];  // Remove duplicates
        }
      }, (injectionResults) => {
        // Get the emails from the result
        const emails = injectionResults[0].result;
  
        // Display the extracted emails in the popup
        const emailsDiv = document.getElementById('emails');
        if (emails && emails.length > 0) {
          emailsDiv.innerHTML = "<strong>Found Emails:</strong><br>" + emails.join("<br>");
        } else {
          emailsDiv.innerHTML = "No emails found.";
        }
      });
    });
  });
  