import type { ContactMessageType } from '@/api/generated/model';

export interface ContactFormValues {
  type: ContactMessageType;
  subject: string;
  message: string;
}
