/* User */
import { extendType, intArg, nonNull, objectType, stringArg, idArg } from "nexus";


export let User = objectType({
    name: "User", // 1 
    definition(t) {  // 2
        t.nonNull.int("id"); // 3 
        t.nonNull.string("username"); // 4
        t.nonNull.string("email"); // 5 
        t.nonNull.string("password");
        t.nonNull.list.nonNull.field("letters", {    // 1
            type: "Letter",
            resolve(parent, args, context) {   // 2
                return context.prisma.user  // 3
                    .findUnique({ where: { id: parent.id } })
                    .letters();
            },
        });
    },
});


export const UserSignUp = extendType({  // 1
    type: "Mutation",    
    definition(t) {
        t.nonNull.field("signup", {  // 2
            type: "User",  
            args: {   // 3
                username: nonNull(stringArg()),
                email: nonNull(stringArg()),
                password: nonNull(stringArg()),
            },
            
            async resolve(parent, args, context) {    
                const { username, email, password} = args;  // 4
                
                return context.prisma.user.create({
                    data: {
                        username: username,
                        email: email,
                        password: password,
                    }
                });
            },
        });
    },
});


export const UserDeleteMutation = extendType({  // 1
    type: "Mutation",    
    definition(t) {
        t.nonNull.field("deleteUser", {  // 2
            type: "User",  
            args: {   // 3
                id: nonNull(intArg()),
            },
            
            async resolve(parent, args, context) {    
                const { id } = args;  // 4
                
                return context.prisma.user.delete({
                    where: { id: id},
                  })
            },
        });
    },
});
