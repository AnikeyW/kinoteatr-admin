import { useEffect, useState } from "react";
import { guidesService } from "@/services/guides.service";

export const useGetCountriesList = () => {
  const [countries, setCountries] = useState<string[]>([]);
  const [isLoadingCountries, setIsLoadingCountries] = useState(false);

  const getCoutries = async () => {
    try {
      setIsLoadingCountries(true);
      const countriesList = await guidesService.getCountries();
      setCountries(countriesList);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoadingCountries(false);
    }
  };

  useEffect(() => {
    getCoutries();
  }, []);

  return { countries, isLoadingCountries };
};
