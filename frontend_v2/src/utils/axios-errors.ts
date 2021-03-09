import { AxiosError } from 'axios';

type ErrorResponse = {
  errors: [ErrorChild];
};

interface ErrorChild {
  value: string;
  msg: string;
  param: string;
  location: string;
}

export function axiosErrorToString(error: AxiosError): string {
  if (error.response) {
    // The request was made, but the server answered with an error
    const data = error.response.data;
    if (data.errors) {
      const errors = (data as ErrorResponse).errors.map(
        (error) => `${error.param}: ${error.msg}`
      );
      errors.toString();
    } else {
      return data;
    }
  } else if (error.request) {
    return 'The request was made, but no answer was received';
  }
  return 'There was an error setting up the request';
}
