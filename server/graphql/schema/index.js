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

  input ClipInput {
    title: String,
    creator: String,
    broadcaster: String
    game: String
    startDate: String
    endDate: String
    sort: String
    page: String
  }

  type RootQuery {
    clips(clipInput: ClipInput): Clips!
  }

  schema {
    query: RootQuery
  }
`)
