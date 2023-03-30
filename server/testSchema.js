import gql from "graphql-tag";
export default gql`
  type Query {
    books(id: Int): [Book]
  }

  type Book {
    id: Int
    title: String
  }
`;
