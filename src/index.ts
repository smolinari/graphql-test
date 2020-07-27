import 'reflect-metadata'
import { GraphQLModule } from '@graphql-modules/core'
import { ApolloServer } from 'apollo-server'
import * as path from 'path'
import { emitSchemaDefinitionFile, buildSchemaSync } from 'type-graphql'
import GetOneResolver from './base-resolver/getOne.resolver';
import RecipeResolver from './modules/recipe/recipe.resolver';
import { ResourceServiceFactory } from 'base-resolver/ResourceService'
import User from '@modules/user/user.type'

const resolvers = [GetOneResolver, RecipeResolver] as const

async function bootstrap() {
  // create main app module
  const { schema } = new GraphQLModule({
    providers: [ResourceServiceFactory, ...resolvers],
    extraSchemas: [
      buildSchemaSync({
        resolvers,
        orphanedTypes: [User],
        skipCheck: true,
        validate: false,
        emitSchemaFile: path.resolve(__dirname, 'recipe.schema.gql')
      })
    ]
  })

  // emit combined schema file
  await emitSchemaDefinitionFile(path.resolve(__dirname, '../', 'schema.gql'), schema)

  const server = new ApolloServer({
    schema,
    playground: true,
  })

  const { url } = await server.listen(4000)
  console.log(`Server is running, GraphQL Playground available at ${url}`)
}

bootstrap().catch(console.error)
