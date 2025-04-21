
import React from 'react';
import {Button} from '@/components/ui/button';
import {Textarea} from '@/components/ui/textarea';
import {Input} from '@/components/ui/input';

export const ContactForm = () => {
  return (
    <form className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-muted-foreground">
          Name
        </label>
        <Input type="text" id="name" placeholder="Your Name" className="shadow-sm"/>
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-muted-foreground">
          Email
        </label>
        <Input type="email" id="email" placeholder="Your Email" className="shadow-sm"/>
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-muted-foreground">
          Message
        </label>
        <Textarea id="message" placeholder="Your Message" rows={4} className="shadow-sm"/>
      </div>
      <Button type="submit" className="w-full">
        Send Message
      </Button>
    </form>
  );
};
