import { makeSchema } from 'nexus';
import { join } from 'path';
import * as types from "./graphql";

export const schema = makeSchema({
  types, // 1
  outputs: { // 2
    typegen: join(process.cwd(), "nexus-typegen.ts"), // 3
    schema: join(process.cwd(), "schema.graphql"),
  },
  contextType: {  
    module: join(process.cwd(), "./src/context.ts"),  // 1
    export: "Context",  // 2
},
})
