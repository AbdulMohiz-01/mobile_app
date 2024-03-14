import { createRef, RefObject } from "react";

// Define the type for the navigation reference
type NavigationRefType = RefObject<any>;

// Create the navigation reference
export const navigationRef: NavigationRefType = createRef();

/**
 * This function will navigate to any screen
 * @param {string} name Name of the screen to navigate to
 * @param {Object} params Params to pass to the screen
 */
export function navigate(name: string, params: object): void {
  navigationRef.current?.navigate(name, params);
}
