import React from 'react';

const StyleSelector = ({ selected, onChange }) => {
  const styles = [
    {
      id: 'bairbie',
      name: 'Barbie Style',
      description: 'Cute and sweet doll style',
      imageUrl: '/images/bairbie-style.jpg'
    },
    {
      id: 'ken',
      name: 'Ken Style',
      description: 'Vibrant male doll style',
      imageUrl: '/images/ken-style.jpg'
    },
    {
      id: 'superhero',
      name: 'Superhero',
      description: 'Powerful hero doll with superpowers',
      imageUrl: '/images/superhero-style.jpg'
    },
    {
      id: 'fantasy',
      name: 'Fantasy Style',
      description: 'Magical dolls from fantasy worlds',
      imageUrl: '/images/fantasy-style.jpg'
    }
  ];

  return (
    <div className="mb-6">
      <label className="block text-dark text-sm font-medium mb-2">Select Doll Style</label>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {styles.map((style) => (
          <div
            key={style.id}
            className={`relative rounded-lg overflow-hidden border-2 cursor-pointer transition-all ${
              selected === style.id
                ? 'border-primary ring-2 ring-primary ring-opacity-50 transform scale-[1.02]'
                : 'border-transparent hover:border-gray-300'
            }`}
            onClick={() => onChange(style.id)}
          >
            <div className="aspect-w-1 aspect-h-1 bg-gray-200">
              {/* Replace with actual images in production */}
              <div className="w-full h-40 bg-gray-300 flex items-center justify-center text-gray-500">
                {style.name} image
              </div>
            </div>
            <div className="p-3 bg-white">
              <h3 className="text-sm font-medium text-dark">{style.name}</h3>
              <p className="mt-1 text-xs text-gray-500">{style.description}</p>
            </div>
            {selected === style.id && (
              <div className="absolute top-2 right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StyleSelector; 