import { ObjectType, Field } from 'type-graphql'

import Recipe from './recipe.type'

@ObjectType()
export default class User {
  id: number

  @Field(_type => [Recipe])
  recipes: Recipe[]
}
