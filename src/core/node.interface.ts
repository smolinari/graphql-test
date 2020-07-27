import { InterfaceType, Field, Int } from 'type-graphql'

@InterfaceType()
export abstract class NodeInterface {
  @Field(_type => Int)
  id: number
}
