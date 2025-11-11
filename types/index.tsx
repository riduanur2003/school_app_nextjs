export interface StudentFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  dateOfBirth: string;
  grade: string;
  parentName: string;
  parentPhone: string;
}

export interface StatsItem {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}

export interface FeatureItem {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

export interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface HeroSectionProps {
  onRegisterClick: () => void;
}