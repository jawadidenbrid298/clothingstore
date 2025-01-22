import React from 'react';
import HeroSection from './(screens)/home/page';
import FeaturedPage from './(screens)/featured/page';
import Banner from './(screens)/banner/page';
import ReviewCarousel from './(screens)/reviews/page';
import Footer from './(screens)/Footer/page';
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
