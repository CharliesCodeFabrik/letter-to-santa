import { extendType, intArg, nonNull, objectType, stringArg, idArg } from "nexus";

export let List = objectType({
    name: "List", // 1 
    definition(t) {  // 2
        t.nonNull.int("id"); // 3 
        t.nonNull.string("name"); // 4
        t.nonNull.list.nonNull.field("items", {    // 1
            type: "Item",
            resolve(parent, args, context) {   // 2
                return context.prisma.list  // 3
                    .findUnique({ where: { id: parent.id } })
                    .items();
            },
        });
        t.nonNull.list.nonNull.field("users", {    // 1
            type: "User",
            resolve(parent, args, context) {   // 2
                return context.prisma.list  // 3
                    .findUnique({ where: { id: parent.id } })
                    .users();
            },
        });
    },
});