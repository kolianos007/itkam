export const required = (values) => {
    if(values) return undefined
    return 'This field is required'
}

export const maxLengthCreator = (maxLength) => {
    return (values) => {
        if(values.length > maxLength) return 'Max length 10 ssymbols'
        return undefined
    }
}