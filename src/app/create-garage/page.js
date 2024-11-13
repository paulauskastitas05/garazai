'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Select from 'react-select';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import styles from './CreateGarage.module.css';
import { availableTools } from '../../data/tools';
import { lithuanianCities } from '../../data/cities';

export default function CreateGarage() {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    city: '',
    images: [],
    tools: [],
  });
  const [message, setMessage] = useState('');
  const router = useRouter();
  const [ownerId, setOwnerId] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setOwnerId(user.id); // Set the ownerId from logged-in user's data
    } else {
      router.push('/login'); // Redirect to login if user not found
    }
  }, [router]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData({
      ...formData,
      images: files,
    });
  };

  const handleToolChange = (selectedOptions) => {
    const tools = selectedOptions.map(option => option.value);
    setFormData({ ...formData, tools });
  };

  const handleCityChange = (selectedOption) => {
    setFormData({ ...formData, city: selectedOption.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSubmit = new FormData();
    formDataToSubmit.append('name', formData.name);
    formDataToSubmit.append('address', formData.address);
    formDataToSubmit.append('city', formData.city);
    formDataToSubmit.append('ownerId', ownerId); // Include ownerId
    formData.images.forEach((file, i) => {
      formDataToSubmit.append(`images_${i}`, file);
    });
    formDataToSubmit.append('tools', JSON.stringify(formData.tools));

    try {
      const response = await fetch('/api/create-garage', {
        method: 'POST',
        body: formDataToSubmit,
      });

      if (response.ok) {
        setMessage('Garažas sėkmingai sukurtas!');
        router.push('/');
      } else {
        setMessage('Nepavyko sukurti garažo.');
      }
    } catch (error) {
      console.error('Nepavyko sukurti garažo:', error);
      setMessage('Nepavyko sukurti garažo.');
    }
  };

  return (
    <div>
      <Header />
      <div className={styles.container}>
        <h1 className={styles.title}>Sukurti garažą</h1>
        {message && <p className={styles.message}>{message}</p>}
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Garažo pavadinimas"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="address"
            placeholder="Garažo adresas"
            value={formData.address}
            onChange={handleInputChange}
            required
          />

          <h2>Pasirinkite miestą</h2>
          <Select
            options={lithuanianCities}
            onChange={handleCityChange}
            placeholder="Pasirinkite miestą"
            value={lithuanianCities.find(city => city.value === formData.city)}
          />

          <h2>Pasirinkite įrankius</h2>
          <Select
            isMulti
            options={availableTools}
            onChange={handleToolChange}
            placeholder="Pasirinkite įrankius"
            closeMenuOnSelect={false}
            value={availableTools.filter(tool => formData.tools.includes(tool.value))}
          />

          <input
            type="file"
            name="images"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            required
          />

          <button type="submit">Sukurti garažą</button>
        </form>
      </div>
      <Footer />
    </div>
  );
}
