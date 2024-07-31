import { useEffect, useState } from "react";
import { guidesService } from "@/services/guides.service";

export const useGetGenresList = () => {
  const [genres, setGenres] = useState<string[]>([]);
  const [isLoadingGenres, setIsLoadingGenres] = useState(false);

  const getGenres = async () => {
    try {
      setIsLoadingGenres(true);
      const genresList = await guidesService.getGenres();
      setGenres(genresList);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoadingGenres(false);
    }
  };

  useEffect(() => {
    getGenres();
  }, []);

  return { genres, isLoadingGenres };
};
