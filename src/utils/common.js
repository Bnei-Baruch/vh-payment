export const getQueryParams = (param) => {
    const params = new URLSearchParams(props.location.search);
    return params.get(param);
}