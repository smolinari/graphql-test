import { GraphQLModule } from '@graphql-modules/core'
import * as path from 'path'
import { buildSchemaSync } from 'type-graphql'
import { ResourceServiceFactory } from '../base-resolver/ResourceService'
import { GetOneResolver } from '../base-resolver/getOne.resolver'

const resolvers = [GetOneResolver] as const

const BaseResolverModule: any = new GraphQLModule({
  providers: [ResourceServiceFactory, ...resolvers],
  extraSchemas: [
    buildSchemaSync({
      resolvers,
      skipCheck: true,
      validate: false,
      container: ({ context }) =>
        BaseResolverModule.injector.getSessionInjector(context),
      emitSchemaFile: path.resolve(__dirname, 'base.resolver.schema.gql')
    })
  ]
})

export default BaseResolverModule

