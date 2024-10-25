import Link from 'next/link';
import styles from './titulinis.module.css';

const HomePage = () => {
  return (
    <div className={styles.homePage}>

      {/* Hero section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>Raskite arba išnuomokite garažą per kelias minutes!</h1>
          <p>Platus garažų pasirinkimas nuomininkams. Paprastas procesas nuomotojams.</p>
          <div className={styles.ctaButtons}>
            <Link href="/paieska" className={styles.ctaButton}>
              Ieškoti garažų
            </Link>
            <Link href="/create-garage" className={styles.ctaButtonSecondary}>
              Patalpinti garažą
            </Link>
          </div>
        </div>
      </section>

      {/* Features section for renters */}
      <section className={styles.features}>
        <h2>Privalumai nuomininkams</h2>
        <div className={styles.featureItems}>
          <div className={styles.featureItem}>
            <img src="/icons/search.svg" alt="Paieška" />
            <h3>Greita ir paprasta paieška</h3>
            <p>Naudokite patogius filtrus ir raskite geriausią garažą savo mieste.</p>
          </div>
          <div className={styles.featureItem}>
            <img src="/icons/security.svg" alt="Saugumas" />
            <h3>Saugumas</h3>
            <p>Visi nuomotojai patikrinti, užtikrinant jūsų turto saugumą.</p>
          </div>
          <div className={styles.featureItem}>
            <img src="/icons/variety.svg" alt="Pasirinkimas" />
            <h3>Platus pasirinkimas</h3>
            <p>Pasirinkite iš įvairių garažų dydžių ir vietų visoje Lietuvoje.</p>
          </div>
        </div>
      </section>

      {/* Features section for landlords */}
      <section className={styles.featuresLandlords}>
        <h2>Privalumai nuomotojams</h2>
        <div className={styles.featureItems}>
          <div className={styles.featureItem}>
            <img src="/icons/list.svg" alt="Registracija" />
            <h3>Paprasta registracija</h3>
            <p>Lengvai įkelkite savo garažą, pateikite informaciją ir sulaukite klientų.</p>
          </div>
          <div className={styles.featureItem}>
            <img src="/icons/bill.svg" alt="Apmokėjimas" />
            <h3>Aiški sąskaitų sistema</h3>
            <p>Gaukite mokėjimus greitai ir patogiai, be papildomų rūpesčių.</p>
          </div>
          <div className={styles.featureItem}>
            <img src="/icons/review.svg" alt="Atsiliepimai" />
            <h3>Klientų atsiliepimai</h3>
            <p>Stebėkite atsiliepimus ir gerinkite savo reputaciją platformoje.</p>
          </div>
        </div>
      </section>

      {/* How it works section */}
      <section className={styles.howItWorks}>
        <h2>Kaip tai veikia</h2>
        <div className={styles.steps}>
          <div className={styles.step}>
            <h3>Nuomininkams</h3>
            <p>1. Užsiregistruokite arba prisijunkite.<br/> 2. Raskite garažą pagal miestą ir įrankius.<br/> 3. Rezervuokite ir mokėkite internetu.</p>
          </div>
          <div className={styles.step}>
            <h3>Nuomotojams</h3>
            <p>1. Užsiregistruokite kaip nuomotojas.<br/> 2. Įkelkite garažo informaciją.<br/> 3. Sulaukite rezervacijų ir gaukite mokėjimus.</p>
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className={styles.callToAction}>
        <h2>Prisijunkite dabar ir pradėkite!</h2>
        <div className={styles.ctaButtons}>
          <Link href="/paieska" className={styles.ctaButton}>
            Rasti garažą
          </Link>
          <Link href="/create-garage" className={styles.ctaButtonSecondary}>
            Patalpinti garažą
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
