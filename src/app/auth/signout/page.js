'use client';
import React from 'react';
import {signOut} from 'aws-amplify/auth'; // Importing signOut
import {fetchAuthSession} from 'aws-amplify/auth'; // Importing fetchAuthSession

const SignOutButton = () => {
  const handleSignOut = async () => {
    try {
      // Fetch current session to check if the user is logged in
      const session = await fetchAuthSession();
      console.log('Current session before sign-out:', session);

      if (session && session.isValid) {
        // If session exists, check for tokens
        const {accessToken, idToken} = session.tokens ?? {};
        if (accessToken && idToken) {
          console.log('User is logged in with access and ID tokens.');
        }

        // Sign out the user and clear the session globally
        await signOut();
        localStorage.clear(); // Clear localStorage
        sessionStorage.clear(); // Ensures session is cleared everywhere
        console.log('User signed out and session cleared.');
      }

      // Fetch session again after sign-out
      const postSignOutSession = await fetchAuthSession();
      console.log('Session after sign-out:', postSignOutSession);

      // If the session is still valid, it means the sign-out didn't fully clear the session
      if (!postSignOutSession || !postSignOutSession.isValid) {
        console.log('No valid session found, redirecting to homepage...');
        // Force a redirect to homepage after sign-out
        window.location.href = '/';
      } else {
        console.log('Session still exists, retrying sign-out...');
        // If session still exists unexpectedly, retry the sign-out
        await signOut({global: true});
        window.location.href = '/';
      }
    } catch (error) {
      console.error('Error during sign-out:', error);
    }
  };

  return (
    <button
      onClick={handleSignOut}
      className='bg-black hover:bg-white text-white hover:text-black font-semibold py-2 px-4 rounded-md'>
      Sign Out
    </button>
  );
};

export default SignOutButton;
