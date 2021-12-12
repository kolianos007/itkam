export type FieldValidatorType = (value: string) => string | undefined

export const required: FieldValidatorType = (values) => {
    if(values) return undefined
    return 'This field is required'
}

export const maxLengthCreator = (maxLength: number): FieldValidatorType => {
    return (values) => {
        if(values.length > maxLength) return 'Max length 10 symbols'
        return undefined
    }
}