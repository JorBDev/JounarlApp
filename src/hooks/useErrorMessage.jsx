import { useEffect, useState } from "react";


export const useErrorMessage = (errorMessage) => {
    const [showMessageError, setShowMessageError] = useState(false);
    const [isFirstRender, setIsFirstRender] = useState(true)

    useEffect(() => {
        if (isFirstRender) {
            setIsFirstRender(false);
            return;
        }

        if (!!errorMessage) {
            setShowMessageError(true);
            setTimeout(() => {
                setShowMessageError(false);
            }, 3000);
        }
    }, [errorMessage]);

    return showMessageError;
}
