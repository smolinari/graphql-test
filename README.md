# gql-modules-test
A test to demonstrate something with graphql-modules

### Install

Run `yarn` to load dependencies

### Start server

Run `yarn start` to get the server running


### Notes for Michal

I'm using GraphQL-Modules in this example. However, due to a bug, I'm only processing the resolvers directly and not using the modules.  

The recipe resolver is using resolver inheritance with the `base.resolver`. The `base.resolver` is where I was attemptng to use mixins to create the "configurable" resolvers per object type. That didn't work (more than likely because I lack experience/ knowledge to get it done). 

I decided to go the "node interface" route. 

The `getOne` resolver uses the node interface. If you query as follows:

```
query{
  getOne(id: 1){
    __typename
    ... on User{
     id
     name
   }
  }
}
```

you get the empty object. 

The Args `objName` and `objId` (one or the other) are used to get the right "model" to do the database querying. They aren't needed obviously in this example. 

Interesting to note, different here is `__typename` returns "User", and not the inherited class of User, like in my realworld code. So, that means the inheritance part of my realworld code isn't the issue. Still, `__typename` should return the final type and not the inherited type. Maybe another bug? 
