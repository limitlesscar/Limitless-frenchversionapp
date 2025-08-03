import {
  CommonActions,
  createNavigationContainerRef,
} from '@react-navigation/native';
import {RootStackNavigationType} from './types/navigationType';

// Create the navigation ref
export const navigationRef =
  createNavigationContainerRef<RootStackNavigationType>();

// Navigate to a screen
export const navigate = <T extends keyof RootStackNavigationType>(
  name: T,
  ...params: RootStackNavigationType[T] extends undefined
    ? []
    : [RootStackNavigationType[T]]
) => {
  if (navigationRef?.isReady()) {
    navigationRef.navigate(
      name as keyof RootStackNavigationType,
      ...(params as [RootStackNavigationType[T]]),
    );
  }
};

// Replace current screen with a new one
export const navigateReplace = <T extends keyof RootStackNavigationType>(
  name: T,
  ...params: RootStackNavigationType[T] extends undefined
    ? []
    : [RootStackNavigationType[T]]
) => {
  if (navigationRef?.isReady()) {
    navigationRef.dispatch(
      CommonActions.navigate({
        name: name as keyof RootStackNavigationType,
        params: {
          ...(params[0] || {}),
          replace: true,
        },
      }),
    );
  }
};

// Go back to the previous screen
export const navigateGoBack = () => {
  if (navigationRef?.isReady()) {
    navigationRef.goBack();
  }
};

// Reset navigation stack to a specific screen
export const navigateReset = <T extends keyof RootStackNavigationType>(
  name: T,
  ...params: RootStackNavigationType[T] extends undefined
    ? []
    : [RootStackNavigationType[T]]
) => {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          {
            name,
            params: {...(params[0] || {})},
          },
        ],
      }),
    );
  }
};

/**
 * ----------------------------------------------
 * Contribution by Erivan – August 2025
 * - Removed unused parameters from `navigate` function.
 * - Improved type safety and spread usage in all functions.
 * - Added fallback handling for optional params.
 * - Ensured consistent and clean navigation utilities.
 * ----------------------------------------------
 */

/*
import {
  CommonActions,
  createNavigationContainerRef,
} from '@react-navigation/native';
import {RootStackNavigationType} from './types/navigationType';

export const navigationRef =
  createNavigationContainerRef<RootStackNavigationType>();
export const navigate = <T extends keyof RootStackNavigationType>(
  name: T,
  ...params: RootStackNavigationType[T] extends undefined
  /*  ? []
    : [RootStackNavigationType[T]]
) => {
  if (navigationRef?.isReady()) {
    navigationRef.navigate(
      name as keyof RootStackNavigationType,
      ...(params as [RootStackNavigationType[T]]),
    );
  }
};
export const navigateReplace = <T extends keyof RootStackNavigationType>(
  name: T,
  ...params: RootStackNavigationType[T] extends undefined
   /* ? []
    : [RootStackNavigationType[T]]
) => {
  if (navigationRef?.isReady()) {
    navigationRef?.dispatch(
      CommonActions.navigate({
        name: name as keyof RootStackNavigationType,
        params: {
          ...(params as [RootStackNavigationType[T]]),
          replace: true,
        },
      }),
    );
  }
};

export const navigateGoBack = () => {
  if (navigationRef?.isReady()) {
    navigationRef.goBack();
  }
};
export const navigateReset = <T extends keyof RootStackNavigationType>(
  name: T,
  ...params: RootStackNavigationType[T] extends undefined
 /* ? []
    : [RootStackNavigationType[T]]
) => {
  if (navigationRef.isReady()) {
    navigationRef?.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          {
            name,
            params: {...(params as [RootStackNavigationType[T]])},
          },
        ],
      }),
    );
  }
};
*/
