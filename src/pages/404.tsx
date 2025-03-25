import React from 'react';
import { setUser } from '../store/actions/userActions';
import { useDispatch } from 'react-redux';

const NotFoundPage: React.FC = () => (
  <div>
    <h2>404 - Not Found</h2>
    <p>The page you are looking for does not exist.</p>
  </div>
);

export default NotFoundPage;
