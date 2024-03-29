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
    creator_name: String!
    game_id: String!
    game: Game
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

  type Search {
    _id: ID!
    games: [Game]
    broadcaster_id: [String]
    creator_name: String
    game_id: [String]
    title: String
    createdAt: String
    startDate: String
    endDate: String
  }

  type Searches {
    searches: [Search]
    count: Int
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

  input SearchInput {
    title: String,
    creator: String
    game: String
    broadcaster: String
    startDate: String
    endDate: String
    sort: Int
    page: Int
    limit: Int
  }

  type RootQuery {
    allClips(query: ClipInput): Clips!
    allGames(query: GameInput): [Game]!
    allBroadcasters: [Broadcaster]!
    allSearches(query: SearchInput): Searches
  }

  schema {
    query: RootQuery
  }
`)
