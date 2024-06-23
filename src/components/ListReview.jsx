import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import { FaTrash } from 'react-icons/fa';

const ListReview = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await fetch('http://localhost:5000/reviews');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setReviews(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Apakah Anda yakin ingin menghapus review ini?');
    if (confirmDelete) {
      try {
        const response = await fetch(`http://localhost:5000/reviews/${id}`, {
          method: 'DELETE'
        });

        if (response.ok) {
          fetchReviews(); // Memanggil ulang fetchReviews untuk memperbarui daftar setelah penghapusan
          window.alert('Review berhasil dihapus');
        } else {
          console.error('Error deleting review:', response.statusText);
        }
      } catch (error) {
        console.error('Error deleting review:', error);
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="dashboard flex">
      <Sidebar />
      <div className="list-review flex-1 p-4">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-bold">List Review</h2>
        </div>
        <table className="table-auto w-full shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className='text-center'>Email</th>
              <th className='text-center'>Komentar</th>
              <th className='text-center'>Tanggal Komentar</th>
              <th className='text-center'>Action</th>
            </tr>
          </thead>
          <tbody>
            {reviews.length > 0 ? (
              reviews.map(review => (
                <tr key={review.id_komentar}>
                  <td className='text-center'>{review.email}</td>
                  <td className='text-center'>{review.komentar}</td>
                  <td className='text-center'>{review.tanggal_komentar}</td>
                  <td className='text-center'>
                    <button onClick={() => handleDelete(review.id_komentar)} className="text-red-500 hover:text-red-700"><FaTrash /></button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">No reviews available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListReview;
