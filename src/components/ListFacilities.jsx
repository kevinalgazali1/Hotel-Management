import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import { FaEdit, FaTrash } from 'react-icons/fa';

const ListFacilities = () => {
  const [facilities, setFacilities] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editData, setEditData] = useState({
    name: '',
    description: '',
    image: null
  });
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    fetchFacilities();
  }, []);

  const fetchFacilities = async () => {
    try {
      const response = await fetch('http://localhost:5000/facilities');
      const data = await response.json();
      setFacilities(data);
    } catch (error) {
      console.error('Error fetching facilities:', error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Apakah Anda yakin ingin menghapus fasilitas ini?');
    if (confirmDelete) {
      try {
        const response = await fetch(`http://localhost:5000/facilities/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          fetchFacilities(); // Refresh the list after deleting
          window.alert('Fasilitas berhasil dihapus');
        } else {
          console.error('Error deleting facility:', response.statusText);
        }
      } catch (error) {
        console.error('Error deleting facility:', error);
      }
    }
  };

  const handleEditClick = (facility) => {
    console.log("Editing facility with ID:", facility.id_fasilitas); // Debug untuk memastikan ID ada
    setEditData({
      id_fasilitas: facility.id_fasilitas, // Menambahkan id untuk digunakan saat submit
      name: facility.nama_fasilitas,
      description: facility.deskripsi,
      image: facility.gambar_fasilitas // Menyimpan nama file gambar yang ada
    });
    setShowEditModal(true);
  };

  const handleEditChange = ({ target: { name, value, files } }) => {
    setEditData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleEditSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('name', editData.name);
    formData.append('description', editData.description);
    if (editData.image) {
      formData.append('image', editData.image);
    }

    try {
      const response = await fetch(`http://localhost:5000/facilities/${editData.id_fasilitas}`, {
        method: 'PUT',
        body: formData
      });

      if (response.ok) {
        setShowEditModal(false);
        fetchFacilities();
      } else {
        console.error('Error updating facility:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating facility:', error);
    }
  };

  const handleShowAddModal = () => setShowAddModal(true);
  const handleCloseAddModal = () => setShowAddModal(false);
  const handleAddChange = ({ target: { name, value, files } }) => {
    setEditData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleAddSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    Object.entries(editData).forEach(([key, value]) => {
      formData.append(key, value);
    });

    try {
      const response = await fetch('http://localhost:5000/facilities', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        handleCloseAddModal();
        fetchFacilities(); // Refresh the list of facilities
      } else {
        console.error('Error adding facility:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding facility:', error);
    }
  };

  return (
    <div className="dashboard flex">
      <Sidebar />
      <div className="list-facilities flex-1 p-4">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-bold">List Facilities</h2>
          <button className="bg-blue-800 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-opacity-50" onClick={handleShowAddModal}>Add Facility</button>
        </div>
        <table className="table-facilities table-auto w-full shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className='text-center'>Nama</th>
              <th className='text-center'>Gambar</th>
              <th className='text-center'>Deskripsi</th>
              <th>Action</th>
            </tr>
          </thead>
            <tbody>
              {facilities.map(facility => (
                <tr key={facility.id_fasilitas}>
                  <td className='text-center'>{facility.nama_fasilitas}</td>
                  <td className='flex justify-center'><img src={`http://localhost:5000/uploads/${facility.gambar_fasilitas}`} alt="Facility" width="100" /></td>
                  <td className='text-center'>{facility.deskripsi}</td>
                  <td className='text-center'>
                    <button onClick={() => handleEditClick(facility)} className="text-blue-500 hover:text-blue-700">
                      <FaEdit />
                    </button>
                    <button onClick={() => handleDelete(facility.id_fasilitas)} className="text-red-500 hover:text-red-700">
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
        </table>
      </div>
      {showEditModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="edit-modal">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <button onClick={() => setShowEditModal(false)} className="absolute top-0 right-0 m-2 text-gray-500 hover:text-gray-700">X</button>
              <form onSubmit={handleEditSubmit} className="space-y-4">
                <label>Nama:</label>
                <input type="text" name="name" value={editData.name} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm" onChange={handleEditChange} />
                <label>Deskripsi:</label>
                <textarea name="description" value={editData.description} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm" onChange={handleEditChange} />
                <label>Gambar:</label>
                <input type="file" name="image" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm" onChange={handleEditChange} />
                <button type="submit" className="mt-5 bg-blue-800 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-opacity-50">Simpan Perubahan</button>
              </form>
            </div>
          </div>
        </div>
      )}
      {showAddModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="add-modal">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <form onSubmit={handleAddSubmit} className="space-y-4">
                <label>Nama:</label>
                <input type="text" name="name" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm" onChange={handleAddChange} />
                <label>Deskripsi:</label>
                <textarea name="description" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm" onChange={handleAddChange} />
                <label>Gambar:</label>
                <input type="file" name="image" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm" onChange={handleAddChange} />
                <button type="submit" className="mt-5 bg-blue-800 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-opacity-50">Tambah Fasilitas</button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListFacilities;
