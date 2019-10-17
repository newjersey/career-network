import React from 'react';
import { useRouter } from 'next/router';

const Popup = function() {
  const router = useRouter();
  console.log(router.query);

  return <div>POPUP</div>;
};

export default Popup;
