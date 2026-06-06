import { create } from "zustand";

import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "./fb";
import toast from "react-hot-toast";

export const useForm = create((set, get) => ({
  loading: false,

  saveForm: async (formData) => {
    set({ loading: true });
    try {
      const docRef = await addDoc(collection(db, "forms"), {
        ...formData,
        createdAt: new Date(),
      });

      toast.success("Document created successfully!");
      return true;
    } catch (err) {
      toast.error(err.message);
      console.log(err.message);
      return false;
    } finally {
      set({ loading: false });
    }
  },
  forms: null,

  getUserForm: async (uid) => {
    set({ loading: true });
    try {
      const q = query(collection(db, "forms"), where("uid", "==", uid));

      const querySnapshot = await getDocs(q);
      let data = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });
      set({ forms: data });
    } catch (err) {
      toast.error(err.message);
      console.log(err.message);
    } finally {
      set({ loading: false });
    }
  },

  up: null,

  updateToComplete: async (id) => {
    set({up: id});
    try {
      const formRef = doc(db, "forms", id);

      const updatedForm = get().forms.map(form => (form.id === id) ? {...form, status: "completed"} : form);
      set({forms: updatedForm});
      await updateDoc(formRef, {
        status: "completed",
      });

      toast.success("Updated successfully!");
    } catch (err) {
      toast.error(err.message);
    } finally {
      set({up: false});
    }
  },
}));

export const useSubmitForm = create((set) => ({
  loading: false,
  form: null,

  submitForm: async (form) => {
    try {
      const docRef = await addDoc(collection(db, "submissions"), {
        ...form,
        createdAt: new Date(),
      });

      toast.success("Submitted successfully!");
      return true;
    } catch (err) {
      toast.error(err.message);
      console.log(err.message);
      return false;
    } finally {
      set({ loading: false });
    }
    console.log(form);
  },

  getFormById: async (id) => {
    set({ loading: true });
    try {
      const docRef = doc(db, "forms", id);

      const docSnap = await getDoc(docRef);
      let data = {};
      if (docSnap.exists()) {
        data = {
          id: docSnap.id,
          ...docSnap.data(),
        };
        set({ form: data, loading: false });
      } else toast.error("Document not found");
    } catch (err) {
      toast.error(err.message);
    } finally {
      set({ loading: false });
    }
  },
}));

export const useResponse = create((set, get) => ({
  loading: false,

  response: null,
  responseData: null,

  ownerLoad: false,

  isFormOwner: async (formId, currentUserUid) => {
    const formRef = doc(db, "forms", formId);
    const formSnap = await getDoc(formRef);

    if (!formSnap.exists()) {
      return false;
    }

    const formData = formSnap.data();

    const owner = formData.uid === currentUserUid;
    set({owner: owner});
    return owner
  },

  getResponseData: async (id, uid) => {
    if (!id || !uid) return;
    set({ loading: true });
    try {
      const isFormOwner = await get().isFormOwner(id, uid);
      if (!isFormOwner) {
        toast.error("Form not Found");
        return;
      }
      const q = query(collection(db, "submissions"), where("formId", "==", id));

      const querySnapshot = await getDocs(q);
      let data = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });
      set({ responseData: data });
    } catch (err) {
      toast.error(err.message);
      console.log(err.message);
    } finally {
      set({ loading: false });
    }
  },
}));
