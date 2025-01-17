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

2. **Set Up Google Apps Script:**
   - Open your Google Sheet, go to **Extensions > Apps Script**.
   - Paste the following script:
     ```javascript
     function doPost(e) {
       var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
       var data = JSON.parse(e.postData.contents);
       sheet.appendRow([data.Email]);
       return ContentService.createTextOutput(JSON.stringify({ "result": "success" })).setMimeType(ContentService.MimeType.JSON);
     }
     ```
   - Save and deploy the script as a **web app**:
     - **Execute As:** Me
     - **Who Has Access:** Anyone

3. **Copy the Script URL:**
   - Replace `"Your_Add_URL"` in `script.js` with your script’s deployment URL.

4. **Test the Form:**
   - Open the form in a browser, enter an email, and click submit. Verify the data appears in your Google Sheet.

---

## Demo


