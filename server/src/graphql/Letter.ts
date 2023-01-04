//import { Letter } from "@prisma/client";
//import { extendType, nonNull, stringArg, intArg, objectType } from "nexus";
import e from "cors";
import { extendType, intArg, nonNull, objectType, stringArg,idArg } from "nexus";

export let Letter = objectType({
    name: "Letter", // 1 
    definition(t) {  // 2
        t.nonNull.int("id"); // 3 
        t.nonNull.string("description"); // 4
        t.nonNull.string("url"); // 5 
    },
});



export const LettersQuery = extendType({  // 2
    type: "Query",
    definition(t) {
        t.nonNull.list.nonNull.field("feed", {   // 3
            type: "Letter",
            resolve(parent, args, context, info) {    // 4
                return context.prisma.letter.findMany();
            },
        });
    },
});


export const LetterQuery = extendType({  // 2
    type: "Query",
    definition(t) {
        t.field("letter", {   // 3
            type: "Letter",
            args: {
                id: nonNull(intArg())
            },
            resolve(parent, args, context, info) {    // 4
                return context.prisma.letter.findUnique({
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
            type: "Letter",  
            args: {   // 3
                description: nonNull(stringArg()),
                url: nonNull(stringArg()),
            },
            
            async resolve(parent, args, context) {    
                const { description, url } = args;  // 4
                
                return context.prisma.letter.create({
                    data: {
                        description: description,
                        url: url,
                    }
                });
            },
        });
    },
});


/*
export const UpdateLinkMutation = extendType({  // 1
    type: "Mutation",    
    definition(t) {
        t.nonNull.field("changeLetter", {  // 2
            type: "Letter",  
            args: {   // 3
                id: nonNull(intArg()),
                description: nonNull(stringArg()),
                url: nonNull(stringArg()),
            },
            
            resolve(parent, args, context) { // 4
                return context.prisma.letter.findUnique({
                    where{
                        
                }})
            
            },
        });
    },
});
*/

export const LetterDeleteMutation = extendType({  // 1
    type: "Mutation",    
    definition(t) {
        t.nonNull.field("delete", {  // 2
            type: "Letter",  
            args: {   // 3
                id: nonNull(intArg()),
            },
            
            async resolve(parent, args, context) {    
                const { id } = args;  // 4
                
                return context.prisma.letter.delete({
                    where: { id: id},
                  })
            },
        });
    },
});