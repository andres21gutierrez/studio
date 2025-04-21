'use client';

import React, {useState} from 'react';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {Slider} from '@/components/ui/slider';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover';

export const SearchBar = () => {
  const [location, setLocation] = useState('');
  const [priceRange, setPriceRange] = useState<number[]>([0, 5000]);
  const [amenities, setAmenities] = useState<string[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value);
  };

  const handlePriceRangeChange = (value: number[]) => {
    setPriceRange(value);
  };

  const handleAmenityChange = (amenity: string) => {
    if (amenities.includes(amenity)) {
      setAmenities(amenities.filter((a) => a !== amenity));
    } else {
      setAmenities([...amenities, amenity]);
    }
  };

  const handleApplyFilters = () => {
    // Implement logic to apply filters (e.g., update apartment listings)
    console.log('Applying filters:', {location, priceRange, amenities});
    setIsFilterOpen(false); // Close the filter popover
  };

  const handleClearFilters = () => {
    setLocation('');
    setPriceRange([0, 5000]);
    setAmenities([]);
  };

  return (
    <div className="w-full">
      <div className="flex items-center space-x-2">
        <Input
          type="text"
          placeholder="Buscar apartamentos..."
          className="rounded-full shadow-md"
          value={location}
          onChange={handleLocationChange}
        />
        <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="rounded-full shadow-md">
              Filtros
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-4">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-muted-foreground">Rango de Precio</label>
                <div className="flex items-center space-x-2">
                  ${priceRange[0]}
                  <Slider
                    defaultValue={priceRange}
                    max={5000}
                    step={100}
                    onValueChange={handlePriceRangeChange}
                  />
                  ${priceRange[1]}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-muted-foreground">Comodidades</label>
                <div className="flex flex-wrap space-x-2">
                  <Button
                    variant={amenities.includes('gym') ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => handleAmenityChange('gym')}
                  >
                    Gimnasio
                  </Button>
                  <Button
                    variant={amenities.includes('pool') ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => handleAmenityChange('pool')}
                  >
                    Piscina
                  </Button>
                  <Button
                    variant={amenities.includes('parking') ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => handleAmenityChange('parking')}
                  >
                    Estacionamiento
                  </Button>
                </div>
              </div>
              <div className="flex justify-between">
                <Button variant="ghost" size="sm" onClick={handleClearFilters}>
                  Limpiar
                </Button>
                <Button size="sm" onClick={handleApplyFilters}>
                  Aplicar
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};
