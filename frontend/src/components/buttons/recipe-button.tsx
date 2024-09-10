import { Button, ButtonProps } from '../ui/button';

export default function RecipeButton(props: ButtonProps) {
  return (
    <Button
      variant='outline'
      className='rounded-full border-secondary-foreground font-normal uppercase hover:border-primary hover:bg-primary hover:text-primary-foreground'
      {...props}
    >
      {props.children}
    </Button>
  );
}
