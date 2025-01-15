export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): boolean => {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  return passwordRegex.test(password);
};

export const validateName = (name: string): boolean => {
  return name.trim().length >= 2;
};

export interface ValidationError {
  field: string;
  message: string;
}

export const validateLoginForm = (email: string, password: string): ValidationError[] => {
  const errors: ValidationError[] = [];
  
  if (!validateEmail(email)) {
    errors.push({ field: 'email', message: 'Please enter a valid email address' });
  }
  
  if (!password) {
    errors.push({ field: 'password', message: 'Password is required' });
  }
  
  return errors;
};

export const validateRegistrationForm = (
  name: string,
  email: string,
  password: string
): ValidationError[] => {
  const errors: ValidationError[] = [];
  
  if (!validateName(name)) {
    errors.push({ field: 'name', message: 'Name must be at least 2 characters long' });
  }
  
  if (!validateEmail(email)) {
    errors.push({ field: 'email', message: 'Please enter a valid email address' });
  }
  
  if (!validatePassword(password)) {
    errors.push({
      field: 'password',
      message: 'Password must be at least 8 characters long and contain uppercase, lowercase, and numbers'
    });
  }
  
  return errors;
};