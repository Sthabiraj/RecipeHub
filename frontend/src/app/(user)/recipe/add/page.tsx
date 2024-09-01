import AddRecipeForm from '@/components/forms/recipe/add-recipe';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function AddRecipePage() {
  return (
    <Card className='mx-auto my-14 max-w-4xl rounded'>
      <CardHeader>
        <CardTitle>Add a Recipe</CardTitle>
        <CardDescription>
          Feeling like a kitchen Picasso? We want to see your masterpiece! Add
          your recipe and show off your culinary creativity.
        </CardDescription>
      </CardHeader>
      {/* <Separator /> */}
      <CardContent>
        <AddRecipeForm />
      </CardContent>
    </Card>
  );
}
