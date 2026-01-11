// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBPH_T4qhXrMsAINfbKsC_aqTpJVtOmYUc",
  authDomain: "test53s.firebaseapp.com",
  projectId: "test53s",
  storageBucket: "test53s.firebasestorage.app",
  messagingSenderId: "672164580616",
  appId: "1:672164580616:web:3f5351bd759178b50d70bd",
  measurementId: "G-WK0Q228HC9"
};

// Initialize Firebase
let app;
let db;

try {
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
  console.log('Firebase initialized successfully');
} catch (error) {
  console.error('Error initializing Firebase:', error);
}

// Function to submit contact form
export async function submitContactForm(formData) {
  try {
    if (!db) {
      throw new Error('Firebase not initialized');
    }

    console.log('Submitting contact form:', formData);
    
    // Add a new document with a generated ID
    const docRef = await addDoc(collection(db, 'contactSubmissions'), {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      message: formData.message,
      timestamp: serverTimestamp()
    });
    
    console.log('Contact form submitted successfully with ID:', docRef.id);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error submitting contact form:', error);
    return { success: false, error: error.message };
  }
}

// Function to submit quote form
export async function submitQuoteForm(formData) {
  try {
    if (!db) {
      throw new Error('Firebase not initialized');
    }

    console.log('Submitting quote form:', formData);
    
    // Add a new document with a generated ID
    const docRef = await addDoc(collection(db, 'quoteSubmissions'), {
      projectType: formData.projectType,
      features: formData.selectedFeatures,
      budget: formData.budget,
      timeline: formData.timeline,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      projectDetails: formData.message,
      timestamp: serverTimestamp()
    });
    
    console.log('Quote form submitted successfully with ID:', docRef.id);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error submitting quote form:', error);
    return { success: false, error: error.message };
  }
} 