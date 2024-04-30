import { database } from "../firebase.config";
import { ref, get } from "firebase/database";
import { CategoryModel } from "../models/CategoryModel";
import { UserAuth } from "../context/AuthContext";



async function fetchUserCategories(): Promise<CategoryModel[] | null> {
  const auth = UserAuth();
  let categoriesArray: CategoryModel[];

  if (auth?.user) {
    const categoriesRef = ref(database, `users/${auth.user.id}/categories`);
    const categoriesSnapshot = await get(categoriesRef);
    const categoriesData = categoriesSnapshot.val();

    if (categoriesData) {
      categoriesArray = Object.entries(categoriesData).map(
        ([id, category]) => ({
          ...(category as CategoryModel),
          id,
        })
      );
      return categoriesArray;
    } else {
      return null
    }
  }
  else {
    return null;
  }
}

export { fetchUserCategories };
