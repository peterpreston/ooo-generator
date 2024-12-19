"use client"

import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';

type ToneType = 'fun' | 'professional' | 'minimal';
type HolidayType = 'none' | 'christmas' | 'newyear';

interface MadLibInputs {
  activity: string;
  location: string;
  excuse: string;
  hobby: string;
  food: string;
  contact: string;
}

const getRandomTemplate = (inputs: MadLibInputs, tone: ToneType, holiday: HolidayType) => {
  const funTemplates = [
    `🌴 Gone ${inputs.activity || '[activity]'} in ${inputs.location || '[location]'}! 
    
Currently busy with ${inputs.hobby || '[hobby]'} and searching for the perfect ${inputs.food || '[food]'}. 

If you need me, good luck! (But if it's REALLY urgent, try ${inputs.contact || '[contact]'} - they might be less busy ${inputs.excuse || '[excuse]'}).`,

    `🎮 Level 99 ${inputs.activity || '[activity]'} achieved! 
    
Taking a break from emails to master the art of ${inputs.hobby || '[hobby]'} in ${inputs.location || '[location]'}. 

Emergency contact is ${inputs.contact || '[contact]'}, but they're probably also ${inputs.excuse || '[excuse]'}.`,

    `🌞 Warning: Currently ${inputs.activity || '[activity]'} instead of checking emails. 
    
You can find me in ${inputs.location || '[location]'}, perfecting my ${inputs.hobby || '[hobby]'} skills and eating ${inputs.food || '[food]'}. 

${inputs.contact || '[contact]'} is covering for me, assuming they're not too busy ${inputs.excuse || '[excuse]'}.`
  ];

  const professionalTemplates = [
    `Thank you for your message. I am currently ${inputs.activity || '[activity]'} in ${inputs.location || '[location]'}. 
    
While I'm away ${inputs.excuse || '[excuse]'}, ${inputs.contact || '[contact]'} will be available to assist you.`,

    `I am currently out of office attending a ${inputs.hobby || '[hobby]'} conference in ${inputs.location || '[location]'}. 
    
For immediate assistance, please contact ${inputs.contact || '[contact]'}.`
  ];

  const christmasTemplates = [
    `🎄 Deck the halls! Currently ${inputs.activity || '[activity]'} through mountains of ${inputs.food || '[food]'} in ${inputs.location || '[location]'}. 
    
Santa's helper (aka ${inputs.contact || '[contact]'}) can assist while I'm busy ${inputs.hobby || '[hobby]'}.`,

    `🎅 Ho ho ho! Gone ${inputs.activity || '[activity]'} with reindeer in ${inputs.location || '[location]'}. 
    
Too busy ${inputs.excuse || '[excuse]'} to check emails, but ${inputs.contact || '[contact]'} is keeping the North Pole running!`
  ];

  const newYearTemplates = [
    `🎆 Celebrating 2024 by ${inputs.activity || '[activity]'} in ${inputs.location || '[location]'}! 
    
While I'm perfecting my ${inputs.hobby || '[hobby]'}, ${inputs.contact || '[contact]'} is holding down the fort.`,

    `✨ Ring in 2024! Currently ${inputs.activity || '[activity]'} and eating ${inputs.food || '[food]'} in ${inputs.location || '[location]'}. 
    
${inputs.contact || '[contact]'} is covering while I'm ${inputs.excuse || '[excuse]'}.`
  ];

  if (holiday === 'christmas') return christmasTemplates[Math.floor(Math.random() * christmasTemplates.length)];
  if (holiday === 'newyear') return newYearTemplates[Math.floor(Math.random() * newYearTemplates.length)];
  return tone === 'professional' 
    ? professionalTemplates[Math.floor(Math.random() * professionalTemplates.length)]
    : funTemplates[Math.floor(Math.random() * funTemplates.length)];
};

const OutOfOfficeGenerator = () => {
  const [tone, setTone] = useState<ToneType>('fun');
  const [holiday, setHoliday] = useState<HolidayType>('none');
  const [message, setMessage] = useState('');
  const [inputs, setInputs] = useState<MadLibInputs>({
    activity: '',
    location: '',
    excuse: '',
    hobby: '',
    food: '',
    contact: ''
  });

  const handleInputChange = (field: keyof MadLibInputs) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  const generateMessage = () => {
    const newMessage = getRandomTemplate(inputs, tone, holiday);
    setMessage(newMessage);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(message);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <div className="space-y-4">
        <h1 className="text-2xl font-bold text-center flex items-center justify-center gap-2 text-black">
          <span role="img" aria-label="beach" className="text-2xl">🏖️</span>
          MadLibs Out of Office
        </h1>

        <div className="space-y-4">
          <div>
            <h2 className="text-black font-medium mb-2">Select Style:</h2>
            <div className="grid grid-cols-3 gap-2">
              <Button
                onClick={() => setTone('fun')}
                variant={tone === 'fun' ? 'default' : 'outline'}
                className={`w-full ${tone === 'fun' ? 'text-white' : 'text-black'}`}
              >
                😊 Fun
              </Button>
              <Button
                onClick={() => setTone('professional')}
                variant={tone === 'professional' ? 'default' : 'outline'}
                className={`w-full ${tone === 'professional' ? 'text-white' : 'text-black'}`}
              >
                👔 Professional
              </Button>
            </div>
          </div>

          <div>
            <h2 className="text-black font-medium mb-2">Add Holiday Theme:</h2>
            <div className="grid grid-cols-3 gap-2">
              <Button
                onClick={() => setHoliday('none')}
                variant={holiday === 'none' ? 'default' : 'outline'}
                className={`w-full ${holiday === 'none' ? 'text-white' : 'text-black'}`}
              >
                📅 None
              </Button>
              <Button
                onClick={() => setHoliday('christmas')}
                variant={holiday === 'christmas' ? 'default' : 'outline'}
                className={`w-full ${holiday === 'christmas' ? 'text-white' : 'text-black'}`}
              >
                🎄 Christmas
              </Button>
              <Button
                onClick={() => setHoliday('newyear')}
                variant={holiday === 'newyear' ? 'default' : 'outline'}
                className={`w-full ${holiday === 'newyear' ? 'text-white' : 'text-black'}`}
              >
                🎆 New Year
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Input
              placeholder="Enter an activity (e.g., 'surfing', 'napping', 'meditating')"
              value={inputs.activity}
              onChange={handleInputChange('activity')}
              className="text-black placeholder:text-gray-500"
            />
            <Input
              placeholder="Enter a location (e.g., 'Bali', 'my secret hideout', 'Mars')"
              value={inputs.location}
              onChange={handleInputChange('location')}
              className="text-black placeholder:text-gray-500"
            />
            <Input
              placeholder="Enter an excuse (e.g., 'fighting ninjas', 'learning to juggle')"
              value={inputs.excuse}
              onChange={handleInputChange('excuse')}
              className="text-black placeholder:text-gray-500"
            />
            <Input
              placeholder="Enter a hobby (e.g., 'extreme knitting', 'professional napping')"
              value={inputs.hobby}
              onChange={handleInputChange('hobby')}
              className="text-black placeholder:text-gray-500"
            />
            <Input
              placeholder="Enter a food (e.g., 'pizza', 'tacoooos', 'sushi')"
              value={inputs.food}
              onChange={handleInputChange('food')}
              className="text-black placeholder:text-gray-500"
            />
            <Input
              placeholder="Enter a contact (e.g., 'my pet rock', 'the office plant')"
              value={inputs.contact}
              onChange={handleInputChange('contact')}
              className="text-black placeholder:text-gray-500"
            />
          </div>

          <div className="flex gap-2">
            <Button 
              className="w-full text-white"
              onClick={generateMessage}
            >
              <span className="mr-2">🎲</span>
              Generate Random Message
            </Button>
            <Button 
              className="w-full text-white"
              onClick={copyToClipboard}
              disabled={!message}
            >
              <span className="mr-2">📋</span>
              Copy to Clipboard
            </Button>
          </div>

          <Textarea
            className="h-48 w-full text-black placeholder:text-gray-500"
            placeholder="Your mad-lib out-of-office message will appear here... Fill in some words above and click Generate!"
            value={message}
            readOnly
          />

          <p className="text-sm text-gray-500 text-center">
            Tip: Keep generating to get different message templates with your words!
          </p>
        </div>
      </div>
    </div>
  );
};

export default OutOfOfficeGenerator;