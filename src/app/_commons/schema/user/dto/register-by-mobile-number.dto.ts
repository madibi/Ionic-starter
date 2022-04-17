import { Length, MaxLength, MinLength } from 'class-validator';

export interface RegisterByMobileNumber {
    phonePrefix;
    mobileNumber;
  @MinLength(4)
  @MaxLength(20)
  password;
}
