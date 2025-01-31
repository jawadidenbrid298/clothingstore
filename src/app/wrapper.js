'use client';
import React, {ReactNode} from 'react';
import {Amplify} from 'aws-amplify';
import awsConfig from '../amplifyconfiguration.json';

Amplify.configure({...awsConfig});

const CustomProvider = ({children}) => {
  return (
    <>
      <main>{children}</main>
    </>
  );
};

export default CustomProvider;
