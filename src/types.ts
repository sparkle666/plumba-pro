export type PlumbingBusinessType = 'Residential' | 'Commercial' | 'Both' | 'Starting out';

export type BusinessSize = 'Solo' | '2-5 employees' | '6-15 employees' | '15+ employees';

export type YesNoNotSure = 'Outdated' | 'No leads' | 'No website' | 'Not sure';

export type RevenueTier = 'Under $5k' | '$5k - $20k' | '$20k - $50k' | '$50k+';

export interface OnboardingState {
  businessType: PlumbingBusinessType | null;
  businessSize: BusinessSize | null;
  websiteState: YesNoNotSure | null;
  monthlyRevenue: RevenueTier | null;
  leadFlowSatisfaction: number; // 1 to 5
  fullName: string;
  businessName: string;
  email: string;
  phone: string;
  location: string;
}

export interface BookedSession {
  date: string; // e.g., '2026-10-06'
  timeSlot: string; // e.g., '09:00 AM'
  meetLink?: string;
  calendarEventId?: string;
}

export interface Lead {
  id: string;
  createdTime: string;
  answers: OnboardingState;
  booking: BookedSession | null;
  qualified: boolean;
  score: number;
}
