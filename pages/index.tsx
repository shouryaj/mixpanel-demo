// pages/index.tsx
import React, { useEffect, useState } from 'react';
import mixpanel from 'mixpanel-browser';

interface FormData {
  name: string;
  email: string;
  company: string;
}

const Home: React.FC = () => {
  const [showForm, setShowForm] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
  });
  const [showButton, setShowButton] = useState<boolean>(true);
  const [showThankYou, setShowThankYou] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
        mixpanel.init('fb24bac723aa2227b14b30dd0484f832', { ignore_dnt: true, debug: true });
        console.log('Mixpanel initialized in the browser');
        mixpanel.track('Page Loaded');
    }
  }, []);

  const handleCTA = () => {
    mixpanel.track('CTA Clicked');

    setShowForm(true);
    setShowButton(false);
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
        mixpanel.track('Form Submitted Success', response);
        setFormData({ name: '', email: '', company: '' });
      } else {
        mixpanel.track('Form Submitted Failure', response);
        console.error('Error submitting form');
      }
    } catch (error) {
      console.error('Error:', error);
    }

    setShowForm(false);
    setShowThankYou(true);
  };

  return (
    <div className="container">
      <div className="hero">
        {showButton && (
        <div>        
          <p>Self-serve analytics at scale</p>
          <button className="button-9" onClick={handleCTA}>Get Access</button>
        </div>
        )}
        {showThankYou && (
          <p>Thank you! We will reach out to you shortly. In the meantime, keep in touch with us through our <a href="#">blog</a>.</p>
        )}
      </div>
      {showForm && (
        <div className="form-container">
          <p className='form-name'>Sign-Up For Access</p>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Name"
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
                placeholder="Business email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="company">Company</label>
              <input
                type="company"
                id="company"
                name="company"
                placeholder="Organization name"
                value={formData.company}
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="submit-btn">
              Get Started
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
          background-image: url('mixpanel_big.png');
          background-repeat: no-repeat;
          background-position: center;
          background-size: cover;
          background-color: #f3eef9;
          box-shadow: 0 0 10px 10px white inset;
        }
        .hero {
          text-align: center;
          margin-top: 20rem;
          margin-bottom: 2rem;
          font-size: 20px;
        }
        .form-name {
          text-align: center;
          font-size: 20px;
          align-items: center;
          justify-content: center;
        }
        .form-container {
          margin-top: 15rem;
          padding: 2rem;
          border-radius: 0.5rem;
          max-width: 400px;
          width: 100%;
          padding-bottom: 10rem;
          padding-top: 5rem;
          font-weight: bold;
        }
        .form-group {
          margin-bottom: 1rem;
        }
        label {
          align-items: center;
          display: block;
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
        /* CSS */
        .button-9 {
          appearance: button;
          backface-visibility: hidden;
          background-color: #405cf5;
          border-radius: 6px;
          border-width: 0;
          box-shadow: rgba(50, 50, 93, .1) 0 0 0 1px inset,rgba(50, 50, 93, .1) 0 2px 5px 0,rgba(0, 0, 0, .07) 0 1px 1px 0;
          box-sizing: border-box;
          color: #fff;
          cursor: pointer;
          font-family: -apple-system,system-ui,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif;
          font-size: 100%;
          height: 44px;
          line-height: 1.15;
          margin: 12px 0 0;
          outline: none;
          overflow: hidden;
          padding: 0 25px;
          position: relative;
          text-align: center;
          text-transform: none;
          transform: translateZ(0);
          transition: all .2s,box-shadow .08s ease-in;
          user-select: none;
          -webkit-user-select: none;
          touch-action: manipulation;
          width: 100%;
        }

        .button-9:disabled {
          cursor: default;
        }

        .button-9:focus {
          box-shadow: rgba(50, 50, 93, .1) 0 0 0 1px inset, rgba(50, 50, 93, .2) 0 6px 15px 0, rgba(0, 0, 0, .1) 0 2px 2px 0, rgba(50, 151, 211, .3) 0 0 0 4px;
        }
      `}</style>
    </div>
  );
};

export default Home;