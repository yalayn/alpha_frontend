import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Card, CardBody, CardFooter, Button, Input, Select, Textarea,
} from '@/shared';
import { ContactMessageType } from '@/api/generated/model';
import { useCreateContactMessage } from '@/api/generated/contact/contact';
import { useToast } from '@/core/toast';
import { contactSchema, contactTypeOptions } from '../utils/contact.utils';
import type { ContactFormValues } from '../types/contact.types';

export function ContactForm() {
  const toast = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    mode: 'onChange',
    defaultValues: { type: ContactMessageType.comment, subject: '', message: '' },
  });

  const mutation = useCreateContactMessage({
    mutation: {
      onSuccess: () => {
        reset({ type: ContactMessageType.comment, subject: '', message: '' });
        toast.success('Tu mensaje fue enviado. ¡Gracias!');
      },
      onError: () => {
        toast.error('No se pudo enviar tu mensaje. Intenta de nuevo.');
      },
    },
  });

  function onSubmit(values: ContactFormValues) {
    mutation.mutate({ data: values });
  }

  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardBody className="space-y-5">
          <Select
            label="Tipo"
            options={contactTypeOptions}
            errorMessage={errors.type?.message}
            {...register('type')}
          />
          <Input
            label="Asunto"
            type="text"
            placeholder="ej. Sugerencia sobre el panel"
            errorMessage={errors.subject?.message}
            {...register('subject')}
          />
          <Textarea
            label="Mensaje"
            rows={6}
            placeholder="Escribe tu comentario o solicitud…"
            errorMessage={errors.message?.message}
            {...register('message')}
          />
        </CardBody>

        <CardFooter>
          <Button type="submit" isLoading={mutation.isPending} disabled={!isValid}>
            Enviar
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
