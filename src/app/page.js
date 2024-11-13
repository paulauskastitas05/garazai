'use client';

import { useState, useEffect } from 'react';
import Select from 'react-select';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from './Home.module.css';
import { availableTools } from '../data/tools';
import { lithuanianCities } from '../data/cities';
// import LiveChat from './LiveChat'; 
import Link from 'next/link'; 


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

      <div className={styles.container}>
        <div className={styles.filterCard}>
          <div className={styles.filterItem}>
            <label>Pasirinkite miestą</label>
            <Select
  value={selectedCity}
  onChange={setSelectedCity}
  options={lithuanianCities} 
  placeholder="Ieškoti miesto"
  isClearable
  onInputChange={() => {}}
  styles={customSelectStyles}
  isSearchable
  className={styles.filterDropdown}
/>
          </div>

          <div className={styles.filterItem}>
            <label>Pasirinkite įrankius</label>
            <Select
              isMulti
              value={selectedTools}
              onChange={setSelectedTools}
              options={availableTools}
              placeholder="Ieškoti įrankių"
              isSearchable
              styles={customSelectStyles}
              closeMenuOnSelect={false}
              className={styles.filterDropdown}
            />
          </div>
        </div>

        <div className={styles.garageList}>
  {filteredGarages.map((garage) => {
    const images = JSON.parse(garage.images || '[]');
    const mainImage = images[0];
    const stackedImages = images.slice(1, 4);

    return (
      <div key={garage.id} className={styles.garageItem}>
        <div className={styles.imageSection}>
          <img 
            src={mainImage} 
            alt={garage.name} 
            className={styles.mainImage} 
            onClick={() => openImage(mainImage)} 
          />
          <div className={styles.stackedImages}>
            {stackedImages.map((img, index) => (
              <img 
                key={index} 
                src={img} 
                alt={`Garage ${index + 1}`} 
                className={styles.stackedImage} 
                onClick={() => openImage(img)} 
              />
            ))}
          </div>
        </div>

        <div className={styles.garageInfo}>
          {/* Wrap garage.name in a Link component */}
          <Link href={`/garages/${garage.id}`}>
            <h3 className={styles.garageName} style={{ cursor: 'pointer' }}>{garage.name}</h3>
          </Link>
          <p>{garage.address}</p>
          <p>Miestas: {garage.city}</p>
          <p>Įrankiai: {garage.tools ? JSON.parse(garage.tools).join(', ') : 'Nėra įrankių'}</p>
        </div>
      </div>
    );
  })}
</div>

        {selectedImage && (
          <div className={styles.modal} onClick={closeModal}>
            <img src={selectedImage} alt="Padidinta" className={styles.modalImage} />
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
