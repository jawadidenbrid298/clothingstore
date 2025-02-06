'use client';
import {useState, useEffect, useRef} from 'react';

const ReviewCarousel = () => {
  const [reviews, setReviews] = useState([]);
  const carouselRef = useRef(null);

  useEffect(() => {
    fetch('/reviews.json')
      .then((response) => response.json())
      .then((data) => setReviews(data))
      .catch((error) => console.error('Error fetching reviews:', error));
  }, []);

  const handleScroll = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = 300;
      carouselRef.current.scrollBy({
        left: direction === 'prev' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  if (reviews.length === 0) return <div>Loading...</div>;

  return (
    <div className='w-full mx-auto py-20 px-8 sm:px-16 lg:px-24'>
      <h2 className='text-left text-3xl font-bold mb-6'>OUR HAPPY CUSTOMERS</h2>

      <div className='flex justify-end items-center space-x-4 mb-4'>
        <button
          onClick={() => handleScroll('prev')}
          className='flex items-center justify-center w-10 h-10  hover:bg-gray-300 rounded-full transition'>
          <svg width='20' height='16' viewBox='0 0 20 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path
              d='M7.70406 0.454104L0.954061 7.2041C0.849182 7.30862 0.765966 7.43281 0.709186 7.56956C0.652405 7.7063 0.623175 7.85291 0.623175 8.00098C0.623175 8.14904 0.652405 8.29565 0.709186 8.4324C0.765966 8.56915 0.849182 8.69334 0.954061 8.79785L7.70406 15.5479C7.91541 15.7592 8.20205 15.8779 8.50094 15.8779C8.79982 15.8779 9.08647 15.7592 9.29781 15.5479C9.50916 15.3365 9.62789 15.0499 9.62789 14.751C9.62789 14.4521 9.50916 14.1654 9.29781 13.9541L4.46875 9.12504L18.25 9.12504C18.5484 9.12504 18.8345 9.00651 19.0455 8.79554C19.2565 8.58456 19.375 8.29841 19.375 8.00004C19.375 7.70167 19.2565 7.41552 19.0455 7.20455C18.8345 6.99357 18.5484 6.87504 18.25 6.87504L4.46875 6.87504L9.29875 2.04598C9.51009 1.83463 9.62883 1.54799 9.62883 1.2491C9.62883 0.950218 9.51009 0.663574 9.29875 0.45223C9.08741 0.240885 8.80076 0.122151 8.50187 0.122151C8.20299 0.122151 7.91634 0.240885 7.705 0.45223L7.70406 0.454104Z'
              fill='black'
            />
          </svg>
        </button>

        <button
          onClick={() => handleScroll('next')}
          className='flex items-center justify-center w-10 h-10  hover:bg-gray-300 rounded-full transition'>
          <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path
              d='M14.2959 4.4541L21.0459 11.2041C21.1508 11.3086 21.234 11.4328 21.2908 11.5696C21.3476 11.7063 21.3768 11.8529 21.3768 12.001C21.3768 12.149 21.3476 12.2957 21.2908 12.4324C21.234 12.5691 21.1508 12.6933 21.0459 12.7979L14.2959 19.5479C14.0846 19.7592 13.7979 19.8779 13.4991 19.8779C13.2002 19.8779 12.9135 19.7592 12.7022 19.5479C12.4908 19.3365 12.3721 19.0499 12.3721 18.751C12.3721 18.4521 12.4908 18.1654 12.7022 17.9541L17.5313 13.125L3.75 13.125C3.45163 13.125 3.16548 13.0065 2.9545 12.7955C2.74353 12.5846 2.625 12.2984 2.625 12C2.625 11.7017 2.74353 11.4155 2.95451 11.2045C3.16548 10.9936 3.45163 10.875 3.75 10.875L17.5313 10.875L12.7013 6.04598C12.4899 5.83463 12.3712 5.54799 12.3712 5.2491C12.3712 4.95022 12.4899 4.66357 12.7013 4.45223C12.9126 4.24088 13.1992 4.12215 13.4981 4.12215C13.797 4.12215 14.0837 4.24088 14.295 4.45223L14.2959 4.4541Z'
              fill='black'
            />
          </svg>
        </button>
      </div>

      {/* Reviews */}
      <div
        ref={carouselRef}
        className='carousel-content flex overflow-x-auto space-x-6 px-2 sm:px-6 lg:px-12 scrollbar-hidden'>
        {reviews.map((review, index) => (
          <div
            key={index}
            className='review-card min-w-[300px] sm:min-w-[340px] lg:min-w-[400px] bg-white border border-gray-200 rounded-lg shadow-md p-6 flex flex-col justify-between'>
            <div className='stars text-yellow-400 flex items-center mb-4'>
              {Array(review.rating)
                .fill(null)
                .map((_, i) => (
                  <span key={i}>&#9733;</span>
                ))}
            </div>

            <h3 className='text-lg font-bold flex items-center mb-2'>
              {review.name}
              <span className='text-green-500 text-sm ml-2'>&#x2714;</span> {/* Checkmark */}
            </h3>

            <p className='text-gray-600'>{review.review}</p>
          </div>
        ))}
      </div>

      {/* Review Count */}
      <div className='review-count text-center mt-5 text-gray-500'>1-{reviews.length} reviews</div>
    </div>
  );
};

export default ReviewCarousel;

// 'use client';
// import {useState, useEffect, useRef} from 'react';
// import {generateClient} from '@aws-amplify/api'; // Import Amplify GraphQL client
// import {topReviews} from '@/graphql/queries'; // Adjust the path based on your structure

// const client = generateClient();

// const ReviewCarousel = () => {
//   const [reviews, setReviews] = useState([]);
//   const carouselRef = useRef(null);

//   useEffect(() => {
//     const fetchReviews = async () => {
//       try {
//         const response = await client.graphql({query: topReviews});

//         console.log(response, 'TR');
//         const parsedBody = JSON.parse(response.data.topReviews.body);
//         const reviewsData = parsedBody.topReviews || [];
//         console.log(reviewsData, 'RR');
//         //   const reviewsData = response.data.topReviews.Items || [];
//         setReviews(reviewsData);
//       } catch (error) {
//         console.error('Error fetching reviews:', error);
//       }
//     };

//     fetchReviews();
//   }, []);

//   const handleScroll = (direction) => {
//     if (carouselRef.current) {
//       const scrollAmount = 300;
//       carouselRef.current.scrollBy({
//         left: direction === 'prev' ? -scrollAmount : scrollAmount,
//         behavior: 'smooth'
//       });
//     }
//   };

//   if (reviews.length === 0) return <div>Loading...</div>;

//   return (
//     <div className='w-full mx-auto py-20 px-8 sm:px-16 lg:px-24'>
//       <h2 className='text-left text-3xl font-bold mb-6'>OUR HAPPY CUSTOMERS</h2>

//       <div className='flex justify-end items-center space-x-4 mb-4'>
//         <button
//           onClick={() => handleScroll('prev')}
//           className='flex items-center justify-center w-10 h-10 hover:bg-gray-300 rounded-full transition'>
//           <svg width='20' height='16' viewBox='0 0 20 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
//             <path
//               d='M7.70406 0.454104L0.954061 7.2041C0.849182 7.30862 0.765966 7.43281 0.709186 7.56956C0.652405 7.7063 0.623175 7.85291 0.623175 8.00098C0.623175 8.14904 0.652405 8.29565 0.709186 8.4324C0.765966 8.56915 0.849182 8.69334 0.954061 8.79785L7.70406 15.5479C7.91541 15.7592 8.20205 15.8779 8.50094 15.8779C8.79982 15.8779 9.08647 15.7592 9.29781 15.5479C9.50916 15.3365 9.62789 15.0499 9.62789 14.751C9.62789 14.4521 9.50916 14.1654 9.29781 13.9541L4.46875 9.12504L18.25 9.12504C18.5484 9.12504 18.8345 9.00651 19.0455 8.79554C19.2565 8.58456 19.375 8.29841 19.375 8.00004C19.375 7.70167 19.2565 7.41552 19.0455 7.20455C18.8345 6.99357 18.5484 6.87504 18.25 6.87504L4.46875 6.87504L9.29875 2.04598C9.51009 1.83463 9.62883 1.54799 9.62883 1.2491C9.62883 0.950218 9.51009 0.663574 9.29875 0.45223C9.08741 0.240885 8.80076 0.122151 8.50187 0.122151C8.20299 0.122151 7.91634 0.240885 7.705 0.45223L7.70406 0.454104Z'
//               fill='black'
//             />
//           </svg>
//         </button>

//         <button
//           onClick={() => handleScroll('next')}
//           className='flex items-center justify-center w-10 h-10 hover:bg-gray-300 rounded-full transition'>
//           <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
//             <path
//               d='M14.2959 4.4541L21.0459 11.2041C21.1508 11.3086 21.234 11.4328 21.2908 11.5696C21.3476 11.7063 21.3768 11.8529 21.3768 12.001C21.3768 12.149 21.3476 12.2957 21.2908 12.4324C21.234 12.5691 21.1508 12.6933 21.0459 12.7979L14.2959 19.5479C14.0846 19.7592 13.7979 19.8779 13.4991 19.8779C13.2002 19.8779 12.9135 19.7592 12.7022 19.5479C12.4908 19.3365 12.3721 19.0499 12.3721 18.751C12.3721 18.4521 12.4908 18.1654 12.7022 17.9541L17.5313 13.125L3.75 13.125C3.45163 13.125 3.16548 13.0065 2.9545 12.7955C2.74353 12.5846 2.625 12.2984 2.625 12C2.625 11.7017 2.74353 11.4155 2.95451 11.2045C3.16548 10.9936 3.45163 10.875 3.75 10.875L17.5313 10.875L12.7013 6.04598C12.4899 5.83463 12.3712 5.54799 12.3712 5.2491C12.3712 4.95022 12.4899 4.66357 12.7013 4.45223C12.9126 4.24088 13.1992 4.12215 13.4981 4.12215C13.797 4.12215 14.0837 4.24088 14.295 4.45223L14.2959 4.4541Z'
//               fill='black'
//             />
//           </svg>
//         </button>
//       </div>

//       <div
//         ref={carouselRef}
//         className='carousel-content flex overflow-x-auto space-x-6 px-2 sm:px-6 lg:px-12 scrollbar-hidden'>
//         {reviews.map((review) => (
//           <div
//             key={review.id}
//             className='review-card min-w-[300px] bg-white border border-gray-200 rounded-lg shadow-md p-6 flex flex-col justify-between'>
//             <div className='stars text-yellow-400 flex items-center mb-4'>
//               {Array(review.rating)
//                 .fill(null)
//                 .map((_, i) => (
//                   <span key={i}>&#9733;</span>
//                 ))}
//             </div>
//             {/* Assuming 'name' and 'comment' are available in review */}
//             <h3 className='text-lg font-bold'>{review.name}</h3>
//             <p className='text-gray-600'>{review.comment}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ReviewCarousel;
