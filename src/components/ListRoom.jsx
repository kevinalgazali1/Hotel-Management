import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar'; 
import { FaEdit, FaTrash } from 'react-icons/fa';

const ListRoom = () => {
  const [showForm, setShowForm] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [editData, setEditData] = useState({
    roomNumber: '',
    roomType: '',
    price: '',
    availability: '',
    maxPerson: '',
    image: null
  });
  const [formData, setFormData] = useState({
    roomNumber: '',
    roomType: '',
    price: '',
    availability: 'Available',
    maxPerson: '',
    image: null
  });

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const response = await fetch('http://localhost:5000/rooms');
      const data = await response.json();
      console.log(data);
      const sortedData = data.sort((a, b) => a.nomor_kamar - b.nomor_kamar);
      setRooms(sortedData);
    } catch (error) {
      console.error('Error fetching rooms:', error);
    }
  };

  const handleToggleForm = () => setShowForm(prev => !prev);

  const handleChange = ({ target: { name, value, files } }) => {
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key, value);
    });

    try {
      const response = await fetch('http://localhost:5000/rooms', {
        method: 'POST',
        body: formDataToSend
      });
  
      if (response.ok) {
        setShowForm(false);
        fetchRooms();
      } else {
        console.error('Error creating room:', response.statusText);
      }
    } catch (error) {
      console.error('Error creating room:', error);
    }
  };

  const handleEditClick = (room) => {
    console.log(room);  // Tambahkan ini untuk melihat struktur room
    setEditData({
      id_kamar: room.id_kamar,
      roomNumber: room.nomor_kamar,
      roomType: room.tipe_kamar,
      price: room.harga,
      availability: room.status_ketersediaan,
      maxPerson: room.jumlah_tamu,
      image: room.gambar
    });
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => setShowEditModal(false);

  const handleEditChange = ({ target: { name, value, files } }) => {
    setEditData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleEditSubmit = async (event) => {
    event.preventDefault();
    const formDataToSend = new FormData();
    Object.entries(editData).forEach(([key, value]) => {
      if (key === 'image' && typeof value === 'string') {
        // Jangan tambahkan gambar jika value adalah nama file string
      } else {
        formDataToSend.append(key, value);
      }
    });

    try {
      const response = await fetch(`http://localhost:5000/rooms/${editData.id_kamar}`, {
        method: 'PUT',
        body: formDataToSend
      });
  
      if (response.ok) {
        setShowEditModal(false);
        fetchRooms();
      } else {
        console.error('Error updating room:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating room:', error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Apakah Anda yakin ingin menghapus kamar ini?');
    if (confirmDelete) {
      try {
        const response = await fetch(`http://localhost:5000/rooms/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          fetchRooms(); // Refresh the list after deleting
          window.alert('Kamar berhasil dihapus');
        } else {
          console.error('Error deleting room:', response.statusText);
        }
      } catch (error) {
        console.error('Error deleting room:', error);
      }
    }
  };

  return (
    <div className="dashboard flex">
      <Sidebar />
      <div className="list-room flex-1 p-4">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-bold">List Room</h2>
          <button className="bg-blue-800 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-opacity-50" onClick={handleToggleForm}>Tambah Kamar</button>
        </div>
        {showForm && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
              <div className="mt-3 text-center">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <label>Nomor Kamar:</label>
                  <input type="text" name="roomNumber" required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" onChange={handleChange} />
                  <label>Tipe Kamar:</label>
                  <input type="text" name="roomType" required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" onChange={handleChange} />
                  <label>Harga:</label>
                  <input type="text" name="price" required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" onChange={handleChange} />
                  <label>Ketersediaan:</label>
                  <select name="availability" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" onChange={handleChange}>
                    <option value="Available">Tersedia</option>
                    <option value="Unavailable">Tidak Tersedia</option>
                  </select>
                  <label>Max Person:</label>
                  <input type="number" name="maxPerson" required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" onChange={handleChange} />
                  <label>Gambar:</label>
                  <input type="file" name="image" required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" onChange={handleChange} />
                  <button type="submit" className="mt-5 bg-blue-800 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-opacity-50">Simpan Kamar</button>
                </form>
              </div>
            </div>
          </div>
        )}
        {!showForm && (
          <table className="table-room table-auto w-full shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-100 place-items-center">
              <tr>
                <th className='text-center'>Nomor Kamar</th>
                <th className='text-center'>Tipe Kamar</th>
                <th className='text-center'>Gambar</th>
                <th className='text-center'>Harga</th>
                <th className='text-center'>Ketersediaan</th>
                <th className='text-center'>Max Person</th>
                <th className='text-center'>Action</th>
              </tr>
            </thead>
            <tbody>
              {rooms.map(room => (
                <tr key={room.id_kamar}>
                  <td className='text-center'>{room.nomor_kamar}</td>
                  <td className='text-center'>{room.tipe_kamar}</td>
                  <td className='flex justify-center'><img src={`http://localhost:5000/uploads/${room.gambar}`} alt={room.tipe_kamar} className="h-16 w-16 object-cover" /></td>
                  <td className='text-center'>{room.harga}</td>
                  <td className='text-center'>{room.status_ketersediaan}</td>
                  <td className='text-center'>{room.jumlah_tamu}</td>
                  <td className='text-center'>
                    <button className="mr-2 text-blue-800 hover:text-blue-600" onClick={() => handleEditClick(room)}><FaEdit /></button>
                    <button className="text-red-800 hover:text-red-600" onClick={() => handleDelete(room.id_kamar)}><FaTrash /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {showEditModal && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="edit-modal">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
              <div className="mt-3 text-center">
                <form onSubmit={handleEditSubmit} className="space-y-4">
                  <label>Nomor Kamar:</label>
                  <input type="text" name="roomNumber" value={editData.roomNumber} required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" onChange={handleEditChange} />
                  <label>Tipe Kamar:</label>
                  <input type="text" name="roomType" value={editData.roomType} required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" onChange={handleEditChange} />
                  <label>Harga:</label>
                  <input type="text" name="price" value={editData.price} required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" onChange={handleEditChange} />
                  <label>Ketersediaan:</label>
                  <select name="availability" value={editData.availability} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" onChange={handleEditChange}>
                    <option value="Available">Tersedia</option>
                    <option value="Unavailable">Tidak Tersedia</option>
                  </select>
                  <label>Max Person:</label>
                  <input type="number" name="maxPerson" value={editData.maxPerson} required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" onChange={handleEditChange} />
                  <label>Gambar:</label>
                  <input type="file" name="image" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" onChange={handleEditChange} />
                  <button type="submit" className="mt-5 bg-blue-800 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-opacity-50">Simpan Perubahan</button>
                  <button type="button" className="absolute top-0 right-0 m-2 text-gray-500 hover:text-gray-700" onClick={handleCloseEditModal}>X</button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListRoom;
