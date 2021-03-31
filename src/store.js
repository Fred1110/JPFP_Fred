import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';
import { createDispatchHook } from 'react-redux';

//action types
const GET_CAMPUSES = 'GET_CAMPUSES';
const CREATE_CAMPUS = 'CREATE_CAMPUS';
const DESTROY_CAMPUS = 'DESTROY_CAMPUS';
const UPDATE_CAMPUS =  'UPDATE_CAMPUS';
const GET_STUDENTS = 'GET_STUDENTS';
const CREATE_STUDENT = 'CREATE_STUDENT';
const DESTROY_STUDENT = 'DESTROY_STUDENT';
const UPDATE_STUDENT = 'UPDATE_STUDENT';

//action creator
const _getCampuses = (campuses) => {
  return {
    type: GET_CAMPUSES,
    campuses
  }
};

const _createCampus = (campus) => {
  return {
    type: CREATE_CAMPUS,
    campus
  }
};

const _destroyCampus = (campus) => {
  return {
    type: DESTROY_CAMPUS,
    campus
  }
};

const _updateCampus = (campus) => {
  return {
    type: UPDATE_CAMPUS,
    campus
  }
};

const _getStudents = (students) => {
  return {
    type: GET_STUDENTS,
    students
  }
};

const _createStudent = (student) => {
  return {
    type: CREATE_STUDENT,
    student
  }
};

const _destroyStudent = (student) => {
  return {
    type: DESTROY_STUDENT,
    student
  }
};

const _updateStudent = (student) => {
  return {
    type: UPDATE_STUDENT,
    student
  }
};

const _unregisterStudent = (student) => {
  return {
    type: UNREGISTER_STUDENT,
    student
  }
}

//thunks
const getCampuses = () => {
  return async(dispatch) => {
    const campuses = (await axios.get('/api/campuses')).data;
    return dispatch(_getCampuses(campuses))
  }
};

const createCampus = (name, address, description, history) => {
  return async(dispatch) => {
    const campus = (await axios.post('/api/campuses', {name, address, description})).data;
    dispatch(_createCampus(campus));
    history.push(`/campuses/${campus.id}`)
  }
};

const updateCampus = (id, name, address, description, history) => {
  return async(dispatch) => {
    const campus = (await axios.put(`/api/campuses/${id}`, {name, address, description})).data;
    dispatch(_updateCampus(campus));
    history.push(`/campuses/${campus.id}`)
  }
}

const destroyCampus = (campus, history) => {
  return async(dispatch) => {
    await axios.delete(`/api/campuses/${campus.id}`);
    dispatch(_destroyCampus(campus));
    history.push('/campuses')
  }
}

const getStudents = () => {
  return async(dispatch) => {
    const students = (await axios.get('/api/students')).data;
    return dispatch(_getStudents(students))
  }
};

const createStudent = (firstName, lastName, email, gpa, history) => {
  return async(dispatch) => {
    const student= (await axios.post('/api/students', {firstName, lastName, email, gpa})).data;
    dispatch(_createStudent(student));
    history.push(`/students/${student.id}`)

  }
};


const updateStudent = (id, firstName, lastName, email, gpa, history) => {
  return async(dispatch) => {
    const student = (await axios.put(`/api/students/${id}`, {firstName, lastName, email, gpa})).data;
    dispatch(_updateStudent(student));
    history.push(`/students/${id}`)
  }
};




const destroyStudent = (student, history) => {
  return async(dispatch) => {
    await axios.delete(`/api/students/${student.id}`)
    dispatch(_destroyStudent(student));
    history.push('/students')
  }
}

//define state
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
})

//define store
const store = createStore(reducer, applyMiddleware(thunk));

export default store;
export {getCampuses, createCampus, updateCampus, destroyCampus, getStudents, createStudent, updateStudent, destroyStudent};
