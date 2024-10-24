import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Header from '../../src/components/Header';
import Footer from '../../src/components/Footer';
import styles from './Garage.module.css';

export default function GarageDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [garage, setGarage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (id) {
      const fetchGarage = async () => {
        try {
          const response = await fetch(`/api/garages/${id}`);
          const data = await response.json();
          setGarage(data);
        } catch (error) {
          console.error('Failed to load garage:', error);
        }
      };

      fetchGarage();
    }
  }, [id]);

  if (!garage) {
    return <p>Loading...</p>;
  }

  const images = JSON.parse(garage.images || '[]');

  return (
    <div style={{ backgroundColor: '#003366', minHeight: '100vh' }}> {/* Blue background */}
      <Header />
      <div className={styles.garageContainer}>
        <div className={styles.garageInfoSection}>
          <h1>{garage.name}</h1>
          <div className={styles.garageInfo}>
            <p><strong>Adresas:</strong> {garage.address}</p>
            <p><strong>Miestas:</strong> {garage.city}</p>
            <p><strong>Įrankiai:</strong> {garage.tools ? JSON.parse(garage.tools).join(', ') : 'Nėra įrankių'}</p>
          </div>
          <div className={styles.ownerInfo}>
            <h2>Savininko informacija</h2>
            <p><strong>Vardas:</strong> {garage.ownerName || 'Nėra duomenų'}</p>
            <p><strong>Telefono numeris:</strong> {garage.ownerPhone || 'Nėra duomenų'}</p>
            <p><strong>El. paštas:</strong> {garage.ownerEmail || 'Nėra duomenų'}</p>
          </div>
        </div>

        <div className={styles.imageCarousel}>
          {images.length > 0 ? (
            <div className={styles.imageSection}>
              <span
                className={`${styles.arrow} ${styles.leftArrow}`}
                onClick={() => setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
              >
                &#8592;
              </span>
              <img
                src={images[currentImageIndex]}
                alt={`Garage ${currentImageIndex + 1}`}
                className={styles.garageImage}
              />
              <span
                className={`${styles.arrow} ${styles.rightArrow}`}
                onClick={() => setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
              >
                &#8594;
              </span>
            </div>
          ) : (
            <p>No images available</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
