import { Lead } from '../types';

/**
 * Helpler function to encode object data to x-www-form-urlencoded
 */
function encode(data: Record<string, string>): string {
  return Object.keys(data)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    .join('&');
}

/**
 * Submits the lead data with answers and optional manual booking parameters to Netlify Forms.
 */
export async function submitLeadToNetlify(lead: Lead): Promise<boolean> {
  try {
    const submissionData: Record<string, string> = {
      'form-name': 'leads',
      fullName: lead.answers.fullName || '',
      businessName: lead.answers.businessName || '',
      email: lead.answers.email || '',
      phone: lead.answers.phone || '',
      location: lead.answers.location || '',
      businessType: lead.answers.businessType || '',
      businessSize: lead.answers.businessSize || '',
      websiteState: lead.answers.websiteState || '',
      monthlyRevenue: lead.answers.monthlyRevenue || '',
      leadFlowSatisfaction: String(lead.answers.leadFlowSatisfaction || ''),
      diagnosticScore: String(lead.score || ''),
      bookedDate: lead.booking?.date || 'Not booked yet',
      bookedTimeSlot: lead.booking?.timeSlot || 'Not booked yet',
    };

    const response = await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode(submissionData),
    });

    if (!response.ok) {
      console.error(`Netlify Forms submission failed with status ${response.status}`);
      return false;
    }

    console.log('Netlify Forms submission succeeded!');
    return true;
  } catch (err) {
    console.error('Error submitting lead to Netlify Forms:', err);
    return false;
  }
}
