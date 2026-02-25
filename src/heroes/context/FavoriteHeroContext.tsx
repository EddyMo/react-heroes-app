import { createContext, useEffect, useState, type PropsWithChildren } from "react";
import type { Hero } from "../types/hero.interface";

interface FavoriteHeroContext {
  // Estado
  favoriteCount: number;
  favorites: Hero[];

  // Métodos
  isFavorite: (hero: Hero) => boolean;
  toogleFavorite: (hero: Hero) => void;
}

export const FavoriteHeroContext = createContext({} as FavoriteHeroContext);

const getFavoritesFromLocalStorage = () => {
  const favorites = localStorage.getItem('favorites');
  return favorites ? JSON.parse(favorites) : [];
}

export const FavoriteHeroProvider = ({ children }: PropsWithChildren) => {
  const [favorites, setFavorites] = useState<Hero[]>(getFavoritesFromLocalStorage);

  const toggleFavorite = (hero: Hero) => {
    const heroExist = favorites.find((h) => h.id === hero.id);
    // Si existe (se lo retira)
    if (heroExist) {
      const newFavorites = favorites.filter((h) => h.id != hero.id);
      setFavorites(newFavorites);
      return;
    }
    // Si no existe (se lo agrega)
    setFavorites([...favorites, hero]);
  }

  // const isFavorite = (hero: Hero) => favorites.some((h) => h.id === hero.id);
  const isFavorite = (hero: Hero) => {
    return favorites.some((h) => h.id === hero.id);
  }

  // Para guardar los cambios en favoritos en la memoria local, cada vez que cambie el arreglo de favoritos
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  return (
    <FavoriteHeroContext
      value={{
        // Estados
        favoriteCount: favorites.length,
        favorites: favorites,

        // Métodos
        // isFavorite: (hero: Hero) => favorites.some((h) => h.id === hero.id),
        isFavorite: isFavorite,
        toogleFavorite: toggleFavorite,
      }}
    >
      {children}
    </FavoriteHeroContext>

  )
}