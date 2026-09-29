import {
  createContext,
  useContext,
  useSyncExternalStore,
  type ReactNode,
} from "react";

type FavoritesContextType = {
  favorites: string[];
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

type FavoritesProviderProps = {
  children: ReactNode;
};

const STORAGE_KEY = "take-favorites";

let favoritesSnapshot: string[] = [];

function getFavorites(): string[] {
  if (typeof window === "undefined") {
    return favoritesSnapshot;
  }

  return favoritesSnapshot;
}

function subscribe(callback: () => void) {
  window.addEventListener("take-favorites-updated", callback);

  return () => {
    window.removeEventListener("take-favorites-updated", callback);
  };
}

const EMPTY_FAVORITES: string[] = [];

function getServerSnapshot(): string[] {
  return EMPTY_FAVORITES;
}

function loadFavorites() {
  if (typeof window === "undefined") {
    return;
  }

  const savedFavorites = localStorage.getItem(STORAGE_KEY);

  favoritesSnapshot = savedFavorites
    ? JSON.parse(savedFavorites)
    : [];
}

export function FavoritesProvider({
  children,
}: FavoritesProviderProps) {
  const favorites = useSyncExternalStore(
    subscribe,
    getFavorites,
    getServerSnapshot
  );

  const toggleFavorite = (id: string) => {
    const updatedFavorites = favorites.includes(id)
      ? favorites.filter((favoriteId) => favoriteId !== id)
      : [...favorites, id];

    favoritesSnapshot = updatedFavorites;

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(updatedFavorites)
    );

    window.dispatchEvent(new Event("take-favorites-updated"));
  };

  const isFavorite = (id: string) => {
    return favorites.includes(id);
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        toggleFavorite,
        isFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

loadFavorites();

export function useFavorites() {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error(
      "useFavorites must be used inside FavoritesProvider"
    );
  }

  return context;
}