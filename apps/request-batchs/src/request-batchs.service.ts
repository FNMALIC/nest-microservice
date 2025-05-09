import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import * as process from 'node:process';
import { serializer } from 'helpers/func';
import { RequestBatches } from 'models/request-batchs';
import { RequestStepBatches } from 'models/request-step-batchs';
import { Requests } from 'models/requests';

@Injectable()
export class RequestBatchsService {
  constructor(
    @InjectModel(RequestBatches)
    private reqBatchModel: typeof RequestBatches,
    @InjectModel(RequestStepBatches)
    private reqStepBatchModel: typeof RequestStepBatches,
    @InjectModel(Requests)
    private requestModel: typeof Requests,
  ) {
  }

  async getBatches(params) {
    try {
      const result = await this.reqBatchModel.findAll({
        where: {
          [Op.or]: {
            DEST_ID: {
              [Op.like]: params.DEST_ID === 'ADM' ? '%%' : params.DEST_ID,
            },
            SENDER_ID: {
              [Op.like]: params.DEST_ID === 'ADM' ? '%%' : params.DEST_ID,
            },
          },
        },
        order: [
          ['createdAt', 'DESC'],
        ],
      });

      if (result)
        return JSON.parse(JSON.stringify(result)).map((b) => ({
          ...b,
          TRANSMITTED: b.TRANSMITTED ? 'YES' : 'NO',
        }));
      else {
        return { message: 'Unable to execute the query' };
      }
    } catch (e) {
      console.log(e);
      return e;
    }
  }

  async confirmBatchReception(data) {
    const result = await this.reqBatchModel.update(
      {
        RBATCH_UNREAD: false,
      },
      { where: { RBATCH_ID: data.reference } },
    );
    return result ? result : null;
  }

  async transmit(params) {
    try {
      const data = params;
      const result = await this.reqBatchModel.update(
        {
          TRANSMITTED: true,
        },
        { where: { id: { [Op.in]: data.batchesId } } },
      );

      if (result) return result;
      else {
        return { message: 'Unable to execute the query' };
      }
    } catch (e) {
      return e;
    }
  }

  async createBatch(params) {
    const data = params;
    let query = `DECLARE @result NVARCHAR(255) EXEC [dbo].[INSERTION_REQUEST_BATCH] '${data.array.join(';')}', '${data.group}', '${data.sender}','${process.env.YEAR}',   @result OUTPUT SELECT @result as REFERENCE`;
    const result = await this.reqBatchModel.sequelize?.query(query);
    if (result[0][0]) {
      return result[0][0];
    } else return null;
  }

  async delete(id) {
    let batch = serializer(await this.reqBatchModel.findOne({ where: { RBATCH_ID: id } }));
    let requests = serializer(await this.reqStepBatchModel.findAll({ where: { RBATCH_ID: batch?.RBATCH_ID || '' } }));
    await this.reqBatchModel.destroy({ where: { RBATCH_ID: id } });
    await this.reqStepBatchModel.destroy({ where: { RBATCH_ID: batch?.RBATCH_ID || '' } });
    let result = await this.requestModel.update({
      REQUEST_UNITY_TRANSMISSIBLE: true,
      REQUEST_UNITY_ID: batch?.SENDER_ID || '',
    }, {
      where: {
        REQUEST_ID: { [Op.in]: requests.map(r => r.REQUEST_ID) },
        REQUEST_UNITY_ID: { [Op.not]: 'EMPLOYEE' },
      },
    });
    return result;
  }
}
