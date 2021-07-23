const { buildSchema } = require('graphql')

module.exports = buildSchema(`
  type Broadcaster {
    id: String!
    login: String!
    display_name: String!
    type: String!
    broadcaster_type: String!
    description: String!
    profile_image_url: String!
    offline_image_url: String!
    view_count: Int!
  }

  type Clip {
    _id: ID!
    url: String!
    broadcaster_id: String!
    broadcaster_name: String!
    creator_id: String!
    creator_name: String!
    video_id: String!
    game_id: String!
    game: Game
    language: String
    title: String!
    view_count: Int!
    created_at: String!
    thumbnail_url: String!
  }

  type Clips {
    clips: [Clip!]!
    count: Int!
  }

  type Game {
    _id: ID!
    id: String!
    name: String!
    box_art_url: String!
    clip: Clip
  }

  input ClipInput {
    title: String,
    creator: String,
    broadcaster: String
    game: [String]
    language: String
    startDate: String
    endDate: String
    sort: Int
    page: Int
    limit: Int
  }

  input GameInput {
    broadcasterID: String
    name: String
    gameID: [String]
  }

  type RootQuery {
    allClips(query: ClipInput): Clips!
    allGames(query: GameInput): [Game]!
    allBroadcasters: [Broadcaster]!
  }

  schema {
    query: RootQuery
  }
`)
