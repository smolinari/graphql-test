import { Field, ObjectType } from 'type-graphql'

import User from './user.type'

@ObjectType()
export default class Recipe {
  authorId: number

  @Field()
  author: User
}
