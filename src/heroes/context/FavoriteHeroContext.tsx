import { createContext, useState, type PropsWithChildren } from "react";
import type { Hero } from "../types/hero.interface";

interface FavoriteHeroContext {
  //State 
  favorites: Hero[]
  favoriteCount: number;
  //Method 
  isFavorite: (hero: Hero) => boolean;
  toggleFavorite: (hero: Hero) => void;
}

const getFavoritesFromLocalStorage = () => {
  const favorites = localStorage.getItem('favorites');

  return favorites ? JSON.parse('favorites') : [];
}

// eslint-disable-next-line react-refresh/only-export-components
export const FavoriteHeroContext = createContext({} as FavoriteHeroContext)

export const FavoriteHeroProvider = ({ children }: PropsWithChildren) => {
  const [favorites, setFavorites] = useState<Hero[]>(getFavoritesFromLocalStorage());
  
  const toggleFavorite = (hero: Hero) => {
    const heroExist = favorites.find(h => h.id === hero.id);
    if ( heroExist ) {
      const newFavorites = favorites.filter( h => h.id != hero.id );
      setFavorites(newFavorites);
      return;
    }
    setFavorites([...favorites, hero]);
    
  }

  return (
    <FavoriteHeroContext
      value={{
        favoriteCount: favorites.length,
        favorites: favorites,
        isFavorite: (hero: Hero) => favorites.some((h) => h.id === hero.id ),
        toggleFavorite: toggleFavorite,
      }}>
        { children }
    </FavoriteHeroContext>
  )
}
