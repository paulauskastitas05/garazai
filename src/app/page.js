'use client';

import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LiveChat from './LiveChat'; 
import HomePage from '@/components/titulinis';

const customSelectStyles = {
  control: (provided, state) => ({
    ...provided,
    backgroundColor: '#003366',
    borderColor: state.isFocused ? '#003366' : '#003366',
    boxShadow: state.isFocused ? '0 0 0 1px #003366' : 'none',
    '&:hover': {
      borderColor: '#003366',
    },
    color: 'white',
  }),
  singleValue: (provided) => ({
    ...provided,
    color: 'white',
  }),
  placeholder: (provided) => ({
    ...provided,
    color: 'white',
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: '#003366',
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? '#060a69' : '#003366',
    color: 'white',
    '&:hover': {
      backgroundColor: '#004488',
    },
  }),
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: '#004488',
    color: 'white',
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    color: 'white',
  }),
  multiValueRemove: (provided) => ({
    ...provided,
    color: 'white',
    '&:hover': {
      backgroundColor: '#ff4444',
      color: 'white',
    },
  }),
};

export default function Home() {
  const [garages, setGarages] = useState([]);
  const [user, setUser] = useState(null);
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedTools, setSelectedTools] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    const fetchGarages = async () => {
      try {
        const response = await fetch('/api/garages');
        const data = await response.json();
        setGarages(data);
      } catch (error) {
        console.error('Klaida įkeliant garažus:', error);
      }
    };

    fetchGarages();
  }, []);

  const openImage = (img) => setSelectedImage(img);
  const closeModal = () => setSelectedImage(null);

  const filteredGarages = Array.isArray(garages) ? garages.filter((garage) => {
    const cityMatch = selectedCity ? garage.city === selectedCity.value : true;
    const garageTools = garage.tools ? JSON.parse(garage.tools) : [];
    const toolsMatch = selectedTools.length > 0 ? selectedTools.every(tool => garageTools.includes(tool.value)) : true;
    return cityMatch && toolsMatch;
  }) : [];
  

  return (
    <div>
      <Header />
      <HomePage />

      <Footer />
      <LiveChat />
    </div>
  );
}
