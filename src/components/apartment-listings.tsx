
import React from 'react';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';

interface Apartment {
  id: string;
  title: string;
  imageUrl: string;
  description: string;
  price: string;
  location: { lat: number; lng: number };
}

interface ApartmentListingsProps {
  apartments: Apartment[];
}

export const ApartmentListings: React.FC<ApartmentListingsProps> = ({apartments}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {apartments.map((apartment) => (
        <Card key={apartment.id} className="shadow-md hover:shadow-lg transition-shadow duration-300 hover:scale-105">
          <CardHeader>
            <CardTitle>{apartment.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <img src={apartment.imageUrl} alt={apartment.title} className="w-full h-40 object-cover rounded-md mb-2"/>
            <CardDescription>{apartment.description}</CardDescription>
            <p className="font-semibold">{apartment.price}</p>
            <p className="text-sm text-muted-foreground">
              Location: {apartment.location.lat}, {apartment.location.lng}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
