import { useQuery } from "@tanstack/react-query";
import { getHeroesByPageAction } from "../actions/get-heroes-by-page.action";

export const usePaginateHero = (page: number, limit: number, category = 'all') => {
  return useQuery({
    // queryKey: ['summary-information'],
    // queryFn: () => getSummaryAction(),
    // staleTime: 1000 * 60 * 5 // 5 minutos

    queryKey: ['heroes', { page, limit, category }], // Indica qué variables se monitorean para volver a lanzar la consulta
    queryFn: () => getHeroesByPageAction(+page, +limit, category),
    staleTime: 1000 * 60 * 5, // 5 minutos
  });
}
