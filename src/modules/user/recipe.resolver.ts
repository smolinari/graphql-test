import { Injectable } from '@graphql-modules/di'
import { Resolver, FieldResolver, Root } from 'type-graphql'

import Recipe from './recipe.type'
import { BaseResolver } from '../../base-resolver/base.resolver';
import { Users } from '../../seeds/user.seed';
import User from '@modules/recipe/user.type'

@Injectable()
@Resolver(_of => Recipe)
export default class RecipeResolver extends BaseResolver(User, Users) {

  @FieldResolver()
  author(@Root() recipe: Recipe) {
    return this.resourceService.getOne(recipe.authorId)
  }
}
