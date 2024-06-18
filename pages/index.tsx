// pages/index.tsx
import React, { useEffect, useState } from 'react';
import mixpanel from 'mixpanel-browser';

interface FormData {
  name: string;
  email: string;
  password: string;
}

const Home: React.FC = () => {
  const [showForm, setShowForm] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
        mixpanel.init('fb24bac723aa2227b14b30dd0484f832', { ignore_dnt: true, debug: true });
        console.log('Mixpanel initialized in the browser');
        mixpanel.track('Page Loaded');
    }
  }, []);

  const handleCTA = () => {
    setShowForm(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mixpanel.track('Form Submitted', formData);

    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Form submitted successfully');
        setFormData({ name: '', email: '', password: '' });
      } else {
        console.error('Error submitting form');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container">
      <div className="hero">
        <h1>Welcome to My Landing Page</h1>
        <p>Experience the power of our amazing product.</p>
        <button onClick={handleCTA}>Sign Up Now</button>
      </div>
      {showForm && (
        <div className="form-container">
          <h2>Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="submit-btn">
              Submit
            </button>
          </form>
        </div>
      )}
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
        }
        .hero {
          text-align: center;
          margin-bottom: 2rem;
        }
        .form-container {
          background-color: #f0f0f0;
          padding: 2rem;
          border-radius: 0.5rem;
          max-width: 400px;
          width: 100%;
        }
        .form-group {
          margin-bottom: 1rem;
        }
        label {
          display: block;
          font-weight: bold;
          margin-bottom: 0.5rem;
        }
        input {
          display: block;
          width: 100%;
          padding: 0.5rem;
          border: 1px solid #ccc;
          border-radius: 0.25rem;
        }
        .submit-btn {
          background-color: #007bff;
          color: #fff;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 0.25rem;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }
        .submit-btn:hover {
          background-color: #0056b3;
        }
      `}</style>
    </div>
  );
};

export default Home;