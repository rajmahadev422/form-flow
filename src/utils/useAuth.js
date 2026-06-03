import { create } from "zustand";
import { db } from "./fb";
import { collection, getDocs, query, where } from "firebase/firestore";
import toast from "react-hot-toast";

export const useAuth = create((set) => ({
  loading: true,

  user: null,

  set,

  feedLoad: true,

  feedbacks: null,

  getFeedback: async () => {
    const id = "63XkBh1642VRBqyNVTII";

    set({ feedLoad: true });
    try {
      const q = query(collection(db, "submissions"), where("formId", "==", id));

      const querySnapshot = await getDocs(q);
      let data = [];
      querySnapshot.forEach((doc) => {
        data.push({
          id: doc.id,
          ...doc.data().data,
          date: doc.data().createdAt,
        });
      });

      const feedbacks = data.map(({ a3hs05ff, uzck2r0j, ...rest }) => ({
        ...rest,
        rating: Number(uzck2r0j),
        comment: a3hs05ff,
      }));

      set({ feedbacks: feedbacks });
    } catch (err) {
      toast.error(err.message);
    } finally {
      set({ feedLoad: false });
    }
  },
}));
