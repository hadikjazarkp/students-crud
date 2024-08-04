// src/StudentDetails.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const StudentDetails = () => {
  const [student, setStudent] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetchStudentDetails();
  }, [id]);

  const fetchStudentDetails = async () => {
    try {
      const response = await axios.get(`/api/students/${id}/`);
      setStudent(response.data);
    } catch (error) {
      console.error('Error fetching student details:', error);
    }
  };

  if (!student) return <p>Loading...</p>;

  return (
    <div>
      <h1>Student Details</h1>
      <p><strong>First Name:</strong> {student.first_name}</p>
      <p><strong>Last Name:</strong> {student.last_name}</p>
      <p><strong>Email:</strong> {student.email}</p>
      <p><strong>Date of Birth:</strong> {student.date_of_birth}</p>
    </div>
  );
};

export default StudentDetails;
