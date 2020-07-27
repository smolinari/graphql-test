import { Resolver, Query, ArgsType, Field, Args, Int } from "type-graphql"
import { NodeInterface } from '../core/node.interface'
import { ResourceServiceFactory } from './ResourceService'
import { Users } from '../seeds/user.seed'
import { plainToClass } from 'class-transformer'
import User from '../modules/user/user.type'

@ArgsType()
class FindByIdArgs {
  @Field(() => String, { nullable: true })
  objId?: string

  @Field(() => String, { nullable: true })
  objName?: string

  @Field(() => Int)
  id: number
}


@Resolver()
export default class GetOneResolver {
  
  resourceServiceFactory = new ResourceServiceFactory()
  resourceService = this.resourceServiceFactory.create(Users as any)

  @Query(() => NodeInterface, { nullable: true })
  async getOne (@Args() { objId, objName, id }: FindByIdArgs) {
    console.log('Args: ', objId, objName, id )
    let user = this.resourceService.getOne(id)
    return plainToClass(User, user)
  }
}
