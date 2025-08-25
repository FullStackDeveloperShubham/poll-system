import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from '@apollo/server/standalone';
// ! server configaration files 
import { resolvers } from "./resolvers/resolvers.js";
import { typeDefs } from "./typeDefs/typeDefs.js";
// ! mongodb 
import connectToDatabase from "./Database/db.connection.js";
await connectToDatabase();
// ! Init the server
const server = new ApolloServer({
    typeDefs,
    resolvers
});
const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 }
});
console.log(`${url}graphql`);
