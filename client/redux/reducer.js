import { combineReducers } from 'redux';
import {GET_CAMPUSES, CREATE_CAMPUS, DESTROY_CAMPUS, UPDATE_CAMPUS, GET_STUDENTS, CREATE_STUDENT, DESTROY_STUDENT, UPDATE_STUDENT, UNREGISTER_STUDENT} from './constants'

const campusesReducer = (state=[], action) => {
  switch(action.type){
    case GET_CAMPUSES:
      return action.campuses;
    case CREATE_CAMPUS:
      return [...state, action.campus];
    case UPDATE_CAMPUS:
      return state.map(campus => campus.id !== action.campus.id ? campus: action.campus);
    case DESTROY_CAMPUS:
      return state.filter(campus => campus.id !== action.campus.id);
    default:
      return state;
  }
};

const studentsReducer = (state = [], action) => {
  switch(action.type){
    case GET_STUDENTS:
      return action.students;
    case CREATE_STUDENT:
      return [...state, action.student];
    case UPDATE_STUDENT:
      case UNREGISTER_STUDENT:
      return state.map(student => student.id !== action.student.id ? student: action.student);
    case DESTROY_STUDENT:
      return state.filter(student => student.id !== action.student.id);
    default:
      return state;
  }
};

//combine reducers
const reducer = combineReducers({
  campuses: campusesReducer,
  students: studentsReducer,
});

export default reducer;
