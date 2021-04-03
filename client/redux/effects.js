import axios from 'axios';
import {_getCampuses, _createCampus, _destroyCampus, _updateCampus, _getStudents, _createStudent, _destroyStudent, _updateStudent, _unregisterStudent} from './actions'

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

const unregisterStudent = (id) => {
  return async(dispatch) => {
    const unregistered = (await axios.put(`/api/students/${id}`, {campusId: null})).data;
    dispatch(_unregisterStudent(unregistered));
  }
};


const destroyStudent = (student, history) => {
  return async(dispatch) => {
    await axios.delete(`/api/students/${student.id}`)
    dispatch(_destroyStudent(student));
    history.push('/students')
  }
}

export {getCampuses, createCampus, updateCampus, destroyCampus, getStudents, createStudent, updateStudent, unregisterStudent, destroyStudent};
