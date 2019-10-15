import { SELECT_SUBREDDIT, INVALIDATE_SUBREDDIT, REQUEST_POSTS, RECEIVE_POSTS} from '../actions/actionsTypes';

//Triggered when user selects a subreddit
export function selectSubreddit(subreddit) {
    return {
        type: SELECT_SUBREDDIT,
        subreddit
    };
};

//Triggered when user presses the refresh button
export function invalidateSubreddit(subreddit) {
    return {
        type: INVALIDATE_SUBREDDIT,
        subreddit
    }
}

//Triggered when user requests posts from the selected Subreddit
export function requestPosts(subreddit) {
    return {
        type: REQUEST_POSTS,
        subreddit
    }
}

//Triggered when receiving posts 
export function receivePosts(subreddit, json) {
    return {
        type: RECEIVE_POSTS,
        subreddit,
        posts: json.data.children.map(child => child.data),
        receivedAt: Date.now()
    }
}


export function fetchPosts(subreddit) {
    return function(dispatch) {
        dispatch(requestPosts(subreddit));

        return fetch(`https://www.reddit.com/r/${subreddit}.json`)
                .then(
                    response => response.json(),
                    error => console.log('An error occured.', error)
                )
                .then(json => dispatch(receivePosts(subreddit, json)))
    }
}