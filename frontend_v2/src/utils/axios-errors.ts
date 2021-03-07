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

export function handleDefaultAxiosErrors(error: AxiosError) {
  if (error.response) {
    // The request was made, but the server answered with an error
    const data = error.response.data;
    if (data.errors) {
      const errors = (data as ErrorResponse).errors.map(
        (error) => `${error.param}: ${error.msg}`
      );
      throw Error(errors.toString());
    } else {
      throw Error(data);
    }
  } else if (error.request) {
    throw Error('The request was made, but no answer was received.');
  } else {
    throw Error('There was an error setting up the request.');
  }
}
