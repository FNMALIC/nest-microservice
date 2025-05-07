// app.controller.ts (Gateway)
import {Controller} from '@nestjs/common';
import {ApiExcludeController} from "@nestjs/swagger";
import {clientProxy} from "../../../helpers/func";

@ApiExcludeController()
@Controller()
export class AppController {
  constructor() {
  }
}