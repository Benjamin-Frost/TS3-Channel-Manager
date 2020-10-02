export function handleDefaultAxiosErrors(error) {
    if (error.response) {
        // The request was made, but the server answered with an error
        throw Error(error.response.data)
    }
    else if (error.request) {
        throw Error("The request was made, but no answer was received.")
    }
    else {
        throw Error("There was an error setting up the request.")
    }
}