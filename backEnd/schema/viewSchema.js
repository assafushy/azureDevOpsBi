const graphql = require('graphql');
const {GraphQLObjectType,GraphQLInt,GraphQLString} = graphql;

const view = new GraphQLObjectType({
  name:'View',
  fields:()=>({
    id:{type:GraphQLInt},
    viewTitle:{type:GraphQLString}
  })
});