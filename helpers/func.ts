import {firstValueFrom} from "rxjs";
import {HttpException, HttpStatus} from "@nestjs/common";
import {ClientProxy} from "@nestjs/microservices";
import * as fs from "fs";

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

export const receiver = async (clientP: ClientProxy<Record<never, Function>, string>, action: string, params: any = '') => {
  return await firstValueFrom(clientP.send({cmd: action}, params))
}

export const responder = (status, data: any = '') => {
  return {status, data}
}
export const Ok_Empty_Res = (data, response) => {
  return data
    ? response.status(HttpStatus.OK).json(data)
    : response.status(HttpStatus.NO_CONTENT).json({
      message: 'no content',
    })
}
export const Ok_Forbidden_Res = (data, response) => {
  return data
    ? response.status(HttpStatus.OK).json(data)
    : response.status(HttpStatus.FORBIDDEN)
}
export const Ok_Empty_Array_Res = (data, response) => {
  return data.length > 0
    ? response.status(HttpStatus.OK).json(data)
    : response.status(HttpStatus.NO_CONTENT).json({
      message: 'no content',
    })
}

export const clientProxy = () => {
  let data: any = {}
  fs.readdirSync('./apps', {withFileTypes: true})
    .filter(dirent => dirent.isDirectory() && dirent.name != 'api-gateway')
    .forEach((dir, i) => (
      data[dir.name] = 6000 + i
    ))
  return data;
}