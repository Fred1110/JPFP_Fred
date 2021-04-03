import axios from 'axios';
import {GET_CAMPUSES, CREATE_CAMPUS, DESTROY_CAMPUS, UPDATE_CAMPUS, GET_STUDENTS, CREATE_STUDENT, DESTROY_STUDENT, UPDATE_STUDENT, UNREGISTER_STUDENT} from './constants'

//action creator
export const _getCampuses = (campuses) => {
  return {
    type: GET_CAMPUSES,
    campuses
  }
};

export const _createCampus = (campus) => {
  return {
    type: CREATE_CAMPUS,
    campus
  }
};

export const _destroyCampus = (campus) => {
  return {
    type: DESTROY_CAMPUS,
    campus
  }
};

export const _updateCampus = (campus) => {
  return {
    type: UPDATE_CAMPUS,
    campus
  }
};

export const _getStudents = (students) => {
  return {
    type: GET_STUDENTS,
    students
  }
};

export const _createStudent = (student) => {
  return {
    type: CREATE_STUDENT,
    student
  }
};

export const _destroyStudent = (student) => {
  return {
    type: DESTROY_STUDENT,
    student
  }
};

export const _updateStudent = (student) => {
  return {
    type: UPDATE_STUDENT,
    student
  }
};

export const _unregisterStudent = (student) => {
  return {
    type: UNREGISTER_STUDENT,
    student
  }
}
