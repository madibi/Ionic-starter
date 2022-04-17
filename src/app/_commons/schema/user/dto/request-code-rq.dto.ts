import { RequestCodeSmsType } from '../enum/request-code-sms-type.enum';
import { RequestCodeType } from '../enum/request-code-type.enum';

export interface RequestCodeRQ {
  type: RequestCodeType;
  smsType: RequestCodeSmsType;
      phonePrefix: string;
      mobileNumber: string;
  recaptchaToken?: string;  
}
