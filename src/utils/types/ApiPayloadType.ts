export type LoginPayloadType = {
  email: string;
  password: string;
  fcm?: string | null;
};
export type RegisterPayloadType = {
  fullname: string;
  email: string;

  password: string;
};
export type FileAttachmentType = {uri: string; type: string; name: string};
export type VerifyOtpPayloadType = {
  email: string;
  OTP: string;
  type: 'Forgot Password' | 'Account Verification';
};
export type VerifyResendOtpPaloadType = {
  email: string;
  type: 'Forgot Password' | 'Account Verification';
};

export type SetNewPasswordPayloadType = {
  newPassword: string;
  confirmPassword: string;
};
type PersonalDetails = {
  fullname: string;
  abn: number;
  typeOfPractice: 'smallAnimal' | 'largeAnimal' | 'mixed';
  fieldOfPractice: 'generalPractice' | 'specialty' | 'emergency';
  location: string;
  mixedPercentages?: number[];
  phoneNumber: string;
  website: string;
  profilePicture: string;
};
type vetPersonalDetails = {
  fullname: string;
  about: string;
  phoneNumber: string;
  gender: 'male' | 'female' | 'other';
  dob: string;
  profilePicture: string;
  location: string;
};
type ProfessionalDetails = {
  veterinaryLicenseNo: string;
  yearsOfExperience: number;
  qualification: string;
  typeOfPractice: 'smallAnimal' | 'largeAnimal' | 'mixed';
  fieldPractices: string[];
  radiologyLicenseNo: string;
  expiryDate: string;
  microchipLicenseNo: string;
  insuranceDocument: string;
  resume: string;
};
export type Timing = {
  startTime: string;
  endTime: string;
};

export type HospitalOnboardPayload = {
  personalDetails: PersonalDetails;
  timings: Timing[];
  stepNumber: number;
};
export type VerNursePayload = {
  personalDetails: vetPersonalDetails;
  professionalDetails: ProfessionalDetails;
  timings: Timing[];
  stepNumber: number;
};

//  Ce fichier définit les types TypeScript utilisés pour les opérations d'authentification,
// de gestion de profil (utilisateur, vétérinaire, hôpital), et les payloads d'API.
// Ces types permettent d’assurer une validation stricte des données envoyées au backend,
// d’améliorer l’autocomplétion et de réduire les erreurs dans les appels d’API.

// This file defines TypeScript types used for authentication operations,
// profile management (user, vet, hospital), and API request payloads.
// These types help enforce strict validation of data sent to the backend,
// improve autocomplete, and reduce errors in API calls.

// Exemple d'utilisation / Example usage:
// const payload: LoginPayloadType = { email: 'user@example.com', password: '123456' };
// const onboarding: HospitalOnboardPayload = { personalDetails, timings, stepNumber: 2 };
