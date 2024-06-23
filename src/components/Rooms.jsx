import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Room from './Room';
import { SpinnerDotted } from 'spinners-react';

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get('http://localhost:5000/rooms');
        // Filter kamar yang tersedia
        const availableRooms = response.data.filter(room => room.status_ketersediaan === 'Available');
        setRooms(availableRooms);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching rooms:', error);
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  return (
    <section className='py-24'>
      {loading && (
        <div className='h-screen fixed bottom-0 top-0 bg-black/90 w-full z-50 flex justify-center items-center'>
          <SpinnerDotted color='white' />
        </div>
      )}
      <div className='container mx-auto lg:px-0'>
        <div className='text-center'>
          <div className='font-tertiary uppercase text-[15px] tracking-[6px]'>Hotel & Spa Adina</div>
          <h2 className='font-primary text-[45px] mb-4'>Room & Suites</h2>
        </div>
        <div className='grid grid-cols-1 max-w-sm mx-auto gap-[30px] lg:grid-cols-3 lg:max-w-none lg:mx-0'>
          {rooms.map((room) => (
            <Room room={room} key={room.id_kamar} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Rooms;
