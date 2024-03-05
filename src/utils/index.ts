import * as bcrypt from 'bcrypt';

export const roundsOfHashing = 10;

export const hashPassWord = (password: string): Promise<string> => {
  return bcrypt.hash(password, roundsOfHashing);
};
