"use client"

import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';

type ToneType = 'fun' | 'professional' | 'minimal';
type HolidayType = 'none' | 'christmas' | 'newyear';

interface MessageTemplates {
  tones: {
    fun: {
      intros: string[];
      closings: string[];
    };
    professional: {
      intros: string[];
      closings: string[];
    };
    minimal: {
      intros: string[];
      closings: string[];
    };
  };
  holidays: {
    none: {
      additions: string[];
    };
    christmas: {
      additions: string[];
    };
    newyear: {
      additions: string[];
    };
  };
}

const messageTemplates: MessageTemplates = {
  tones: {
    fun: {
      intros: [
        "🌴 Gone fishin' (metaphorically)",
        "🏖️ Currently living my best life",
        "✈️ Embarking on a grand adventure",
        "🧘‍♀️ Finding my zen",
        "🌞 Soaking up vitamin D",
        "🎮 Finally beating that video game boss",
        "🍕 On a quest for the perfect pizza"
      ],
      closings: [
        "Don't worry, the internet will still be here when I return!",
        "If this is urgent, try meditating and see if it's still urgent tomorrow.",
        "In case of emergency, try turning it off and on again.",
        "Feel free to send me an email, but know that I'm probably napping.",
        "My inbox is currently full of virtual dust bunnies."
      ]
    },
    professional: {
      intros: [
        "Thank you for your email",
        "I appreciate your message",
        "Thank you for getting in touch",
        "Hello, and thank you for your email"
      ],
      closings: [
        "I appreciate your understanding during my absence.",
        "Thank you for your patience while I'm away.",
        "I look forward to connecting upon my return.",
        "I will address your message promptly upon my return."
      ]
    },
    minimal: {
      intros: [
        "Out of office",
        "Away from inbox",
        "Auto: Out of office",
        "Away notice"
      ],
      closings: [
        "Best regards.",
        "Regards.",
        "Best.",
        "Thank you."
      ]
    }
  },
  holidays: {
    none: {
      additions: [""]
    },
    christmas: {
      additions: [
        "🎄 Celebrating the holiday season",
        "🎅 Spreading holiday cheer",
        "⛄ Making winter memories",
        "🎁 Enjoying festive celebrations",
        "❄️ Taking time for holiday traditions"
      ]
    },
    newyear: {
      additions: [
        "🎆 Welcoming the new year",
        "🎊 Celebrating new beginnings",
        "✨ Starting fresh in 2024",
        "🎉 Ringing in the new year",
        "🥂 Toasting to new possibilities"
      ]
    }
  }
};

const OutOfOfficeGenerator = () => {
  const [name, setName] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [reason, setReason] = useState('');
  const [contact, setContact] = useState('');
  const [message, setMessage] = useState('');
  const [tone, setTone] = useState<ToneType>('fun');
  const [holiday, setHoliday] = useState<HolidayType>('none');

  const generateMessage = () => {
    const toneTemplate = messageTemplates.tones[tone];
    const holidayAddition = messageTemplates.holidays[holiday].additions[
      Math.floor(Math.random() * messageTemplates.holidays[holiday].additions.length)
    ];
    
    const intro = toneTemplate.intros[Math.floor(Math.random() * toneTemplate.intros.length)];
    const closing = toneTemplate.closings[Math.floor(Math.random() * toneTemplate.closings.length)];
    
    let newMessage = '';
    
    if (tone === 'minimal') {
      newMessage = `${intro}${holidayAddition ? ` - ${holidayAddition}` : ''}.

${name ? `${name} is` : 'I am'} out of office${reason ? ` ${reason}` : ''} until ${returnDate || '[return date]'}.

${contact ? `Urgent matters: ${contact}` : 'Urgent matters: [contact person]'}.

${closing}`;
    } else {
      newMessage = `${intro}${holidayAddition ? ` - ${holidayAddition}` : ''}!

${name ? `${name} is` : 'I am'} currently out of office${reason ? ` ${reason}` : ''} and will return on ${returnDate || '[return date]'}.

${closing}

${contact ? `For urgent matters, please contact ${contact}.` : 'For urgent matters, please contact [emergency contact].'}`;
    }

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
          Out of Office Generator
        </h1>

        <div className="space-y-4">
          <div>
            <h2 className="text-black font-medium mb-2">Select Tone:</h2>
            <div className="grid grid-cols-3 gap-2">
              {Object.keys(messageTemplates.tones).map((value) => (
                <Button
                  key={value}
                  onClick={() => setTone(value as ToneType)}
                  variant={tone === value ? 'default' : 'outline'}
                  className={`w-full ${tone === value ? 'text-white' : 'text-black'}`}
                >
                  {{
                    fun: '😊 Fun',
                    professional: '👔 Professional',
                    minimal: '📝 Minimal'
                  }[value]}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-black font-medium mb-2">Add Holiday Theme (Optional):</h2>
            <div className="grid grid-cols-3 gap-2">
              {Object.keys(messageTemplates.holidays).map((value) => (
                <Button
                  key={value}
                  onClick={() => setHoliday(value as HolidayType)}
                  variant={holiday === value ? 'default' : 'outline'}
                  className={`w-full ${holiday === value ? 'text-white' : 'text-black'}`}
                >
                  {{
                    none: '📅 None',
                    christmas: '🎄 Christmas',
                    newyear: '🎆 New Year'
                  }[value]}
                </Button>
              ))}
            </div>
          </div>
          
          <Input
            placeholder="Your name (optional)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full text-black placeholder:text-gray-500"
          />
          <Input
            type="date"
            placeholder="Return date"
            value={returnDate}
            onChange={(e) => setReturnDate(e.target.value)}
            className="w-full text-black"
          />
          <Input
            placeholder="Reason for absence (optional, e.g., 'on vacation', 'at a conference')"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full text-black placeholder:text-gray-500"
          />
          <Input
            placeholder="Emergency contact (optional)"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            className="w-full text-black placeholder:text-gray-500"
          />
        </div>

        <div className="flex gap-2">
          <Button 
            className="w-full text-white"
            onClick={generateMessage}
          >
            <span className="mr-2">🔄</span>
            Generate Message
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
          placeholder="Your generated message will appear here..."
          value={message}
          readOnly
        />
      </div>
    </div>
  );
};

export default OutOfOfficeGenerator;