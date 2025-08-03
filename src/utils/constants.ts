export const DEFAULT_IMAGE_URL =
  'https://w.wallhaven.cc/full/kx/wallhaven-kxorm6.jpg';
// export const API_URL = 'http://192.168.1.164:8000/';
// export const API_URL = 'https://api.limitless.zenkoders.com/';
export const API_URL = 'http://localhost:8000/';
export const API_REASONS = {
  FORGOT_PASSWORD: 'FORGOT_PASSWORD',
};
export const BRANDS = [
  {label: 'BMW', value: 'BMW'},
  {label: 'Audi', value: 'Audi'},
  {label: 'Mercedes', value: 'Mercedes'},
  {label: 'Ford', value: 'Ford'},
  {label: 'Toyota', value: 'Toyota'},
  {label: 'Honda', value: 'Honda'},
  {label: 'Nissan', value: 'Nissan'},
  {label: 'Hyundai', value: 'Hyundai'},
  {label: 'Kia', value: 'Kia'},
  {label: 'Chevrolet', value: 'Chevrolet'},
  {label: 'Volkswagen', value: 'Volkswagen'},
  {label: 'Fiat', value: 'Fiat'},
  {label: 'Renault', value: 'Renault'},
  {label: 'Peugeot', value: 'Peugeot'},
  {label: 'Citroën', value: 'Citroen'}, // French spelling
  {label: 'Suzuki', value: 'Suzuki'},
  {label: 'Tesla', value: 'Tesla'},
  {label: 'Mitsubishi', value: 'Mitsubishi'},
  {label: 'Alfa Romeo', value: 'Alfa-Romeo'}, // French style without hyphen
  {label: 'Chrysler', value: 'Chrysler'},
  {label: 'Cupra', value: 'Cupra'},
  {label: 'Daihatsu', value: 'Daihatsu'},
  {label: 'Dodge', value: 'Dodge'},
  {label: 'Jaguar', value: 'Jaguar'},
  {label: 'JEEP', value: 'JEEP'},
  {label: 'Land Rover', value: 'Land Rover'},
  {label: 'Lexus', value: 'Lexus'},
  {label: 'MG', value: 'MG'},
  {label: 'Maserati', value: 'Maserati'},
  {label: 'Mazda', value: 'Mazda'},
  {label: 'Porsche', value: 'Porsche'},
  {label: 'Skoda', value: 'Skoda'},
  {label: 'Volvo', value: 'Volvo'},
  {label: 'Subaru', value: 'Subaru'},
];
export const ENGINE_TYPES = [
  {label: 'Essence', value: 'Gasoline'},
  {label: 'Diesel', value: 'Diesel'},
  {label: 'Électrique', value: 'Electric'},
  {label: 'Hybride', value: 'Hybrid'},
];
export const TRANSMISSION_TYPES = [
  {label: 'Transmission manuelle', value: 'Manual Transmission'},
  {label: 'Transmission automatique', value: 'Automatic Transmission'},
  {label: 'Transmission à double embrayage', value: 'Dual-Clutch Transmission'},
  {
    label: 'Transmission à variation continue',
    value: 'Continuously Variable Transmission',
  },
];
export const GEAR_BOX = [
  {label: 'Boîte de vitesses manuelle', value: 'Manual Gearbox'},
  {label: 'Transmission automatique', value: 'Automatic Transmission'},
  {label: 'Transmission à double embrayage', value: 'Dual-Clutch Transmission'},
  {
    label: 'Transmission à variation continue',
    value: 'Continuously Variable Transmission',
  },
];
export const CAR_FEATURES = [
  {label: 'CHILD_SEAT', value: 'Child Seat', label_fr: 'Siège enfant'},
  {label: 'GPS', value: 'GPS', label_fr: 'GPS'},
  {
    label: 'AIR_CONDITIONING',
    value: 'Air Conditioning',
    label_fr: 'Climatisation',
  },
  {label: 'BIKE_RACK', value: 'Bike Rack', label_fr: 'Porte-vélos'},
  {label: 'SHOW_TIRES', value: 'Snow Tires', label_fr: 'Pneus neige'},
  {
    label: 'CRUISE_CONTROL',
    value: 'Cruise Control',
    label_fr: 'Régulateur de vitesse',
  },
  {label: 'SNOW_CHAINS', value: 'Snow Chains', label_fr: 'Chaînes à neige'},
  {label: 'APPLY_CARPLAY', value: 'Apply Carplay', label_fr: 'Apple Carplay'},
  {label: 'ANDROID_AUTO', value: 'Android Auto', label_fr: 'Android Auto'},
  {
    label: 'FOUR_WHEEL_DRIVE',
    value: 'Four Wheel Drivess',
    label_fr: 'Transmission intégrale',
  },
];
export const carColors = {
  '#000000': 'Black',
  '#ED2015': 'Red',
  '#E7F733': 'Yellow',
  '#71E582': 'Green',
  '#FF9500': 'Orange',
  '#BDBDBD': 'Grey',
  '#F5F5F5': 'White',
};
export const VEHICLE_TYPES = [
  {label: 'Tous', value: 'All'},
  {label: 'SUV', value: 'SUV'},
  {label: 'Coupé', value: 'Coupe'},
  {label: 'Hayon', value: 'Hatchback'},
  {label: 'Berline', value: 'Sedan'},
  {label: 'Van familial', value: 'Family Van'},
  {label: '4x4', value: '4x4'},
  {label: 'Cabriolet', value: 'Convertible'},
  {label: 'Voiture de sport', value: 'Sports Car'},
  {label: 'Limousine', value: 'Limousine'},
  {label: 'Voiture de luxe', value: 'Exotic Car'},
  {label: 'Camionnette', value: 'Pickup Truck'},
  {label: 'Camion', value: 'Truck'},
  {label: 'Véhicule électrique (VE)', value: 'Electric Vehicle (EV)'},
  {label: 'Véhicule hybride', value: 'Hybrid Vehicle'},
];
export const BOOKING_CANCELLATION_REASONS = [
  {
    label: "Je n'ai pas besoin de ce trajet",
    value: 'I do not need this journey',
  },
  {
    label: 'Je veux changer les détails du trajet',
    value: 'I want to change the details of the journey',
  },
  {
    label: 'Le chauffeur a mis trop de temps à être désigné',
    value: 'The driver took too long to be appointed',
  },
  {label: 'Autre', value: 'Other'},
];
/**
 * ----------------------------------------------
 * Contribution by Erivan couttolenc– August 2025
 * - Added French labels (`label_fr`) for car features.
 * - Included French translations for vehicle types, booking reasons, and brands.
 * - Provided bilingual constants to support French localization.
 * ----------------------------------------------
 */

/*
export const DEFAULT_IMAGE_URL =
  'https://w.wallhaven.cc/full/kx/wallhaven-kxorm6.jpg';

// export const API_URL = 'http://192.168.1.164:8000/';
// export const API_URL = 'https://api.limitless.zenkoders.com/';
export const API_URL = 'https://staging-api-limitless.zenkoders.com/';

export const API_REASONS = {
  FORGOT_PASSWORD: 'FORGOT_PASSWORD',
};

export const BRANDS = [
  {label: 'BMW', value: 'BMW'},
  {label: 'Audi', value: 'Audi'},
  {label: 'Mercedes', value: 'Mercedes'},
  {label: 'Ford', value: 'Ford'},
  {label: 'Toyota', value: 'Toyota'},
  {label: 'Honda', value: 'Honda'},
  {label: 'Nissan', value: 'Nissan'},
  {label: 'Hyundai', value: 'Hyundai'},
  {label: 'Kia', value: 'Kia'},
  {label: 'Chevrolet', value: 'Chevrolet'},
  {label: 'Volkswagen', value: 'Volkswagen'},
  {label: 'Fiat', value: 'Fiat'},
  {label: 'Renault', value: 'Renault'},
  {label: 'Peugeot', value: 'Peugeot'},
  {label: 'Citroen', value: 'Citroen'},
  {label: 'Suzuki', value: 'Suzuki'},
  {label: 'Tesla', value: 'Tesla'},
  {label: 'Mitsubishi', value: 'Mitsubishi'},
  {label: 'Alfa-Romeo', value: 'Alfa-Romeo'},
  {label: 'Chrysler', value: 'Chrysler'},
  {label: 'Cupra', value: 'Cupra'},
  {label: 'Daihatsu', value: 'Daihatsu'},
  {label: 'Dodge', value: 'Dodge'},
  {label: 'Jaguar', value: 'Jaguar'},
  {label: 'JEEP', value: 'JEEP'},
  {label: 'Land Rover', value: 'Land Rover'},
  {label: 'Lexus', value: 'Lexus'},
  {label: 'MG', value: 'MG'},
  {label: 'Maserati', value: 'Maserati'},
  {label: 'Mazda', value: 'Mazda'},
  {label: 'Porsche', value: 'Porsche'},
  {label: 'Skoda', value: 'Skoda'},
  {label: 'Volvo', value: 'Volvo'},
  {label: 'Subaru', value: 'Subaru'},
];

export const ENGINE_TYPES = [
  {label: 'Gasoline', value: 'Gasoline'},
  {label: 'Diesel', value: 'Diesel'},
  {label: 'Electric', value: 'Electric'},
  {label: 'Hybrid', value: 'Hybrid'},
];

export const TRANSMISSION_TYPES = [
  {label: 'Manual Transmission', value: 'Manual Transmission'},
  {label: 'Automatic Transmission', value: 'Automatic Transmission'},
  {label: 'Dual-Clutch Transmission', value: 'Dual-Clutch Transmission'},
  {
    label: 'Continuously Variable Transmission',
    value: 'Continuously Variable Transmission',
  },
];

export const GEAR_BOX = [
  {label: 'Manual Gearbox', value: 'Manual Gearbox'},
  {label: 'Automatic Transmission', value: 'Automatic Transmission'},
  {label: 'Dual-Clutch Transmission', value: 'Dual-Clutch Transmission'},
  {
    label: 'Continuously Variable Transmission',
    value: 'Continuously Variable Transmission',
  },
];

export const CAR_FEATURES = [
  {label: 'CHILD_SEAT', value: 'Child Seat'},
  {label: 'GPS', value: 'GPS'},
  {label: 'AIR_CONDITIONING', value: 'Air Conditioning'},
  {label: 'BIKE_RACK', value: 'Bike Rack'},
  {label: 'SHOW_TIRES', value: 'Snow Tires'},
  {label: 'CRUISE_CONTROL', value: 'Cruise Control'},
  {label: 'SNOW_CHAINS', value: 'Snow Chains'},
  {label: 'APPLY_CARPLAY', value: 'Apply Carplay'},
  {label: 'ANDROID_AUTO', value: 'Android Auto'},
  {label: 'FOUR_WHEEL_DRIVE', value: 'Four Wheel Drive'},
];

export const carColors = {
  '#000000': 'Black',
  '#ED2015': 'Red',
  '#E7F733': 'Yellow',
  '#71E582': 'Green',
  '#FF9500': 'Orange',
  '#BDBDBD': 'Grey',
  '#F5F5F5': 'White',
};

export const VEHICLE_TYPES = [
  {label: 'All', value: 'All'},
  {label: 'SUV', value: 'SUV'},
  {label: 'Coupe', value: 'Coupe'},
  {label: 'Hatchback', value: 'Hatchback'},
  {label: 'Sedan', value: 'Sedan'},
  {label: 'Family Van', value: 'Family Van'},
  {label: '4x4', value: '4x4'},
  {label: 'Convertible', value: 'Convertible'},
  {label: 'Sports Car', value: 'Sports Car'},
  {label: 'Limousine', value: 'Limousine'},
  {label: 'Exotic Car', value: 'Exotic Car'},
  {label: 'Pickup Truck', value: 'Pickup Truck'},
  {label: 'Truck', value: 'Truck'},
  {label: 'Electric Vehicle (EV)', value: 'Electric Vehicle (EV)'},
  {label: 'Hybrid Vehicle', value: 'Hybrid Vehicle'},
];

export const BOOKING_CANCELLATION_REASONS = [
  {label: 'I do not need this journey', value: 'I do not need this journey'},
  {
    label: 'I want to change the details of the journey',
    value: 'I want to change the details of the journey',
  },
  {
    label: 'The driver took too long to be appointed',
    value: 'The driver took too long to be appointed',
  },
  {label: 'Other', value: 'Other'},
];
*/
