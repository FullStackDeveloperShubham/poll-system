export const typeDefs = `#graphql
   type Poll {
      id:ID!
      question:String!
      answere:[String!]!
   }

   # mutation 
   input PollInput {
      question:String!
      answere:[String!]!
   }

   type Query {
      getAllPolls:[Poll!]!
      getPollById(id:ID!):Poll!
   }

   type Mutation {
      createPoll(input:PollInput):Poll
      deletePoll(id:ID!):Poll
   }
`;
