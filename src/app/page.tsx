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
    title: 'Cozy Studio Apartment',
    imageUrl: 'https://picsum.photos/400/300',
    description: 'A bright and modern studio apartment in the heart of downtown.',
    price: '$1,500/month',
    location: {lat: 37.7749, lng: -122.4194}, // San Francisco
  },
  {
    id: '2',
    title: 'Luxury Two-Bedroom Suite',
    imageUrl: 'https://picsum.photos/401/300',
    description: 'A spacious two-bedroom suite with stunning city views.',
    price: '$3,200/month',
    location: {lat: 34.0522, lng: -118.2437}, // Los Angeles
  },
  {
    id: '3',
    title: 'Charming One-Bedroom Flat',
    imageUrl: 'https://picsum.photos/402/300',
    description: 'A cozy one-bedroom flat in a quiet residential neighborhood.',
    price: '$2,000/month',
    location: {lat: 37.7749, lng: -122.4194}, // San Francisco
  },
];

export default function Home() {
  const [recommendations, setRecommendations] = React.useState<string | null>(null);
  const {toast} = useToast();

  const handleGetRecommendations = async () => {
    try {
      const aiResult = await recommendApartments({
        searchHistory: 'User has searched for apartments in San Francisco and Los Angeles.',
        preferences: 'User prefers modern apartments with city views and a budget of $2,000-$3,000 per month.',
      });
      setRecommendations(aiResult.recommendations);
    } catch (error: any) {
      toast({
        title: "AI Recommendation Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-primary">Rentify Homes</h1>
        <p className="text-muted-foreground">Find your perfect apartment.</p>
      </header>

      <section className="mb-8">
        <SearchBar/>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Interactive Map</h2>
        <Map/>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Apartment Listings</h2>
        <ApartmentListings apartments={mockApartments}/>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">AI Recommendations</h2>
        <Card>
          <CardHeader>
            <CardTitle>Personalized Recommendations</CardTitle>
            <CardDescription>Get apartment recommendations based on your preferences.</CardDescription>
          </CardHeader>
          <CardContent>
            {recommendations ? (
              <p>{recommendations}</p>
            ) : (
              <p>Click the button below to get personalized apartment recommendations.</p>
            )}
          </CardContent>
          <CardFooter>
            <Button onClick={handleGetRecommendations}>Get Recommendations</Button>
          </CardFooter>
        </Card>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
        <ContactForm/>
      </section>

      <footer className="text-center text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Rentify Homes. All rights reserved.</p>
      </footer>
    </div>
  );
}

