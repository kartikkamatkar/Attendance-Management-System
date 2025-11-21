// src/components/FaceRegistration.jsx
import React, { useState, useRef } from 'react';
import { studentAPI } from '../services/api';

const FaceRegistration = ({ student, onRegistrationComplete }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState('');
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { width: 640, height: 480 } 
      });
      videoRef.current.srcObject = stream;
      streamRef.current = stream;
    } catch (error) {
      console.error('Error accessing camera:', error);
      setMessage('Cannot access camera. Please check permissions.');
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
  };

  const captureFace = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    return canvas.toDataURL('image/jpeg');
  };

  const registerFace = async () => {
    setIsRegistering(true);
    setProgress(0);
    setMessage('Starting face registration...');

    try {
      await startCamera();
      setProgress(20);
      
      // Wait for camera to initialize
      await new Promise(resolve => setTimeout(resolve, 1000));
      setProgress(40);
      
      // Capture multiple images for better training
      const faceImages = [];
      for (let i = 0; i < 5; i++) {
        setMessage(`Capturing face image ${i + 1}/5...`);
        faceImages.push(captureFace());
        await new Promise(resolve => setTimeout(resolve, 500));
        setProgress(40 + (i * 10));
      }
      
      setProgress(90);
      setMessage('Processing face data...');
      
      // Send to backend
      const response = await studentAPI.registerFace({
        studentId: student.id,
        images: faceImages
      });
      
      setProgress(100);
      setMessage('Face registration completed successfully!');
      
      // Notify parent component
      if (onRegistrationComplete) {
        onRegistrationComplete();
      }
      
      // Stop camera
      stopCamera();
      
    } catch (error) {
      console.error('Face registration failed:', error);
      setMessage('Face registration failed. Please try again.');
    } finally {
      setIsRegistering(false);
    }
  };

  return (
    <div className="face-registration">
      <h3>Face Registration</h3>
      
      {!student.faceRegistered ? (
        <div className="registration-container">
          <p>Register your face for automatic attendance marking</p>
          
          <div className="camera-preview">
            <video 
              ref={videoRef} 
              autoPlay 
              playsInline
              style={{ display: isRegistering ? 'block' : 'none' }}
            />
            <canvas ref={canvasRef} style={{ display: 'none' }} />
          </div>
          
          {isRegistering ? (
            <div className="registration-progress">
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <p>{message}</p>
            </div>
          ) : (
            <button 
              onClick={registerFace}
              className="register-face-btn"
            >
              🎯 Start Face Registration
            </button>
          )}
        </div>
      ) : (
        <div className="registration-complete">
          <div className="success-message">
            ✅ Face successfully registered!
          </div>
          <p>Your face is now registered for automatic attendance.</p>
        </div>
      )}
    </div>
  );
};

export default FaceRegistration;