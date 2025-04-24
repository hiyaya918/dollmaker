import React from 'react';

const SceneSelector = ({ selected, onChange }) => {
  const scenes = [
    {
      id: 'winter',
      name: 'Winter',
      description: 'Snowy winter landscape scene',
      imageUrl: '/images/winter-scene.jpg'
    },
    {
      id: 'fashion',
      name: 'Fashion',
      description: 'Trendy fashion runway scene',
      imageUrl: '/images/fashion-scene.jpg'
    },
    {
      id: 'christmas',
      name: 'Christmas',
      description: 'Joyful Christmas holiday scene',
      imageUrl: '/images/christmas-scene.jpg'
    },
    {
      id: 'spring',
      name: 'Spring Festival',
      description: 'Festive Spring Festival celebration scene',
      imageUrl: '/images/spring-scene.jpg'
    },
    {
      id: 'halloween',
      name: 'Halloween',
      description: 'Mysterious and fun Halloween scene',
      imageUrl: '/images/halloween-scene.jpg'
    },
    {
      id: 'beach',
      name: 'Beach',
      description: 'Sunny beach paradise scene',
      imageUrl: '/images/beach-scene.jpg'
    }
  ];

  return (
    <div className="mb-6">
      <label className="block text-dark text-sm font-medium mb-2">Select Scene Theme</label>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {scenes.map((scene) => (
          <div
            key={scene.id}
            className={`relative rounded-lg overflow-hidden border-2 cursor-pointer transition-all ${
              selected === scene.id
                ? 'border-primary ring-2 ring-primary ring-opacity-50 transform scale-[1.02]'
                : 'border-transparent hover:border-gray-300'
            }`}
            onClick={() => onChange(scene.id)}
          >
            <div className="aspect-w-16 aspect-h-9 bg-gray-200">
              {/* Replace with actual images in production */}
              <div className="w-full h-32 bg-gray-300 flex items-center justify-center text-gray-500">
                {scene.name} scene image
              </div>
            </div>
            <div className="p-3 bg-white">
              <h3 className="text-sm font-medium text-dark">{scene.name}</h3>
              <p className="mt-1 text-xs text-gray-500">{scene.description}</p>
            </div>
            {selected === scene.id && (
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

export default SceneSelector; 