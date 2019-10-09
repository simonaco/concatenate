const {graphql, buildSchema} = require("graphql")
const axios = require('axios')
const schema = buildSchema(`
    type Team {
        id: ID
        points: Int
        name: String
    }

    type Query {
        teams:[Team]
    }
`)

const resolvers = {
    teams: () => {
        return axios.get("https://graphqlvoting.azurewebsites.net/api/score").then(res => res.data)
    } 
}

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    
    const teams = await graphql(schema, req.body.query, resolvers)
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: teams
    };

    
};