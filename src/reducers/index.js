import { combineReducers } from 'redux';
import { postsBySubreddit } from './handlers/postsBySubreddit';
import { selectedSubreddit } from './handlers/selectedSubreddit';


const rootReducer = combineReducers({
    postsBySubreddit,
    selectedSubreddit
});

export default rootReducer;