export const userResolver = {
    Query: {
        users: () => [
            {id: 1, firstName: "ABC", lastName: "DEF", userName: "test", role: "admin"}
        ],
        user: (_: any, {id}: any) => ({id: 1, firstName: "ABC", lastName: "DEF", userName: "test", role: "admin"}),
    }
}
