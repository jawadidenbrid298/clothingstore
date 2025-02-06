'use client';
import React, {useState, useRef} from 'react';
import {generateClient} from 'aws-amplify/api';
import {createReviewshop} from '../../../graphql/mutations';
import ProtectedRoute from '@/app/Protectedroute';

const CreateReview = ({productID, onReviewSubmit}) => {
  const [name, setName] = useState('');
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const client = generateClient();

    try {
      const variables = {
        input: {
          productID,
          name,
          rating: parseFloat(rating),
          comment
        }
      };

      const result = await client.graphql({
        query: createReviewshop,
        variables
      });

      console.log('Review created:', result.data.createReviewshop);
      alert('Review submitted successfully!');

      onReviewSubmit();

      setName('');
      setRating(1);
      setComment('');
      setIsModalOpen(false);
    } catch (err) {
      console.error('Error creating review:', err);
      setError('Failed to submit the review. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={() => setIsModalOpen(true)}
        className='bg-black justify-center items-center text-white px-4 py-2 rounded-[62px]'>
        Write a Review
      </button>

      {isModalOpen && (
        <div className='fixed inset-0 z-20 bg-gray-600 bg-opacity-50 flex justify-center items-center'>
          <div ref={modalRef} className='p-4 max-w-md mx-auto bg-white rounded-lg shadow-md'>
            <h2 className='text-xl font-semibold mb-4'>Create a Review</h2>
            <form onSubmit={handleSubmit}>
              <div className='mb-4'>
                <label className='block text-sm font-medium mb-1' htmlFor='name'>
                  Name
                </label>
                <input
                  type='text'
                  id='name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className='w-full px-3 py-2 border rounded'
                  required
                />
              </div>
              <div className='mb-4'>
                <label className='block text-sm font-medium mb-1' htmlFor='rating'>
                  Rating
                </label>
                <div className='flex'>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={`cursor-pointer text-2xl ${rating >= star ? 'text-yellow-500' : 'text-gray-300'}`}
                      onClick={() => setRating(star)}>
                      ★
                    </span>
                  ))}
                </div>
              </div>
              <div className='mb-4'>
                <label className='block text-sm font-medium mb-1' htmlFor='comment'>
                  Comment
                </label>
                <textarea
                  id='comment'
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className='w-full px-3 py-2 border rounded'
                  required></textarea>
              </div>
              <button type='submit' className='bg-blue-500 text-white px-4 py-2 rounded' disabled={loading}>
                {loading ? 'Submitting...' : 'Submit Review'}
              </button>
              {error && <p className='text-red-500 mt-2'>{error}</p>}
            </form>
            <button onClick={() => setIsModalOpen(false)} className='absolute top-2 right-2 text-gray-500'>
              X
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateReview;
