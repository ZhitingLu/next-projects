// asynchronous 
// server side

import React from 'react';
import { app } from '../../../firebase';
import { doc, getDoc, getFirestore } from 'firebase/firestore';

export default async function PostPage({ params }) {
  const db = getFirestore(app);
  let data = {};
  const querySnapshot = await getDoc(doc(db, 'posts', params.id));
  data = querySnapshot.exists() ? { id: querySnapshot.id, ...querySnapshot.data() } : null;
  if (!data) {
    return <div>Post not found</div>;
  }
  // You can pass the data to a component or render it directly here
  // For example, you can use a Post component to display the post
  return (
    <div>
      {data.id}
      <p>{data.text}</p>
    </div>
  )
}