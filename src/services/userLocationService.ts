import axiosInstance from '../service/api';
import {saveUserLocationEndpoint} from '../utils/endpoints';

export const saveUserLocationService = async (location: Object) => {
  console.log({location});
  return await axiosInstance.patch(`${saveUserLocationEndpoint}`, location);
};

// Ce service envoie la localisation de l'utilisateur au backend via une requête PATCH,
// en utilisant l'endpoint défini dans `utils/endpoints`. Utile pour mettre à jour la position
// de l'utilisateur (ex. : carte, suggestions locales, disponibilité, etc.).

// This service sends the user's location to the backend using a PATCH request,
// leveraging the endpoint defined in `utils/endpoints`. Useful for updating the user's
// position (e.g., for maps, local suggestions, availability, etc.).

// Exemple d'utilisation / Example usage:
// await saveUserLocationService({ latitude: 43.61, longitude: 3.87 });
