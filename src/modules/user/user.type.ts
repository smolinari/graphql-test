import { ObjectType, Int, Field } from 'type-graphql'
import { NodeInterface } from '../../core/node.interface';

@ObjectType({implements: NodeInterface})
export default class User implements NodeInterface {

  @Field(_type => Int)
  id: number

  @Field()
  name: string

  @Field()
  email: string

  @Field(_type => Int)
  age: number
}
