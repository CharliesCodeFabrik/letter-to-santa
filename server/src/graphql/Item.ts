import e from "cors";
import { extendType, intArg, nonNull, objectType, stringArg, idArg } from "nexus";


/*Item*/

export let Item = objectType({
    name: "Item", // 1 
    definition(t) {  // 2
        t.nonNull.int("id"); // 3 
        t.nonNull.string("description"); // 4
        t.nonNull.string("location"); // 5 
        t.field("userId", {   // 1
            type: "User",
            resolve(parent, args, context) {  // 2
                return context.prisma.item
                    .findUnique({ where: { id: parent.id } })
                    .user();
            },
        });
        t.field("listId", {   // 1
            type: "List",
            resolve(parent, args, context) {  // 2
                return context.prisma.item
                    .findUnique({ where: { id: parent.id } })
                    .list();
            },
        });
    },
});



export const LettersQuery = extendType({  // 2
    type: "Query",
    definition(t) {
        t.nonNull.list.nonNull.field("feed", {   // 3
            type: "Item",
            resolve(parent, args, context, info) {    // 4
                const { userId } = context;

                if (!userId) {  // 1
                    throw new Error("Cannot post without logging in.");
                }
                return context.prisma.item.findMany({where:{userId: userId}});
            },
        });
    },
});


export const LetterQuery = extendType({  // 2
    type: "Query",
    definition(t) {
        t.field("item", {   // 3
            type: "Item",
            args: {
                id: nonNull(intArg())
            },
            resolve(parent, args, context, info) {    // 4
                return context.prisma.item.findUnique({
                    where: { id: args.id},
                })
            },
        });
    },
});




export const LinkMutation = extendType({  // 1
    type: "Mutation",    
    definition(t) {
        t.nonNull.field("post", {  // 2
            type: "Item",  
            args: {   // 3
                description: nonNull(stringArg()),
                location: nonNull(stringArg()),
            },
            async resolve(parent, args, context) {    
                const { description, location} = args;  // 4
                const { userId } = context;

                if (!userId) {  // 1
                    throw new Error("Cannot post without logging in.");
                }

                const newItem = context.prisma.item.create({
                    data: {
                        description,
                        location,
                        user: { connect: { id: userId } },  // 2
                    },
                });

                return newItem;
            },
        });
    },
});





export const LetterDeleteMutation = extendType({  // 1
    type: "Mutation",    
    definition(t) {
        t.nonNull.field("delete", {  // 2
            type: "Item",  
            args: {   // 3
                id: nonNull(intArg()),
            },
            
            async resolve(parent, args, context) {    
                const { id } = args;  // 4
                
                return context.prisma.item.delete({
                    where: { id: id},
                  })
            },
        });
    },
});



