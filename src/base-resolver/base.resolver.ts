import {
  Query,
  Arg,
  Int,
  Resolver,
  ArgsType,
  Field,
  Args,
  ClassType,
} from 'type-graphql'

import { Resource } from './resource'
import { ResourceServiceFactory } from './ResourceService'

@ArgsType()
export class GetAllArgs {
  @Field(_type => Int)
  skip: number = 0

  @Field(_type => Int)
  take: number = 10
} 

export function BaseResolver<TResource extends Resource> (
  ResourceCls: ClassType,
  resources: TResource[],
) {
  const factory = new ResourceServiceFactory()
  const resourceName = ResourceCls.name
  const resourceService = factory.create(resources)

  // `isAbstract` decorator option is mandatory to prevent multiple registering in schema
  @Resolver(_of => ResourceCls, { isAbstract: true })
  class ResourceResolverClass {
    resourceService: any
    constructor() {
      this.resourceService = resourceService
    }

    @Query(() => ResourceCls, { name: `getOne${resourceName}` })
    async getOne (@Arg('id', _type => Int) id: number) {
      console.log(id)
      console.log(resourceName)
      return resourceService.getOne(id)
    }

    @Query(_returns => [ResourceCls], { name: `getAll${resourceName}s` })
    protected async getAll (@Args() { skip, take }: GetAllArgs) {
      const all = resourceService.getAll(skip, take)
      return all
    }
  }
 
  return ResourceResolverClass
}
