export default () => ({
    queries: {
        login: {
            type: 'String',
            args: {
                username: 'String',
            },
            resolve: async ({
                args,
                composers: {
                    User
                },
                context: {
                    authentication
                }
            }) => {
                let user = await User.get({
                    username: args.username
                })

                if (!user) {
                    const created = await User.create({
                        username: args.username
                    })

                    user = created.record
                }

                return authentication.create({
                    _id: user._id
                }, )
            },
        },
    },
})