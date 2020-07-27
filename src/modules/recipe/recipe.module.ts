import { GraphQLModule } from '@graphql-modules/core'
import * as path from 'path'
import { buildSchemaSync } from 'type-graphql'

import RecipeResolver from './recipe.resolver'
import UserResolver from './user.resolver'
import User from './user.type'
import { ResourceServiceFactory } from '../../base-resolver/ResourceService'

const resolvers = [RecipeResolver, UserResolver] as const

const RecipeModule: any = new GraphQLModule({
  providers: [ResourceServiceFactory, ...resolvers],
  extraSchemas: [
    buildSchemaSync({
      resolvers,
      orphanedTypes: [User],
      skipCheck: true,
      validate: false,
      container: ({ context }) => RecipeModule.injector.getSessionInjector(context),
      emitSchemaFile: path.resolve(__dirname, 'recipe.schema.gql'),
    })
  ]
})

export default RecipeModule
