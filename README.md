This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli). - Version 0.74.5

## Project Details

- Make sure to update your nvm path in `ios/.env.local` file
- Node Version: v22.11.0
- Package Manager: Node / Nvm

## Code Structure

- **How many screens are in the app ?**

  - Check the src/screens/index file

- **How many shared components are used in the app ?**

  - Check the src/components/index file

- **Do we have global theme setup ?**
  - Global theme setup is in src/utils/theme.tsx
  - It includes:
    - images path
    - font names mapping
    - color codes
    - global styles (i.e section padding, inputs padding etc)

- **Why there are duplicate components with minor difference ?**
  - Since this app has 2 roles and 1 user can have both roles, so it will create complications in future to handle different events on different clicks with different role.
  - User can be host and host can be user, so showing edit options (for car details) for only host user id and related handling will create more complexity in furture so to keep things simple separate components are created.

## Make sure to add env for autocomplete input

.ENV
# This is the .env file containing environment variables
# necessary for the functioning of Google Maps API and Stripe API.
# Google Maps API Key - used to access Google Maps services
GOOGLE_MAPS_API_KEY=AIzaSyD2s3vyySyBlavEpYIa6cG8R0mpTBJM48Y
# Stripe Publishable Key - used to interact with Stripe payment processing
STRIPE_PUBLISHABLE_KEY=pk_test_51QZuAAISay562RG8p9pJKIkB84ciz0pJW1YqcNsWEHezpXvq05gjUymLgplIre9r8l9SHBCsfyUSwQ8QY5be1xuN00S4cXw1Zo
