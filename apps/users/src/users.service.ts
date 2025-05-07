import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Users } from '../../../models/users';
import { decrypt, encrypt } from '../../../helpers/cryptogram';
import { serializer } from '../../../helpers/func';
import {RequestGroups} from "../../../models/request-groups";
import {OrganizationGroups} from "../../../models/organization-groups";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users) private userModel: typeof Users,
    @InjectModel(RequestGroups) private requestGroupModel: typeof RequestGroups,
    @InjectModel(OrganizationGroups)
    private organizationModel: typeof OrganizationGroups,
  ) {
  }

  async create(data) {
    const hash = encrypt(data.privilege.join('-'));
    const result = await this.userModel.create({
      USERNAME: data.username,
      USERPRIVILEGE: hash.iv + '@' + hash.content,
      USERPROFILE: data.profile,
      REQUEST_GROUP_ID: data.group,
      ORGANIZATION_GROUP: data.orgaGroup,
      ACTIVATED: 1,
    });
    return result ? result : null;
  }

  async getUser(params) {
    this.userModel.belongsTo(this.requestGroupModel, {
      foreignKey: 'REQUEST_GROUP_ID',
      targetKey: 'REQUEST_GROUP_ID',
    });
    const result = await this.userModel.findOne({
      include: [{ model: this.requestGroupModel }],
      where: { id: params.id },
      raw: true,
    });
    return result
      ? {
        ...result,
        USERPRIVILEGE: decrypt({
          iv: result.USERPRIVILEGE.split('@')[0],
          content: result.USERPRIVILEGE.split('@')[1],
        }),
      }
      : null;
  }

  async gets() {
    this.userModel.belongsTo(this.requestGroupModel, {
      foreignKey: 'REQUEST_GROUP_ID',
      targetKey: 'REQUEST_GROUP_ID',
    });

    this.userModel.belongsTo(this.organizationModel, {
      foreignKey: 'ORGANIZATION_GROUP',
      targetKey: 'id',
    });

    const result = serializer(await this.userModel.findAll({
        include: [
          { model: this.requestGroupModel, as: 'RequestGroup' },
          { model: this.organizationModel, as: 'OrganizationGroup' },
        ],
        attributes: [
          'id',
          'USERNAME',
          'USERFULLNAME',
          'USERPROFILE',
          'ACTIVATED',
          'REQUEST_GROUP_ID',
          'ORGANIZATION_GROUP',
          'ORGANIZATION_EMAIL',
        ],
      }),
    );
    return result.length === 0 ? [] : result;
  }

  async update(data, id) {
    const result = await this.userModel.update(data, { where: { id } });
    return result ? result : null;
  }

  async isExist(data) {
    return (
      (await this.userModel.count({ where: { USERNAME: data.username } })) > 0
    );
  }
}
