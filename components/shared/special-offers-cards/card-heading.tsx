import React from 'react'
type CardHeadingProps = {
  title: React.ReactNode;
  description?: string; 
};


const CardHeading = ({ title ,description}:CardHeadingProps) => {
  return (
  <div>
    <div className="card-title text-2xl sm:text-4xl">
  {title}
</div>


    {description && (
      <p className="text-body-sm text-muted-foreground mt-4">
        {description}
      </p>
    )}
  </div>
);

}

export default CardHeading