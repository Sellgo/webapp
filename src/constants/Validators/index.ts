import PasswordValidator from 'password-validator';

export const passwordPolicy = new PasswordValidator()
  .is()
  .min(8)
  .has()
  .uppercase()
  .has()
  .lowercase()
  .has()
  .digits()
  .has()
  .symbols();

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

export const Length = new PasswordValidator().is().min(8);
