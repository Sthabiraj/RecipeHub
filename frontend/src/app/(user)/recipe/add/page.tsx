import { auth } from '@/auth';
import AddRecipeForm from '@/components/forms/recipe/add-recipe';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { redirect } from 'next/navigation';

export default async function AddRecipePage() {
  const session = await auth();

  if (!session) redirect('/login');

  return (
    <section className='h-full w-full bg-muted py-14'>
      <Card className='mx-auto max-w-4xl rounded p-6'>
        <CardHeader>
          <CardTitle className='text-center text-3xl'>Add a Recipe</CardTitle>
          <CardDescription>
            Feeling like a kitchen Picasso? We want to see your masterpiece! Add
            your recipe and show off your culinary creativity.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AddRecipeForm />
        </CardContent>
      </Card>
    </section>
  );
}
