//import { Letter } from "@prisma/client";
//import { extendType, nonNull, stringArg, intArg, objectType } from "nexus";
import e from "cors";
import { extendType, intArg, nonNull, objectType, stringArg } from "nexus";

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
                
                let idCount = (await context.prisma.letter.findMany()).length + 1;  // 5
                
                return context.prisma.letter.create({
                    data: {
                        id: idCount,
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

/*
export const DeleteLetterMutation = extendType({  // 1
    type: "Mutation",    
    definition(t) {
        t.nonNull.field("deleteLetter", {  // 2
            type: "Letter",  
            args: {   // 3
                id: nonNull(intArg()),
            },
            
            resolve(parent, args, context) { // 4
                let letter = context.prisma.letter.findMany().find( (lett:Letter) => lett.id == args.id)
                let result : {description:string, id:number, url:string};
                if(letter){
                    result = {description:letter.description, id:letter.id, url:letter.url}
                    const id = context.prisma.letter.findMany().indexOf(letter).id;
                    context.prisma.letter.delete({
                        where: {
                            key: id,
                        }
                    });
                }
                else {
                    result = {description:"not Found", id:-1, url:"not Found"}
                }
                return result;
            },
        });
    },
});
*/