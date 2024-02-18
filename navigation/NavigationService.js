import { createRef } from "react";

export const navigationRef = createRef();

/**
 * This function will navigate to any screen
 * @param {string} name Name of the screen to navigate to
 * @param {Object} params Params to pass to the screen
 */
export function navigate(name, params) {
  navigationRef.current?.navigate(name, params);
}
