"use client"

// import { Input } from "@/components/ui/input"
// import { Badge } from "@/components/ui/badge"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Progress } from "@/components/ui/progress"
import { use, useMemo } from "react"


import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { CustomJumbotron } from "@/components/custom/CustomJumbotron"
import { HeroStats } from "@/heroes/components/HeroStats"
import { HeroGrid } from "@/heroes/components/HeroGrid"
import { CustomPagination } from "@/components/custom/CustomPagination"
import { CustomBreadcrumbs } from "@/components/custom/CustomBreadcrumbs"
import { useSearchParams } from "react-router-dom";
import { useHeroSummary } from "@/heroes/hooks/useHeroSummary";
import { usePaginateHero } from "@/heroes/hooks/usePaginateHero";
import { FavoriteHeroContext } from "@/heroes/context/FavoriteHeroContext"


// export default function SuperheroApp() {
export const HomePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const { favoriteCount, favorites } = use(FavoriteHeroContext);


  const activeTab = searchParams.get('tab') ?? 'all';
  const page = searchParams.get('page') ?? '1';
  const limit = searchParams.get('limit') ?? '6';
  const category = searchParams.get('category') ?? 'all';

  const selectedTab = useMemo(() => {
    const validTabs = ['all', 'favorites', 'heroes', 'villains'];
    return validTabs.includes(activeTab) ? activeTab : 'all';
  }, [activeTab])

  const { data: heroesResponse } = usePaginateHero(+page, +limit, category);
  const { data: summary } = useHeroSummary();

  return (
    <>
      <>
        {/* Header */}
        <CustomJumbotron
          title="Universo de SuperHéroes"
          description="Descubre, explora y administra SuperHéroes"
        />

        <CustomBreadcrumbs currentPage="Super Héroes" />
        {/* Stats Dashboard */}
        <HeroStats />

        {/* Controls */}



        {/* Tabs */}
        <Tabs value={selectedTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-4">
            {/* <TabsTrigger value="all" onClick={() => setSearchParams('?tab=all')}></TabsTrigger> */}
            <TabsTrigger value="all"
              onClick={() => setSearchParams((prev) => {
                prev.set('tab', 'all');
                prev.set('category', 'all');
                prev.set('page', '1');
                return prev;
              })}>
              All Characters ({summary?.totalHeroes})
            </TabsTrigger>
            <TabsTrigger value="favorites"
              onClick={() => setSearchParams((prev) => {
                prev.set('tab', 'favorites')
                return prev;
              })}
              className="flex items-center gap-2">
              Favorites ({favoriteCount})
            </TabsTrigger>
            <TabsTrigger value="heroes"
              onClick={() => setSearchParams((prev) => {
                prev.set('tab', 'heroes');
                prev.set('category', 'hero');
                prev.set('page', '1');
                return prev;
              })}
            >
              Heroes ({summary?.heroCount})
            </TabsTrigger>
            <TabsTrigger value="villains"
              onClick={() => setSearchParams((prev) => {
                prev.set('tab', 'villains');
                prev.set('category', 'villain');
                prev.set('page', '1');
                return prev;
              })}>
              Villains ({summary?.villainCount})
            </TabsTrigger>
          </TabsList>

          <TabsContent value='all'>
            <h1>Todos los personajes</h1>
            <HeroGrid heroes={heroesResponse?.heroes ?? []} />
          </TabsContent>
          <TabsContent value='favorites'>
            <h1>Favoritos</h1>
            <HeroGrid heroes={favorites} />
          </TabsContent>
          <TabsContent value='heroes'>
            <h1>Héroes</h1>
            <HeroGrid heroes={heroesResponse?.heroes ?? []} />
          </TabsContent>
          <TabsContent value='villains'>
            <h1>Villanos</h1>
            <HeroGrid heroes={heroesResponse?.heroes ?? []} />
          </TabsContent>

        </Tabs>


        {/* Pagination */}
        {
          (selectedTab != 'favorites') && (
            <CustomPagination totalPages={heroesResponse?.pages ?? 1} />
          )
        }


      </>
    </>
  )
}
// function getSummaryAction(): any {
//   throw new Error("Function not implemented.");
// }

