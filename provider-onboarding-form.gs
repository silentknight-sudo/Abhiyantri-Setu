/**
 * Abhiyantri Setu – Service Provider Onboarding Form
 * HOW TO USE:
 * 1. Open https://script.google.com → New project
 * 2. Paste this whole file, click Save, then Run ▶ "createProviderOnboardingForm"
 * 3. Allow permissions. Open View → Logs (Execution log) for the form edit & share links.
 * Responses are linked to a new Google Sheet automatically.
 */
function createProviderOnboardingForm() {
  var form = FormApp.create('Abhiyantri Setu – Service Provider Onboarding');
  form.setDescription(
    'Join Abhiyantri Setu, Greater Noida\'s verified construction marketplace. ' +
    'Fill this form to get listed and start receiving project leads from homeowners. ' +
    'Our team will verify your details and contact you within 2–3 working days.'
  );
  form.setCollectEmail(true);
  form.setProgressBar(true);

  // ---------- Section 1: Basic Info ----------
  form.addSectionHeaderItem().setTitle('1. Basic Information');
  form.addTextItem().setTitle('Full Name').setRequired(true);
  form.addTextItem().setTitle('Business / Firm Name (if any)');
  form.addTextItem().setTitle('Mobile Number (WhatsApp preferred)').setRequired(true)
    .setValidation(FormApp.createTextValidation()
      .requireTextMatchesPattern('^[6-9][0-9]{9}$')
      .setHelpText('Enter a valid 10-digit Indian mobile number').build());
  form.addTextItem().setTitle('Alternate Mobile Number');
  form.addMultipleChoiceItem().setTitle('Provider Type').setRequired(true)
    .setChoiceValues(['Individual Professional', 'Contractor / Firm', 'Skilled Labour Team',
      'Material Supplier', 'Equipment Rental']);
  form.addParagraphTextItem().setTitle('Full Address').setRequired(true);
  form.addTextItem().setTitle('Pincode').setRequired(true)
    .setValidation(FormApp.createTextValidation()
      .requireTextMatchesPattern('^[0-9]{6}$').setHelpText('6-digit pincode').build());

  // ---------- Section 2: Services ----------
  form.addPageBreakItem().setTitle('2. Services & Experience');
  form.addCheckboxItem().setTitle('Primary Specialty (select all that apply)').setRequired(true)
    .setChoiceValues(['Civil Contractor', 'Architect', 'Civil / Structural Engineer',
      'Interior Designer', 'Mason', 'Carpenter', 'Plumber', 'Electrician', 'Painter',
      'Tiles / Flooring', 'Welder / Fabrication', 'POP / False Ceiling', 'Waterproofing',
      'Building Materials Supplier', 'Equipment Rental'])
    .showOtherOption(true);
  form.addCheckboxItem().setTitle('Project Types You Handle').setRequired(true)
    .setChoiceValues(['New Construction (Residential)', 'Renovation', 'Interior Work',
      'Commercial', 'Industrial', 'Repair & Maintenance']);
  form.addMultipleChoiceItem().setTitle('Work Model').setRequired(true)
    .setChoiceValues(['Labour Only', 'Full (Labour + Material)', 'Both']);
  form.addMultipleChoiceItem().setTitle('Years of Experience').setRequired(true)
    .setChoiceValues(['Less than 1 year', '1–3 years', '3–5 years', '5–10 years', '10+ years']);
  form.addMultipleChoiceItem().setTitle('Team Size').setRequired(true)
    .setChoiceValues(['Only me', '2–5', '6–15', '16–50', '50+']);
  form.addCheckboxItem().setTitle('Service Areas').setRequired(true)
    .setChoiceValues(['Greater Noida', 'Greater Noida West', 'Noida', 'Ghaziabad',
      'Delhi', 'Faridabad', 'Gurugram'])
    .showOtherOption(true);
  form.addParagraphTextItem().setTitle('Short Bio / About Your Work')
    .setHelpText('This will appear on your Abhiyantri Setu profile.');

  // ---------- Section 3: Pricing ----------
  form.addPageBreakItem().setTitle('3. Pricing');
  form.addMultipleChoiceItem().setTitle('How do you usually charge?').setRequired(true)
    .setChoiceValues(['Per day', 'Per sq. ft.', 'Per project (lump sum)', 'Per visit', 'Hourly']);
  form.addParagraphTextItem().setTitle('Typical Rates (e.g. ₹/day, ₹/sq.ft.)')
    .setHelpText('Example: Mason ₹900/day, Tiling ₹45/sq.ft.');
  form.addMultipleChoiceItem().setTitle('Minimum project size you accept')
    .setChoiceValues(['Any size', 'Above ₹25,000', 'Above ₹1 Lakh', 'Above ₹5 Lakh', 'Above ₹25 Lakh']);

  // ---------- Section 4: Work Proof ----------
  form.addPageBreakItem().setTitle('4. Work Photos & Portfolio')
    .setHelpText('File uploads need the respondent to sign in to Google. ' +
                 'If you cannot upload, paste a Google Drive / Instagram link below.');
  form.addParagraphTextItem().setTitle('Portfolio / Work Photos Link (Drive, Instagram, website)');
  form.addTextItem().setTitle('Number of projects completed so far');
  form.addParagraphTextItem().setTitle('Client references (name + phone, optional)');

  // ---------- Section 5: Verification ----------
  form.addPageBreakItem().setTitle('5. Verification Details')
    .setHelpText('Required to get the "Verified" badge. Documents are checked by our team and kept confidential.');
  form.addMultipleChoiceItem().setTitle('ID Proof you will provide').setRequired(true)
    .setChoiceValues(['Aadhaar Card', 'PAN Card', 'Voter ID', 'Driving Licence']);
  form.addTextItem().setTitle('Last 4 digits of ID number')
    .setValidation(FormApp.createTextValidation()
      .requireTextMatchesPattern('^[0-9A-Za-z]{4}$').setHelpText('Only last 4 characters').build());
  form.addTextItem().setTitle('GST Number (if registered)');
  form.addMultipleChoiceItem().setTitle('Do you hold any trade licence / certification?')
    .setChoiceValues(['Yes', 'No']);
  form.addTextItem().setTitle('If yes, which one?');
  form.addMultipleChoiceItem().setTitle('Preferred time for verification call').setRequired(true)
    .setChoiceValues(['Morning (9–12)', 'Afternoon (12–4)', 'Evening (4–8)']);

  // ---------- Section 6: Payments ----------
  form.addPageBreakItem().setTitle('6. Payment Preference')
    .setHelpText('Full bank details will be collected securely after verification – do not share passwords or OTPs.');
  form.addMultipleChoiceItem().setTitle('Preferred payout method').setRequired(true)
    .setChoiceValues(['UPI', 'Bank Transfer']);
  form.addTextItem().setTitle('UPI ID (optional)');

  // ---------- Section 7: Consent ----------
  form.addPageBreakItem().setTitle('7. Declaration');
  form.addMultipleChoiceItem().setTitle('How did you hear about Abhiyantri Setu?')
    .setChoiceValues(['Friend / Referral', 'WhatsApp', 'Instagram / Facebook', 'Field team visit', 'Google'])
    .showOtherOption(true);
  form.addCheckboxItem().setTitle('Declaration').setRequired(true)
    .setChoiceValues(['I confirm the information provided is true, and I agree to Abhiyantri Setu ' +
      'verifying my details and contacting me about projects.']);

  form.setConfirmationMessage('Thank you for registering with Abhiyantri Setu! ' +
    'Our team will call you for verification within 2–3 working days.');

  var ss = SpreadsheetApp.create('Abhiyantri Setu – Provider Onboarding Responses');
  form.setDestination(FormApp.DestinationType.SPREADSHEET, ss.getId());

  Logger.log('Edit form:  ' + form.getEditUrl());
  Logger.log('Share link: ' + form.getPublishedUrl());
  Logger.log('Responses:  ' + ss.getUrl());
}
