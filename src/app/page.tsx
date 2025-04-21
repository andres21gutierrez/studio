'use client';

import React from 'react';
import { SearchBar } from '@/components/search-bar';
import { ApartmentListings } from '@/components/apartment-listings';
import { ContactForm } from '@/components/contact-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { recommendApartments } from '@/ai/flows/recommend-apartments';
import { useToast } from "@/hooks/use-toast";

const mockApartments = [
  {
    id: '1',
    title: 'Acogedor Estudio en el Centro',
    imageUrl: 'https://a0.muscache.com/im/pictures/miso/Hosting-30931885/original/6e6b084c-c60f-4470-a5a1-052eaf784ffb.jpeg?im_w=1200',
    description: 'Un estudio luminoso y moderno en el corazón de la ciudad.',
    price: '$1,500/mes',
    location: { lat: 37.7749, lng: -122.4194 }, // San Francisco
  },
  {
    id: '2',
    title: 'Suite de Lujo con Dos Habitaciones',
    imageUrl: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/495151043.jpg?k=2627cc0d8dbc03779b41e2ae2d8c895667616ed625da7025bb3a58ccade7e878&o=',
    description: 'Una espaciosa suite de dos habitaciones con impresionantes vistas a la ciudad.',
    price: '$3,200/mes',
    location: { lat: 34.0522, lng: -118.2437 }, // Los Angeles
  },
  {
    id: '3',
    title: 'Encantador Apartamento de Una Habitación',
    imageUrl: 'https://a0.muscache.com/im/pictures/hosting/Hosting-1310176124824671685/original/682294fd-e2af-49ed-a4f5-39ca241e1621.jpeg?im_w=1200',
    description: 'Un apartamento acogedor de una habitación en un barrio residencial tranquilo.',
    price: '$2,000/mes',
    location: { lat: 37.7749, lng: -122.4194 }, // San Francisco
  },
];

export default function Home() {
  const [recommendations, setRecommendations] = React.useState<string | null>(null);
  const { toast } = useToast();

  const handleGetRecommendations = async () => {
    try {
      const aiResult = await recommendApartments({
        searchHistory: 'El usuario ha buscado apartamentos en San Francisco y Los Ángeles.',
        preferences: 'El usuario prefiere apartamentos modernos con vistas a la ciudad y un presupuesto de $2,000-$3,000 al mes.',
      });
      setRecommendations(aiResult.recommendations);
    } catch (error: any) {
      toast({
        title: "Error de Recomendación AI",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="flex flex-col items-center justify- text-center px-4">
        {/* Título principal */}
        <h1 className="text-6xl sm:text-8xl font-extrabold text-gray-800 dark:text-white tracking-tight leading-tight mb-4 drop-shadow-lg">
          Sumaq<span className="text-primary">Wasi</span>
        </h1>
        {/* Subtítulo opcional */}
        <p className="text-lg sm:text-2xl text-gray-600 dark:text-gray-300 max-w-xl mx-auto mt-2 mb-16">
          Tu espacio de gestión y desarrollo con identidad local.
        </p>
        {/* Fondo con animación sutil o un mapa visual */}
        <div className="w-full h-64 mb-8">
          <iframe
            width="100%"
            height="100%"

            frameBorder="0"
            scrolling="no"
            src="https://www.openstreetmap.org/export/embed.html?bbox=-69.65%2C-22.90%2C-57.30%2C-09.67&amp;layer=mapnik&amp;marker=-16.50%2C-68.15"          />
        </div>
        {/* Superposición para mayor contraste si el fondo es cargado */}
        <div className="absolute inset-0 bg-white/70 dark:bg-black/50 -z-10" />




      </header>

      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-semibold mb-4">Listado de Apartamentos</h2>
        <ApartmentListings apartments={mockApartments} />
      </section>

      <section className="mb-8 rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4">Recomendaciones de AI</h2>
        <Card>
          <CardHeader>
            <CardTitle>Recomendaciones Personalizadas</CardTitle>
            <CardDescription>Obtén recomendaciones de apartamentos basadas en tus preferencias.</CardDescription>
          </CardHeader>
          <CardContent>
            {recommendations ? (
              <p>{recommendations}</p>
            ) : (
              <p>Haz clic en el botón de abajo para obtener recomendaciones de apartamentos personalizadas.</p>
            )}
          </CardContent>
          <CardFooter>
            <Button onClick={handleGetRecommendations}>Obtener Recomendaciones</Button>
          </CardFooter>
        </Card>
      </section>

      <section className="mb-8 rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4">Contáctanos</h2>
        <ContactForm />
      </section>

      <footer className="text-center text-gray-500 mt-12">
        <p>&copy; {new Date().getFullYear()} SumaWasi. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}
