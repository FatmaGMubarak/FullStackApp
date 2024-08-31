import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';
import GetData from '../hooks/GetData';
import axios from 'axios';
import { useState } from 'react';

export default function ViewUserPage() {
  const params = useParams();
  const [data, loading] = GetData(`http://localhost:5000/${params.id}`);
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/${params.id}`);
      navigate('/');
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };


  const handleUpdate = async () => {
    navigate(`/edit/${params.id}`);
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <h1 className='text-4xl mb-2'>{data[0]?.name}</h1>
          <h1 className='text-2xl'>{data[0]?.email}</h1>
          <button 
            className='bg-red-500 p-2 rounded-sm text-white'
            onClick={handleDelete}
          >
            Delete
          </button>
          <button 
            className='bg-blue-500 p-2 rounded-sm text-white m-3'
            onClick={handleUpdate}
          >
            Edit
          </button>
        </div>
      )}
    </>
  );
}
