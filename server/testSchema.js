export default `
type Query {
  books(id: Int): [Book]
}

type Book {
  id: Int
  title: String
}
`;
