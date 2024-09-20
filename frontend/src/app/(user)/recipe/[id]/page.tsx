import RecipeButton from '@/components/buttons/recipe-button';
import ReviewForm from '@/components/forms/review/review-form';
import FacebookIcon from '@/components/icons/facebook';
import PinterestIcon from '@/components/icons/pintrest';
import XIcon from '@/components/icons/x';
import { RatingComponent } from '@/components/rating-component';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { formatDate, getInitials } from '@/lib/utils';
import { recipeService } from '@/services';
import { Bookmark, Mail, Printer, ShoppingCart, Star } from 'lucide-react';
import Image from 'next/image';

export default async function RecipePage({
  params,
}: {
  params: { id: string };
}) {
  const response = await recipeService.getRecipe(params.id);

  if (!response.success) {
    return <div>Error loading recipe</div>;
  }

  const recipe = response.data;

  return (
    <main className='mx-auto my-8 max-w-5xl px-4 sm:my-16 sm:px-6 lg:px-8'>
      <h1 className='mb-8 text-4xl font-bold'>{recipe.title}</h1>
      <section className='mb-6 flex flex-col text-sm sm:flex-row sm:justify-between'>
        <div className='mb-4 sm:mb-0'>
          <RatingComponent
            initialRating={recipe.averageRating}
            readOnly={true}
            showValue={true}
          />
        </div>
        <div className='flex items-center gap-3'>
          <p>
            By <span className='text-primary'>{recipe.creator.name}</span>
          </p>
          <Separator orientation='vertical' />
          <p>{formatDate(recipe.updatedAt as Date)}</p>
        </div>
      </section>
      <Image
        src={recipe.coverImage}
        alt={`${recipe.title} image`}
        width={1000}
        height={1000}
        className='mb-8 max-h-[500px] w-full object-cover'
      />
      <section className='flex flex-col sm:flex-row sm:items-center sm:justify-between'>
        <div className='mb-4 space-x-3 sm:mb-0'>
          <RecipeButton>
            <Bookmark size={20} className='mr-1' strokeWidth={1.5} />
            Save
          </RecipeButton>
          <RecipeButton>
            <Star size={20} className='mr-1' strokeWidth={1.5} />
            Rate
          </RecipeButton>
          <RecipeButton>
            <Printer size={20} className='mr-1' strokeWidth={1.5} />
            Print
          </RecipeButton>
        </div>
        <div className='flex items-center gap-3'>
          <Button
            variant='outline'
            size='icon'
            className='rounded-full border-secondary-foreground'
          >
            <FacebookIcon height={20} width={20} />
          </Button>
          <Button
            variant='outline'
            size='icon'
            className='rounded-full border-secondary-foreground'
          >
            <PinterestIcon height={20} width={20} />
          </Button>
          <Button
            variant='outline'
            size='icon'
            className='rounded-full border-secondary-foreground'
          >
            <XIcon height={20} width={20} />
          </Button>
          <Button
            variant='outline'
            size='icon'
            className='rounded-full border-secondary-foreground'
          >
            <Mail height={20} width={20} />
          </Button>
        </div>
      </section>
      <section className='mt-14'>
        <h2 className='mb-5 text-3xl font-semibold'>Overview</h2>
        <p>{recipe.description}</p>
        <Card className='mx-4 my-14 flex flex-col border-none bg-muted p-4 shadow-none sm:mx-16 sm:grid sm:grid-cols-[1fr_2px_1fr_2px_1fr_2px_1fr]'>
          <CardContent className='mb-4 flex flex-col items-center gap-2 p-0 sm:mb-0'>
            <Image
              src='/prep-time.png'
              alt='Prep time'
              width={48}
              height={48}
            />
            <CardTitle>Prep Time</CardTitle>
            <CardDescription>{recipe.prepTime.minutes} mins</CardDescription>
          </CardContent>
          <Separator
            orientation='horizontal'
            className='my-4 h-0.5 sm:hidden'
          />
          <Separator
            orientation='vertical'
            className='hidden w-0.5 bg-muted-foreground/20 sm:block'
          />
          <CardContent className='mb-4 flex flex-col items-center gap-2 p-0 sm:mb-0'>
            <Image
              src='/cook-time.png'
              alt='Cook time'
              width={48}
              height={48}
            />
            <CardTitle>Cook Time</CardTitle>
            <CardDescription>{recipe.prepTime.minutes} mins</CardDescription>
          </CardContent>
          <Separator
            orientation='horizontal'
            className='my-4 h-0.5 sm:hidden'
          />
          <Separator
            orientation='vertical'
            className='hidden w-0.5 bg-muted-foreground/20 sm:block'
          />
          <CardContent className='mb-4 flex flex-col items-center gap-2 p-0 sm:mb-0'>
            <Image
              src='/total-time.png'
              alt='Total time'
              width={48}
              height={48}
            />
            <CardTitle>Total Time</CardTitle>
            <CardDescription>{recipe.prepTime.minutes} mins</CardDescription>
          </CardContent>
          <Separator
            orientation='horizontal'
            className='my-4 h-0.5 sm:hidden'
          />
          <Separator
            orientation='vertical'
            className='hidden w-0.5 bg-muted-foreground/20 sm:block'
          />
          <CardContent className='flex flex-col items-center gap-2 p-0'>
            <Image src='/servings.png' alt='Servings' width={48} height={48} />
            <CardTitle>Servings</CardTitle>
            <CardDescription>{recipe.servings}</CardDescription>
          </CardContent>
        </Card>
      </section>
      <section className='mb-14'>
        <h2 className='mb-5 text-3xl font-semibold'>Ingredients</h2>
        <div className='mb-6 space-y-2'>
          {recipe.ingredients.map((ingredient) => (
            <div key={ingredient.item} className='flex items-center gap-3'>
              <Checkbox className='rounded-full' />
              <p className='font-light'>{`${ingredient.quantity} ${ingredient.measurement} ${ingredient.item}`}</p>
            </div>
          ))}
        </div>
        <RecipeButton>
          <ShoppingCart size={20} className='mr-2' strokeWidth={1.5} />
          Add to Shopping List
        </RecipeButton>
      </section>
      <section className='mb-14'>
        <h2 className='mb-3 text-3xl font-semibold'>Instructions</h2>
        <div className='space-y-3'>
          {recipe.instructions.map((instruction) => (
            <div
              key={instruction.step}
              className='items-top flex cursor-pointer gap-6 rounded p-1 font-light transition duration-300 ease-in-out hover:bg-primary hover:text-primary-foreground'
            >
              <p className='text-lg font-semibold'>{instruction.step}.</p>
              <p>{instruction.instruction}</p>
            </div>
          ))}
        </div>
      </section>
      <section className='mb-14'>
        <h2 className='mb-5 text-3xl font-semibold'>Tags</h2>
        <div className='flex flex-wrap gap-2'>
          {recipe.tags.map((tag) => (
            <Badge
              key={tag}
              variant='outline'
              className='cursor-pointer rounded-full px-5 py-1.5 text-sm font-normal capitalize hover:border-primary hover:bg-primary hover:text-primary-foreground'
            >
              {tag}
            </Badge>
          ))}
        </div>
      </section>
      <section className='mb-14'>
        <h2 className='mb-5 text-3xl font-semibold'>
          Reviews ({recipe.reviewCount})
        </h2>
        <Card className='rounded-lg border bg-muted p-4 shadow-sm sm:p-6'>
          <div className='flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6'>
            <Avatar className='h-16 w-16 shrink-0 text-3xl'>
              <AvatarImage
                src={recipe.creator.profileImage}
                alt='User avatar'
              />
              <AvatarFallback className='bg-muted-foreground/30 text-muted'>
                {getInitials(recipe.creator.name)}
              </AvatarFallback>
            </Avatar>
            <div className='flex-grow'>
              <ReviewForm />
            </div>
          </div>
        </Card>
      </section>
    </main>
  );
}
