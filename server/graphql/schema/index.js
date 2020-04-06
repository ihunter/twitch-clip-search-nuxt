const { buildSchema } = require('graphql')

module.exports = buildSchema(`
  type Clip {
    _id: ID!
    url: String!
    broadcaster_id: String!
    broadcaster_name: String!
    creator_id: String!
    creator_name: String!
    video_id: String!
    game_id: String!
    title: String!
    view_count: Int!
    created_at: String!
    thumbnail_url: String!
  }

  type Clips {
    clips: [Clip!]!
    count: Int!
  }

  type RootQuery {
    clips: Clips!
  }

  schema {
    query: RootQuery
  }
`)
