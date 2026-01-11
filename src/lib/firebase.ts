import { initializeApp, getApps } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBPH_T4qhXrMsAINfbKsC_aqTpJVtOmYUc",
  authDomain: "test53s.firebaseapp.com",
  projectId: "test53s",
  storageBucket: "test53s.firebasestorage.app",
  messagingSenderId: "672164580616",
  appId: "1:672164580616:web:3f5351bd759178b50d70bd",
  measurementId: "G-WK0Q228HC9",
};

// Initialize Firebase (prevent re-initialization)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);

// Contact form submission
export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export async function submitContactForm(
  formData: ContactFormData
): Promise<{ success: boolean; id?: string; error?: string }> {
  try {
    const docRef = await addDoc(collection(db, "contactSubmissions"), {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      message: formData.message,
      timestamp: serverTimestamp(),
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error submitting contact form:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

// Quote form submission
export interface QuoteFormData {
  projectType: string;
  selectedFeatures: string[];
  budget: string;
  timeline: string;
  name: string;
  email: string;
  phone: string;
  projectDetails: string;
}

export async function submitQuoteForm(
  formData: QuoteFormData
): Promise<{ success: boolean; id?: string; error?: string }> {
  try {
    const docRef = await addDoc(collection(db, "quoteSubmissions"), {
      projectType: formData.projectType,
      features: formData.selectedFeatures,
      budget: formData.budget,
      timeline: formData.timeline,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      projectDetails: formData.projectDetails,
      timestamp: serverTimestamp(),
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error submitting quote form:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
