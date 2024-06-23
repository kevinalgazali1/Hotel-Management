import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { FaCheck } from 'react-icons/fa';
import { BsUpload } from 'react-icons/bs';
import CheckIn from '../components/CheckIn';
import CheckOut from '../components/CheckOut';
import ScrollToTop from '../components/ScrollToTop';
import Modal from 'react-modal'; // Import react-modal

// Set app element for accessibility
Modal.setAppElement('#root');

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  return new Date(dateString).toLocaleDateString('en-CA', options);
};

const RoomDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const number = queryParams.get('number');
  const name = queryParams.get('name');
  const price = queryParams.get('price');
  const imageLg = queryParams.get('image');

  const [tanggal_checkin, setTanggal_checkin] = useState('');
  const [tanggal_checkout, setTanggal_checkout] = useState('');
  const [proofOfPayment, setProofOfPayment] = useState(null);
  const [user, setUser] = useState(null);
  const [namaLengkap, setNamaLengkap] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false); // State untuk modal
  const [bookingData, setBookingData] = useState(null); // State untuk data pemesanan
  const navigate = useNavigate();

  useEffect(() => {
    console.log("ID Kamar:", id);
    console.log("Nomor Kamar:", number);
    console.log("Nama Kamar:", name);
    console.log("Harga:", price);
    console.log("Gambar:", imageLg);
  }, [id, number, name, price, imageLg]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetch('http://localhost:5000/protected', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => response.json())
      .then(data => setUser(data.logged_in_as))
      .catch(error => console.error('Error:', error));
    }
  }, []);

  useEffect(() => {
    console.log("Booking Data:", bookingData); // Tambahkan console log di modal
  }, [bookingData]);

  const handleFileChange = (event) => {
    setProofOfPayment(event.target.files[0]);
  };

  const handleBooking = async () => {
    if (!tanggal_checkin || !tanggal_checkout || !namaLengkap) {
      alert('Please fill in all the required fields.');
      return;
    }

    const formData = new FormData();
    formData.append('user_id', user);
    formData.append('nama_lengkap', namaLengkap);
    formData.append('id_kamar', id);
    formData.append('nomor_kamar', number);
    formData.append('tanggal_checkin', tanggal_checkin);
    formData.append('tanggal_checkout', tanggal_checkout);
    formData.append('bukti_pembayaran', proofOfPayment);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('User is not authenticated.');
        return;
      }

      const response = await fetch('http://localhost:5000/bookings', {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const bookingResponse = await response.json();
        console.log("Booking Response:", bookingResponse); // Tambahkan log respons
        setBookingData(bookingResponse); // Simpan data pemesanan
        setIsModalOpen(true); // Buka modal
      } else {
        const errorData = await response.json();
        console.error('Error:', errorData);
        alert('Booking failed!');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Booking failed!');
    }
  };

  const handleOkClick = () => {
    setIsModalOpen(false);
    navigate('/home');
  };

  return (
    <section>
      <ScrollToTop />
      <div className='bg-room bg-cover bg-center h-[560px] relative flex justify-center items-center'>
        <div className='absolute w-full h-full bg-black/70'></div>
        <h1 className='text-6xl text-white z-20 font-primary text-center'>
          {name} Reservation
        </h1>
      </div>
      <div className='container mx-auto'>
        <div className='flex flex-col lg:flex-row h-full py-24'>
          <div className='w-full h-full lg:w-[60%] px-6'>
            <h3 className='h2'>{name}</h3>
            <h2 className='text-4xl text-black z-20 font-primary text-center'>
              Room Number: {number}
            </h2>
            <img className='mb-8' src={`http://localhost:5000/uploads/${imageLg}`} alt='' />
          </div>
          <div className='w-full h-full lg:w-[40%]'>
            <div className='py-8 px-6 bg-accent/20 mb-12'>
              <div className='flex flex-col space-y-4 mb-4'>
                <h3>Your Reservation</h3>
                <div className='h-[60px]'>
                  <CheckIn onChange={(e) => setTanggal_checkin(e.target.value)} />
                </div>
                <div className='h-[60px]'>
                  <CheckOut onChange={(e) => setTanggal_checkout(e.target.value)} />
                </div>
                <div className='h-[60px]'>
                  <input
                    type="text"
                    placeholder="Nama Lengkap"
                    value={namaLengkap}
                    onChange={(e) => setNamaLengkap(e.target.value)}
                    className="w-full h-full p-4"
                  />
                </div>
                <h3>Upload Proof of Payment</h3>
                <div className='relative flex items-center justify-end h-full bg-white w-full h-full p-4'>
                  <div className='absolute z-10 pr-8'>
                    <BsUpload className='text-accent text-base' />
                  </div>
                  <input type="file" onChange={handleFileChange} className="w-full h-full" />
                </div>
              </div>
              <button className='btn btn-lg btn-primary w-full h-[60px]' onClick={handleBooking}>
                book now for ${price}
              </button>
            </div>
            <div>
              <h3 className='h3'>Hotel Rules</h3>
              <ul className='flex flex-col gap-y-4'>
                <li className='flex items-center gap-x-4'>
                  <FaCheck className='text-accent' />
                  Check-in: 3.00 - 9.00 PM
                </li>
                <li className='flex items-center gap-x-4'>
                  <FaCheck className='text-accent' />
                  Check-out: 12.00 AM
                </li>
                <li className='flex items-center gap-x-4'>
                  <FaCheck className='text-accent' />
                  No Pets
                </li>
                <li className='flex items-center gap-x-4'>
                  <FaCheck className='text-accent' />
                  No Smoking
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Modal 
        isOpen={isModalOpen} 
        onRequestClose={() => setIsModalOpen(false)}
        style={{
          overlay: {
            zIndex: 1000, // Pastikan modal berada di depan semua komponen
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          },
          content: {
            position: 'relative',
            inset: 'auto',
            margin: 'auto',
            padding: '20px',
            border: '1px solid #ccc',
            background: '#fff',
            borderRadius: '4px',
            maxWidth: '500px',
            width: '100%',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
          }
        }}
      >
        <h2 className='text-2xl font-bold mb-4 text-center'>Booking Details</h2>
        <table className='w-full text-left'>
          <tbody>
          <tr>
              <td className='font-bold'>Number</td>
              <td>: {bookingData?.id}</td>
            </tr>
            <tr>
              <td className='font-bold'>Name</td>
              <td>: {bookingData?.guests}</td>
            </tr>
            <tr>
              <td className='font-bold'>Room Number</td>
              <td>: {bookingData?.roomNumber}</td>
            </tr>
            <tr>
              <td className='font-bold'>Check-in</td>
              <td>: {formatDate(bookingData?.checkIn)}</td>
            </tr>
            <tr>
              <td className='font-bold'>Check-out</td>
              <td>: {formatDate(bookingData?.checkOut)}</td>
            </tr>
          </tbody>
        </table>
        <h2 className='text-2xl font-bold mt-4 mb-4 text-center'>Save This Booking</h2>
        <button className='btn btn-primary mt-4 mx-auto' onClick={handleOkClick}>
          OK
        </button>
      </Modal>
    </section>
  );
};

export default RoomDetails;
