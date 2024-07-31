import { seriesService } from "@/services/series.service";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const useDeleteEpisode = (episodeId: number, closeModal: () => void) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const deleteEpisode = async () => {
    try {
      setIsLoading(true);
      await seriesService.deleteEpisode(episodeId);
      closeModal();
      router.refresh();
      toast.success("Эпизод удален");
    } catch (e) {
      toast.error("Ошибка при удалении эпизода");
    } finally {
      setIsLoading(false);
    }
  };

  return { data: { isLoading }, actions: { deleteEpisode } };
};
