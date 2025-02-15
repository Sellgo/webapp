import PasswordValidator from 'password-validator';
import { isPostalCode, isEmail } from 'validator';
import { tldExists } from 'tldjs';
import { FREE_EMAILS } from '../FreeEmails';

export const Name = new PasswordValidator()
  .has()
  .letters()
  .has()
  .not()
  .digits()
  .has()
  .not()
  .symbols();

export const passwordPolicy = new PasswordValidator().is().min(6);

export const strong = new PasswordValidator()
  .is()
  .min(10)
  .has()
  .uppercase()
  .has()
  .lowercase()
  .has()
  .digits()
  .has()
  .symbols();

export const lowerUpper = new PasswordValidator()
  .has()
  .uppercase()
  .has()
  .lowercase();

export const alphanumeric = new PasswordValidator()
  .has()
  .letters()
  .has()
  .digits();

export const specialCharacters = new PasswordValidator().has().symbols();

export const Length = new PasswordValidator().is().min(6);

export const postalCode = (code: string, country: any) => {
  return isPostalCode(code, country);
};

export const validateEmail = (email: string) => {
  return isEmail(email) && tldExists(email);
};

export const isFreeEmail = (email: string) => {
  return FREE_EMAILS.find(freeEmail => freeEmail === email);
};
