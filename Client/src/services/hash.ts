import bcrypt from 'bcryptjs';

export const hashData = async (data) => {
  const hashedData = await bcrypt.hash(data, 10); 
  return hashedData;
};

