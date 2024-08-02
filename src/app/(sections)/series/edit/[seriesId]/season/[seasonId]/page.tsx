import React from "react";
import EditSeason from "@/components/adminPage/editSeason/EditSeason";
import { seriesService } from "@/services/series.service";

export const revalidate = 0;

const Page = async ({
  params,
}: {
  params: { seriesId: number; seasonId: number };
}) => {
  const data = await seriesService.getSeasonById(Number(params.seasonId));

  return <EditSeason seasonDetails={data} />;
};

export default Page;
