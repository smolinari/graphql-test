import { GraphQLModule } from '@graphql-modules/core'
import * as path from 'path'
import { buildSchemaSync } from 'type-graphql'

import RecipeResolver from './recipe.resolver'
import UserResolver from './user.resolver'
import { ResourceServiceFactory } from '../../base-resolver/ResourceService'
import Recipe from './recipe.type'

const resolvers = [RecipeResolver, UserResolver] as const

const schema = buildSchemaSync({
  resolvers,
  orphanedTypes: [Recipe],
  validate: false,
  container: ({ context }) => UserModule.injector.getSessionInjector(context),
  emitSchemaFile: path.resolve(__dirname, 'user-schema.gql')
})

const UserModule: any = new GraphQLModule({
  providers: [ResourceServiceFactory, ...resolvers],
  extraSchemas: [schema]
})

export default UserModule
