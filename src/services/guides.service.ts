export const guidesService = {
  async getCountries() {
    try {
      const res = await fetch(
        process.env.NEXT_PUBLIC_SERVER_URL_API + "guides/countries",
        { cache: "force-cache" },
      );

      return res.json();
    } catch (e) {
      console.error(e);
      throw new Error("Ошибка получения списка стран");
    }
  },

  async getGenres() {
    try {
      const res = await fetch(
        process.env.NEXT_PUBLIC_SERVER_URL_API + "guides/genres",
        { cache: "force-cache" },
      );

      return res.json();
    } catch (e) {
      console.error(e);
      throw new Error("Ошибка получения списка стран");
    }
  },
};
