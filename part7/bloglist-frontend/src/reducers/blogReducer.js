let initialState = [];

export function getBlogsAction(blogs) {
    return {
        type: "GET_BLOGS",
        data: {
            blogs
        }
    }
}

export function createBlogAction(newBlog) {
    return {
        type: "CREATE_BLOG",
        data: {
            newBlog
        }
    }
}

export function likeBlogAction(likedBlog) {
    return {
        type: "LIKE_BLOG",
        data: {
            likedBlog
        }
    }
}

export function deleteBlogAction(blogs) {
    return {
        type: "DELETE_BLOG",
        data: {
            blogs
        }
    }
}


function blogReducer(state = initialState, action) {
    let newState = state;
    switch (action.type) {
        case "GET_BLOGS":
            newState = action.data.blogs;
            return newState;
        case "CREATE_BLOG":
            newState = state.concat(action.data.newBlog);
            return newState;
        case "LIKE_BLOG":
            newState = state.map(blog => {
                return blog.blogID != action.data.likedBlog.blogID ? blog : action.data.likedBlog;
            })
            return newState;
        case "DELETE_BLOG":
            newState = action.data.blogs;
            return newState;
        default:
            return newState;
    }
}

export default blogReducer;