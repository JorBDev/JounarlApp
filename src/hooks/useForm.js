import { useEffect, useMemo, useState } from "react"

export const useForm = (initialForm = {}, formValidations = {}) => {


    const [formState, setFormState] = useState(initialForm);
    const [formValidation, setFormValidation] = useState({})

    useEffect(() => {
        setFormState(initialForm);
    }, [initialForm])

    const onFormValidation = () => {
        const formCkeckedValues = {}
        for (let key in formValidations) {
            const [fn, errorMessage] = formValidations[key];
            formCkeckedValues[`${key}Valid`] = fn(formState[key]) ? null : errorMessage;
        }
        setFormValidation(formCkeckedValues);
        return formCkeckedValues;
    }

    const isFormValid = () => {
        const formValidation = onFormValidation();// obtengo el estado de la validacion antes de que se vuelva a renderizar, de lo contrario siempre estaria un paso atras
        return Object.values(formValidation).every(v => v === null);
    }


    const onInputChange = ({ target: { name, value } }) => {
        console.log(name, value)
        setFormState({ ...formState, [name]: value });
    }

    const onResetForm = () => setFormState(initialForm);

    return {
        ...formState,
        formState,
        setFormState,
        onInputChange,
        onResetForm,

        ...formValidation,
        isFormValid,
    }
}
