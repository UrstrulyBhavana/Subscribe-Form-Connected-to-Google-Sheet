# 📧 Subscribe Form to Google Sheet

A clean and responsive subscription form that captures user emails and sends them directly to a Google Sheet. This is a great tool for collecting subscriber information for upcoming events, announcements, or newsletters.

---

## Features
- 📝 **Email Subscription Form:** Allows users to input their email addresses for updates.
- 📊 **Google Sheet Integration:** Automatically logs email submissions into a linked Google Sheet.
- 🖥️ **Responsive Design:** Optimized for all devices, providing a seamless user experience.
- 🎨 **Modern Aesthetics:** Clean and visually appealing UI with a gradient background and intuitive layout.
- ⏳ **Real-Time Feedback:** Displays a confirmation message upon successful submission.

---

## Technologies Used
- 🎨 **HTML:** Creates the structure for the form and layout.
- 🎨 **CSS:** Styles the form, text, and layout for responsiveness and appeal.
- ✨ **JavaScript:** Handles form submissions and integrates with Google Sheets.
- 🌐 **Google Apps Script:** Captures and logs form submissions in Google Sheets.


---

## How to Use

1. **Subscribe to Updates:**
   - Enter your email address in the input field.
   - Click the **Submit** button to send your subscription.

2. **View Confirmation:**
   - A message saying "Thank You For Subscribing!" will appear for 5 seconds.
   - The form will automatically reset after submission.

3. **Google Sheet Integration:**
   - Submissions are logged in real time to a connected Google Sheet.

---

## Setting Up Google Sheet Integration

### Step 1: Create a Google Sheet
1. Open [Google Sheets](https://sheets.google.com) and create a new spreadsheet.
2. Name the first sheet `Sheet1` (or modify the script to match your sheet name).
3. Add headers in the first row (e.g., `Email`, `timestamp`).

---

### Step 2: Set Up Google Apps Script
1. In your Google Sheet, go to **Extensions > Apps Script**.
2. Paste the following code into the editor:

```javascript
var sheetName = 'Sheet1';
var scriptProp = PropertiesService.getScriptProperties();

function intialSetup() {
  var activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  scriptProp.setProperty('key', activeSpreadsheet.getId());
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    var doc = SpreadsheetApp.openById(scriptProp.getProperty('key'));
    var sheet = doc.getSheetByName(sheetName);

    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    var nextRow = sheet.getLastRow() + 1;

    var newRow = headers.map(function(header) {
      return header === 'timestamp' ? new Date() : e.parameter[header];
    });

    sheet.getRange(nextRow, 1, 1, newRow.length).setValues([newRow]);

    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'success', 'row': nextRow }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (e) {
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'error', 'error': e }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

```
### Step 3: Run Initial Setup

In the Apps Script editor, select the intialSetup function from the dropdown menu and click Run.
Grant any necessary permissions.

### Step 4: Deploy as a Web App

Click Deploy > New Deployment.
Select Web App as the deployment type.
Set the following:
Execute As: Me
Who Has Access: Anyone
Deploy and copy the Web App URL.

### Step 5: Integrate the Web App with Your Form

Replace Your_Add_URL in the following JavaScript with your Web App URL:
javascript

const scriptURL = 'Your_Add_URL'; // Replace with your Web App URL
const form = document.forms['submit-to-google-sheet'];
const msg = document.getElementById("msg");

form.addEventListener('submit', e => {
  e.preventDefault();
  fetch(scriptURL, { method: 'POST', body: new FormData(form) })
    .then(response => {
      msg.innerHTML = "Thank You For Subscribing!";
      setTimeout(() => { msg.innerHTML = ""; }, 5000);
      form.reset();
    })
    .catch(error => console.error('Error!', error.message));
});

## Demo

https://github.com/user-attachments/assets/e24aac64-26fc-45c0-af9f-163653f57f45
