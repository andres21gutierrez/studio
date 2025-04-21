'use client';

import React from 'react';
import {Map} from '@/components/map';
import {SearchBar} from '@/components/search-bar';
import {ApartmentListings} from '@/components/apartment-listings';
import {ContactForm} from '@/components/contact-form';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from '@/components/ui/card';
import {recommendApartments} from '@/ai/flows/recommend-apartments';
import {useToast} from "@/hooks/use-toast";

const mockApartments = [
  {
    id: '1',
    title: 'Acogedor Estudio en el Centro',
    imageUrl: 'https://picsum.photos/400/300',
    description: 'Un estudio luminoso y moderno en el corazón de la ciudad.',
    price: '$1,500/mes',
    location: {lat: 37.7749, lng: -122.4194}, // San Francisco
  },
  {
    id: '2',
    title: 'Suite de Lujo con Dos Habitaciones',
    imageUrl: 'https://picsum.photos/401/300',
    description: 'Una espaciosa suite de dos habitaciones con impresionantes vistas a la ciudad.',
    price: '$3,200/mes',
    location: {lat: 34.0522, lng: -118.2437}, // Los Angeles
  },
  {
    id: '3',
    title: 'Encantador Apartamento de Una Habitación',
    imageUrl: 'https://picsum.photos/402/300',
    description: 'Un apartamento acogedor de una habitación en un barrio residencial tranquilo.',
    price: '$2,000/mes',
    location: {lat: 37.7749, lng: -122.4194}, // San Francisco
  },
];

export default function Home() {
  const [recommendations, setRecommendations] = React.useState<string | null>(null);
  const {toast} = useToast();

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
    <div className="container mx-auto p-4">
      <header className="mb-8 rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-primary">Rentify Homes</h1>
        <p className="text-muted-foreground">Encuentra tu apartamento perfecto.</p>
      </header>

      <section className="mb-8 rounded-lg shadow-md p-6">
        <SearchBar/>
      </section>

      <section className="mb-8 rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4">Mapa Interactivo</h2>
        <Map/>
      </section>

      <section className="mb-8 rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4">Listado de Apartamentos</h2>
        <ApartmentListings apartments={mockApartments}/>
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
        <ContactForm/>
      </section>

      <footer className="text-center text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Rentify Homes. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}
