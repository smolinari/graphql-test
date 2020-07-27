import { Resolver, FieldResolver, Root } from 'type-graphql'

import User from './user.type'
import { BaseResolver } from '../../base-resolver/base.resolver';
import Recipe from './recipe.type'
import { Recipes } from '../../seeds/recipe.seed';
import { Injectable } from '@graphql-modules/di';

@Injectable()
@Resolver(of => User)
export default class UserResolver extends BaseResolver(Recipe, Recipes){

  @FieldResolver()
  recipes(@Root() user: User) {
    return this.resourceService.getAllWithId(user.id)
  }
}
