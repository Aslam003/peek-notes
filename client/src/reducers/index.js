import { combineReducers} from "redux";
import notesReducer from './notesReducer';

const rootReducers = combineReducers({
    notes: notesReducer
    
});

export default rootReducers;
