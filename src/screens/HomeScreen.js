import React from 'react';
import Header from './../components/Header';
import ShopSection from './../components/homeComponents/ShopSection';
import ContactInfo from './../components/homeComponents/ContactInfo';
import CalltoActionSection from './../components/homeComponents/CalltoActionSection';
import Footer from './../components/Footer';

const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword;
  window.scrollTo(0, 0);
  return (
    <div>
      <Header />
      <ShopSection keyword={keyword} />
      <CalltoActionSection />
      <ContactInfo />
      <Footer />
    </div>
  );
};

export default HomeScreen;
