import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [newStudent, setNewStudent] = useState({
    first_name: '',
    last_name: '',
    email: '',
    date_of_birth: '',
  });

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get('/api/students/');
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const handleAddStudent = async () => {
    try {
      await axios.post('/api/students/', newStudent);
      setIsAdding(false);
      setNewStudent({
        first_name: '',
        last_name: '',
        email: '',
        date_of_birth: '',
      });
      fetchStudents();  // Refresh the list
    } catch (error) {
      console.error('Error adding student:', error);
    }
  };

  const handleEditStudent = async () => {
    try {
      await axios.put(`/api/students/${selectedStudent.id}/`, selectedStudent);
      setIsEditing(false);
      setSelectedStudent(null);
      fetchStudents();  // Refresh the list
    } catch (error) {
      console.error('Error updating student:', error);
    }
  };

  const handleDeleteStudent = async (id) => {
    try {
      await axios.delete(`/api/students/${id}/`);
      fetchStudents();  // Refresh the list
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  const openEditModal = (student) => {
    setSelectedStudent(student);
    setIsEditing(true);
  };

  return (
    <div>
      <h1>Student List</h1>
      <button onClick={() => setIsAdding(true)}>Add Student</button>
      {isAdding && (
        <div className="modal">
          <h2>Add New Student</h2>
          <label>
            First Name:
            <input
              type="text"
              value={newStudent.first_name}
              onChange={(e) => setNewStudent({ ...newStudent, first_name: e.target.value })}
            />
          </label>
          <label>
            Last Name:
            <input
              type="text"
              value={newStudent.last_name}
              onChange={(e) => setNewStudent({ ...newStudent, last_name: e.target.value })}
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              value={newStudent.email}
              onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
            />
          </label>
          <label>
            Date of Birth:
            <input
              type="date"
              value={newStudent.date_of_birth}
              onChange={(e) => setNewStudent({ ...newStudent, date_of_birth: e.target.value })}
            />
          </label>
          <button onClick={handleAddStudent}>Submit</button>
          <button onClick={() => setIsAdding(false)}>Cancel</button>
        </div>
      )}
      {isEditing && selectedStudent && (
        <div className="modal">
          <h2>Edit Student</h2>
          <label>
            First Name:
            <input
              type="text"
              value={selectedStudent.first_name}
              onChange={(e) => setSelectedStudent({ ...selectedStudent, first_name: e.target.value })}
            />
          </label>
          <label>
            Last Name:
            <input
              type="text"
              value={selectedStudent.last_name}
              onChange={(e) => setSelectedStudent({ ...selectedStudent, last_name: e.target.value })}
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              value={selectedStudent.email}
              onChange={(e) => setSelectedStudent({ ...selectedStudent, email: e.target.value })}
            />
          </label>
          <label>
            Date of Birth:
            <input
              type="date"
              value={selectedStudent.date_of_birth}
              onChange={(e) => setSelectedStudent({ ...selectedStudent, date_of_birth: e.target.value })}
            />
          </label>
          <button onClick={handleEditStudent}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      )}
      <ul>
        {students.map(student => (
          <li key={student.id}>
            <Link to={`/students/${student.id}`}>
              {student.first_name} {student.last_name}
            </Link>
            <button onClick={() => openEditModal(student)}>Edit</button>
            <button onClick={() => handleDeleteStudent(student.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentList;
