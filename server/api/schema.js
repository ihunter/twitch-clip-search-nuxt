import { schema } from "#graphql/schema";

export default defineEventHandler(() => JSON.stringify(JSON.parse(schema)));
