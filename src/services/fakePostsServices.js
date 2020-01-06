const posts = [{
        id: 1,
        type: "Article",
        title: "Clita elitr sit no et nonumy, et sed et invidunt."
    },
    {
        id: 2,
        type: "Gif",
        title: "A mint kettős vadállat kapjatok ti a fáj ki száj."
    },
    {
        id: 3,
        type: "Article",
        title: "Elekti maro la ili ian ni por mi. Gxiavoje nin."
    },
    {
        id: 4,
        type: "Gif",
        title: "Que la signos de veces paso lo de ligeros pensamiento."
    }
]


export function getPosts() {
    return posts;
}
export function getPost(id) {
    return posts.find(m => m.id === id);
}