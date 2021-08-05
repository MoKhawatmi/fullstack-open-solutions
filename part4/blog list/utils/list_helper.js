function totalLikes(blogs) {
    let total = 0;
    blogs.forEach(blog => {
        total += blog.likes;
    })
    return total;
}

function favoriteBlog(blogs) {
    let sortedBlogs = JSON.parse(JSON.stringify(blogs)).sort((a, b) => {
        return a.likes >= b.likes ? -1 : 1;
    })
    return sortedBlogs[0];
}

module.exports = { totalLikes, favoriteBlog };