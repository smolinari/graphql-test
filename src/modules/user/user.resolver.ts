import { Resolver } from 'type-graphql'

import User from './user.type'
import { BaseResolver } from '../../base-resolver/base.resolver'
import { Users } from '../../seeds/user.seed'
import { Injectable } from '@graphql-modules/di';

@Injectable()
@Resolver(_of => User)
export default class UserResolver extends BaseResolver(User, Users) {


}
