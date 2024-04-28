import { database } from "../firebase.config";
import { ref, get } from "firebase/database";
import { useNavigate } from "react-router-dom";
import { CategoryModel } from "../models/CategoryModel";
import { UserAuth } from "../context/AuthContext";



async function fetchUserCategories(): Promise<CategoryModel[]> {
  const auth = UserAuth();
  const navigate = useNavigate();
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
    }
  }
}
