
import React from 'react';
import {Button} from '@/components/ui/button';
import {Textarea} from '@/components/ui/textarea';
import {Input} from '@/components/ui/input';

export const ContactForm = () => {
  return (
    <form className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-muted-foreground">
          Nombre
        </label>
        <Input type="text" id="name" placeholder="Tu Nombre" className="shadow-sm"/>
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-muted-foreground">
          Correo Electrónico
        </label>
        <Input type="email" id="email" placeholder="Tu Correo Electrónico" className="shadow-sm"/>
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-muted-foreground">
          Mensaje
        </label>
        <Textarea id="message" placeholder="Tu Mensaje" rows={4} className="shadow-sm"/>
      </div>
      <Button type="submit" className="w-full">
        Enviar Mensaje
      </Button>
    </form>
  );
};
