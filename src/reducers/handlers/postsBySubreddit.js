import { INVALIDATE_SUBREDDIT, REQUEST_POSTS, RECEIVE_POSTS } from '../../actions/actionsTypes';

const posts = (state = {
    isFetching: false,
    didInvalidate: false,
    items: []
}, action) => {
    console.log('the action', action);
    switch(action.type) {
        case INVALIDATE_SUBREDDIT:
            return {
                ...state,
                didInvalidate: true
            };
        case REQUEST_POSTS: 
            return {
                ...state,
                isFetching: true,
                didInvalidate: false
            };
        case RECEIVE_POSTS: 
            return {
                ...state,
                isFetching: false,
                didInvalidate: false,
                items: action.posts,
                lastUpdate: action.receivedAt,
            }
        default:
            return state;
    }
}

export function postsBySubreddit(state = {}, action) {
    switch(action.type) {
        case RECEIVE_POSTS:
        case REQUEST_POSTS: 
            return {
                ...state,
                [action.subreddit]: posts(state[action.subreddit], action)
            }
        default:
            return state;
    }
}