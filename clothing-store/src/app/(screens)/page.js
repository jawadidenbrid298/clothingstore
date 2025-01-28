import React from 'react';
import HeroSection from './home/page';
import FeaturedPage from './featured/page';
import Banner from './banner/page';
import ReviewCarousel from './reviews/page';
import Footer from './Footer/page';
function page() {
  return (
    <>
      <HeroSection />
      <FeaturedPage />
      <Banner />
      <ReviewCarousel />
    </>
  );
}

export default page;
