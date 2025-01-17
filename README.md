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
   - Click the **Send Icon** button to submit your email.

2. **View Confirmation:**
   - A message saying "Thank You For Subscribing!" will appear upon successful submission.
   - The message will disappear automatically after 5 seconds.

3. **Google Sheet Integration:**
   - The submitted email will be saved directly to the linked Google Sheet.

4. **Responsive Design:**
   - The form is designed to work seamlessly on all devices, from desktops to smartphones.

---

## Setting Up Google Sheet Integration
1. **Create a Google Sheet:**
   - Add column headers for your data (e.g., "Email").

2. ## Google Apps Script Code

To integrate your form submissions with Google Sheets, use the following code in the Google Apps Script editor:

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

Here’s your Google Apps Script code formatted for easy addition to your README in a terminal-style block:

markdown
Copy
Edit
## Google Apps Script Code

To integrate your form submissions with Google Sheets, use the following code in the Google Apps Script editor:

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
Steps to Use:
Open your Google Sheet.
Go to Extensions > Apps Script.
Replace any existing code with the script above.
Run the intialSetup function to link the script to your spreadsheet.
Deploy the script as a web app:
Deploy > New Deployment.
Select Web App.
Set Execute As: Me.
Set Who Has Access: Anyone.
Deploy and copy the Web App URL.
Replace Your_Add_URL in your JavaScript form handler with the Web App URL. ```

3. **Copy the Script URL:**
   - Replace `"Your_Add_URL"` in `script.js` with your script’s deployment URL.

4. **Test the Form:**
   - Open the form in a browser, enter an email, and click submit. Verify the data appears in your Google Sheet.

---

## Demo


