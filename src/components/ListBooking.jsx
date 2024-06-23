import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import { FaTrash } from 'react-icons/fa';
import Modal from 'react-modal'; // Added for modal

const ListBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await fetch('http://localhost:5000/bookings');
      const data = await response.json();
      setBookings(data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Apakah Anda yakin ingin menghapus booking ini?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:5000/bookings/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        fetchBookings();
      } else {
        console.error('Error deleting booking:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting booking:', error);
    }
  };

  const openModal = (image) => {
    setSelectedImage(image);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedImage('');
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-CA', options);
  };

  return (
    <div className="dashboard flex">
      <Sidebar />
      <div className="list-booking flex-1 p-4">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-bold">List Booking</h2>
        </div>
        <table className="table-auto w-full shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-center">Nomor Booking</th>
              <th className="text-center">Nomor Kamar</th>
              <th className="text-center">Check In</th>
              <th className="text-center">Check Out</th>
              <th className="text-center">Nama Tamu</th>
              <th className="text-center">Status Pembayaran</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map(booking => (
              <tr key={booking.id}>
                <td className="text-center">{booking.id}</td>
                <td className="text-center">{booking.roomNumber}</td>
                <td className="text-center">{formatDate(booking.checkIn)}</td>
                <td className="text-center">{formatDate(booking.checkOut)}</td>
                <td className="text-center">{booking.guests}</td>
                <td className="flex justify-center">
                  <img 
                    src={`http://localhost:5000/uploads/${booking.paymentStatus}`}
                    alt="Status Pembayaran" 
                    onClick={() => openModal(`http://localhost:5000/uploads/${booking.paymentStatus}`)}
                    style={{ cursor: 'pointer', width: '50px' }} 
                  />
                </td>
                <td className="text-center">
                  <button onClick={() => handleDelete(booking.id)}><FaTrash /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Gambar Status Pembayaran"
        >
          <button onClick={closeModal}>Close</button>
          <img src={selectedImage} alt="Status Pembayaran" style={{ width: '100%' }} />
        </Modal>
      </div>
    </div>
  );
};

export default ListBooking;
