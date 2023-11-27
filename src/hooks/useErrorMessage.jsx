import { useEffect, useState } from "react";


/**
 * Custom hook that handles displaying an error message for a specified duration.
 * @param {string} errorMessage - The error message to be displayed.
 * @returns {boolean} - Indicates whether the error message should be shown or not.
 */
export const useErrorMessage = (errorMessage) => {
    const [showMessageError, setShowMessageError] = useState(false);
    // const [isFirstRender, setIsFirstRender] = useState(true)

    useEffect(() => {
        /* if (isFirstRender) {
            setIsFirstRender(false);
            return;
        } */

        if (!!errorMessage) {
            setShowMessageError(true);
            setTimeout(() => {
                setShowMessageError(false);
            }, 5000);
        }
    }, [errorMessage]);

    return showMessageError;
}
