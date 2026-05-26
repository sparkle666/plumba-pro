import { Lead } from '../types';

const N8N_WEBHOOK_URL = 'https://n8n-production-eb2f.up.railway.app/webhook/contact-form';

/**
 * Submits the lead data with answers and optional manual booking parameters to the n8n webhook.
 */
export async function submitLeadToNetlify(lead: Lead): Promise<boolean> {
  try {
    const submissionData = {
      fullName: lead.answers.fullName || '',
      businessName: lead.answers.businessName || '',
      email: lead.answers.email || '',
      phone: lead.answers.phone || '',
      location: lead.answers.location || '',
      businessType: lead.answers.businessType || '',
      businessSize: lead.answers.businessSize || '',
      websiteState: lead.answers.websiteState || '',
      monthlyRevenue: lead.answers.monthlyRevenue || '',
      leadFlowSatisfaction: lead.answers.leadFlowSatisfaction ?? '',
      diagnosticScore: lead.score ?? '',
      bookedDate: lead.booking?.date || 'Not booked yet',
      bookedTimeSlot: lead.booking?.timeSlot || 'Not booked yet',
      qualified: lead.qualified,
      createdTime: lead.createdTime,
      submissionTime: new Date().toISOString(),
    };

    console.log('Submitting lead to n8n webhook:', submissionData);

    const response = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(submissionData),
    });

    if (!response.ok) {
      console.error(`n8n webhook submission failed with status ${response.status}`);
      return false;
    }

    console.log('n8n webhook submission succeeded!');
    return true;
  } catch (err) {
    console.error('Error submitting lead to n8n webhook:', err);
    return false;
  }
}
