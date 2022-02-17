import React, { useState, useEffect, useRef } from 'react';
import { submitComment } from '../services';

const CommentForm = ({ slug }: any) => {
  const [error, setError] = useState(false);
  const [localStorage, setLocalStorage] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [formData, setFormData] = useState({
    name: null,
    email: null,
    comment: null,
    storeData: false,
  });
  const commentEl = useRef<any>();
  const nameEl = useRef<any>();
  const emailEl = useRef<any>();
  const storeDataEl = useRef<any>();

  useEffect(() => {
    setLocalStorage(window.localStorage);
    const initialFormData = {
      name: window.localStorage.getItem('name'),
      email: window.localStorage.getItem('email'),
      storeData:
        window.localStorage.getItem('name') ||
        window.localStorage.getItem('email'),
    };
    setFormData(initialFormData);
  }, []);
  const handleCommentSubmission = () => {
    setError(false);
    const comment = commentEl.current.value;
    const name = nameEl.current.value;
    const email = emailEl.current.value;
    const storeData = storeDataEl.current.checked;
    if (!comment || !name || !email) {
      setError(true);
      return;
    }

    const commentObj = {
      name,
      email,
      comment,
      slug,
    };

    if (storeData) {
      window.localStorage.setItem('name', name);
      window.localStorage.setItem('email', email);
    } else {
      window.localStorage.removeItem('name', name);
      window.localStorage.removeItem('email', email);
    }
    submitComment(commentObj).then(() => {
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
    });
  };

  return (
    <div className="mb-8 rounded-lg bg-white p-8 pb-12 shadow-lg">
      <h3 className="mb-8 border-b pb-4 text-xl font-semibold">CommentForm</h3>
      <div className="mb-4 grid grid-cols-1 gap-4">
        <textarea
          ref={commentEl}
          placeholder="Comment"
          name="comment"
          className="w-full rounded-lg bg-gray-100 p-4 text-gray-700 outline-none focus:ring-2 focus:ring-gray-200"
        />
      </div>
      <div className="mb-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <input
          type="text"
          ref={nameEl}
          placeholder="Name"
          name="name"
          className="w-full rounded-lg bg-gray-100 p-2 px-4 text-gray-700 outline-none focus:ring-2 focus:ring-gray-200"
        />
        <input
          type="text"
          ref={emailEl}
          placeholder="Email"
          name="email"
          className="w-full rounded-lg bg-gray-100 p-2 px-4 text-gray-700 outline-none focus:ring-2 focus:ring-gray-200"
        />
      </div>
      <div className="mb-4 grid grid-cols-1 gap-4">
        <div>
          <input
            type="checkbox"
            ref={storeDataEl}
            id="storeData"
            name="storeData"
            value="true"
            className="cursor-pointer"
          />
          <label
            htmlFor="storeData"
            className="ml-2 cursor-pointer text-gray-500"
          >
            Store data in local storage
          </label>
        </div>
      </div>
      {error && (
        <p className="text-xs text-red-500">All fields are required.</p>
      )}
      <div className="mt-8">
        <button
          type="button"
          className="ease inline-block rounded-full bg-pink-600 px-8 py-3 text-lg text-white transition duration-500 hover:bg-indigo-900"
          onClick={handleCommentSubmission}
        >
          Post Comment
        </button>
        {showSuccessMessage && (
          <span className="float-right mt-3 text-xl font-semibold text-green-500">
            Comment submitted for review
          </span>
        )}
      </div>
    </div>
  );
};

export default CommentForm;
