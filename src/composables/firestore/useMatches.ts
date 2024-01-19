// src/composables/useFirestore.ts

import { ref } from 'vue';
import { db } from '@/firebaseConfig';
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';

const items: any = ref([]);

const loadItems = async () => {
  const matchesCollection = collection(db, 'matches'); // 'items' is the name of your collection
  const querySnapshot = await getDocs(matchesCollection);
  items.value = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

const addItem = async (item: any) => {
  try {
    const newItemRef = await addDoc(collection(db, 'items'), item);
    loadItems(); // Reload the items after adding a new one
    console.log('Item added with ID: ', newItemRef.id);
  } catch (error) {
    console.error('Error adding item: ', error);
  }
};

const updateItem = async (itemId: any, updatedItem: any) => {
  try {
    const itemDocRef = doc(db, 'items', itemId);
    await updateDoc(itemDocRef, updatedItem);
    loadItems(); // Reload the items after updating
    console.log('Item updated successfully');
  } catch (error) {
    console.error('Error updating item: ', error);
  }
};

const deleteItem = async (itemId: any) => {
  try {
    const itemDocRef = doc(db, 'items', itemId);
    await deleteDoc(itemDocRef);
    loadItems(); // Reload the items after deleting
    console.log('Item deleted successfully');
  } catch (error) {
    console.error('Error deleting item: ', error);
  }
};

export { items, loadItems, addItem, updateItem, deleteItem };
