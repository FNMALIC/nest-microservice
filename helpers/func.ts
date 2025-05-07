import {firstValueFrom} from "rxjs";
import {HttpException, HttpStatus} from "@nestjs/common";
import {ClientProxy} from "@nestjs/microservices";

export const serializer = (obj: any) => {
  if (!!obj)
    return JSON.parse(JSON.stringify(obj));
  return obj;
};
export const callbackFolder = (err) => {
  if (err)
    console.log(err);
};

export const ErrorInterceptor = async (f) => {
  try {
    await f()
  } catch (e) {
    console.log(e)
    throw new HttpException(
      {
        message: 'Internal Server Error',
        details: e.message,
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}

export const receiver = async (yearClient: ClientProxy<Record<never, Function>, string>, action: string, params = '') => {
  return await firstValueFrom(yearClient.send({cmd: action}, params))
}

export const Ok_NoContent_Responder = (data, response) => {
  return data
    ? response.status(HttpStatus.OK).json(data)
    : response.status(HttpStatus.NO_CONTENT).json({
      message: 'no content',
    })
}