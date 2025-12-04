import React, { useState, useMemo } from 'react';
import { StyleProfile, StyleCategory } from '../types';

interface AnalysisResultProps {
  profile: StyleProfile;
  onApplyStyle: (item: string, category: StyleCategory) => void;
}

type TabCategory = 'HAIR' | 'FACE' | 'EYES' | 'STYLE' | 'ACCESSORY' | 'TATTOO';

interface RecommendationSection {
  title: string;
  items: string[];
  type: StyleCategory;
}

export const AnalysisResult: React.FC<AnalysisResultProps> = ({ profile, onApplyStyle }) => {
  const [activeTab, setActiveTab] = useState<TabCategory>('HAIR');

  const tabs = useMemo(() => {
    const isMale = profile.gender === 'Male';

    return [
      { id: 'HAIR', icon: '💇', label: 'Hair' },
      { id: 'FACE', icon: isMale ? '🧔' : '💄', label: isMale ? 'Beard' : 'Makeup' },
      { id: 'EYES', icon: '🕶️', label: 'Eyes' },
      { id: 'STYLE', icon: isMale ? '👔' : '👗', label: 'Outfit' },
      { id: 'ACCESSORY', icon: '✨', label: 'Bling' },
      { id: 'TATTOO', icon: '🐉', label: 'Tattoo' },
    ] as const;
  }, [profile.gender]);

  const handleShop = (item: string, type: StyleCategory) => {
    let query = item;
    const genderTerm = profile.gender === 'Male' ? "men's " : "women's ";

    switch (type) {
      case 'hair': query += ` wig ${genderTerm}`; break;
      case 'beard': query += " beard care kit"; break;
      case 'color': query += ` outfit ${genderTerm}`; break;
      case 'accessory': query += ` ${genderTerm}`; break;
      case 'makeup': query += " makeup"; break;
      case 'tattoo': query += " temporary tattoo"; break;
    }

    window.open(`https://www.amazon.com/s?k=${encodeURIComponent(query)}`, '_blank');
  };

  const handleFindNearby = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        const query = profile.gender === 'Male' ? "Men's Salon" : "Beauty Parlor";
        window.open(`https://www.google.com/maps/search/${encodeURIComponent(query)}/@${latitude},${longitude},14z`, '_blank');
      }, () => {
        const query = profile.gender === 'Male' ? "Men's Salon near me" : "Beauty Parlor near me";
        window.open(`https://www.google.com/maps/search/${encodeURIComponent(query)}`, '_blank');
      });
    } else {
      const query = profile.gender === 'Male' ? "Men's Salon near me" : "Beauty Parlor near me";
      window.open(`https://www.google.com/maps/search/${encodeURIComponent(query)}`, '_blank');
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: 'Check out my StyloGlo Makeover!',
      text: 'I just used AI to find my perfect style. Check it out on StyloGlo!',
      url: window.location.href
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Share canceled');
      }
    } else {
      const text = encodeURIComponent(shareData.text + " " + shareData.url);
      const whatsappUrl = `https://wa.me/?text=${text}`;
      window.open(whatsappUrl, '_blank');
    }
  };

  const getRealProductImage = (item: string, type: StyleCategory) => {
    // Pollinations AI for photorealistic images
    const genderContext = profile.gender === 'Male' ? 'men' : 'women';
    let prompt = "";

    switch (type) {
      case 'hair':
        prompt = `photorealistic hairstyle ${item} on ${genderContext} model, professional salon photography, studio lighting`;
        break;
      case 'beard':
        prompt = `photorealistic beard style ${item} on male model, close up face, studio lighting`;
        break;
      case 'makeup':
        prompt = `photorealistic makeup look ${item}, beauty photography, close up face`;
        break;
      case 'tattoo':
        prompt = `photorealistic tattoo design ${item}, skin texture, ink detail`;
        break;
      default:
        prompt = `photorealistic product shot of ${item} for ${genderContext}, high end commercial photography, white background`;
        break;
    }

    const encodedPrompt = encodeURIComponent(prompt);
    return `https://image.pollinations.ai/prompt/${encodedPrompt}?width=400&height=400&nologo=true&seed=${Math.floor(Math.random() * 100)}`;
  };

  const renderContent = () => {
    const sections: RecommendationSection[] = [];
    const isMale = profile.gender === 'Male';

    switch (activeTab) {
      case 'HAIR':
        sections.push({ title: 'Recommended Hairstyles', items: profile.recommendations.hair, type: 'hair' });
        break;
      case 'FACE':
        if (isMale) {
          if (profile.recommendations.beard) sections.push({ title: 'Beard Styles', items: profile.recommendations.beard, type: 'beard' });
        } else {
          if (profile.recommendations.makeup) sections.push({ title: 'Makeup & Lipstick', items: profile.recommendations.makeup, type: 'makeup' });
        }
        break;
      case 'EYES':
        sections.push({ title: 'Sunglasses & Frames', items: profile.recommendations.sunglasses, type: 'accessory' });
        if (!isMale) {
          if (profile.recommendations.eyebrows) sections.push({ title: 'Eyebrow Shapes', items: profile.recommendations.eyebrows, type: 'eyebrows' });
          if (profile.recommendations.eyelashes) sections.push({ title: 'Eyelashes', items: profile.recommendations.eyelashes, type: 'eyelashes' });
        }
        break;
      case 'STYLE':
        sections.push({ title: 'Best Colors & Outfits', items: profile.recommendations.colors, type: 'color' });
        break;
      case 'ACCESSORY':
        if (!isMale) {
          if (profile.recommendations.earrings) sections.push({ title: 'Earrings', items: profile.recommendations.earrings, type: 'accessory' });
          if (profile.recommendations.stickers) sections.push({ title: 'Bindis & Stickers', items: profile.recommendations.stickers, type: 'accessory' });
        }
        break;
      case 'TATTOO':
        if (profile.recommendations.tattoos) sections.push({ title: 'Tattoo Concepts', items: profile.recommendations.tattoos, type: 'tattoo' });
        break;
    }

    return (
      <div className="pb-24 animate-fade-in space-y-8">
        {/* Share & Tools Bar */}
        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
          <button onClick={handleShare} className="flex-none px-4 py-2 bg-purple-50 text-purple-600 rounded-full text-xs font-bold flex items-center gap-2 hover:bg-purple-100 transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
            Share Look
          </button>
          <button onClick={() => {
            const text = encodeURIComponent('Check out my StyloGlo AI makeover! 💇✨');
            window.open(`https://wa.me/?text=${text}`, '_blank');
          }} className="flex-none w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center hover:bg-green-600 transition-colors">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.304-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
          </button>
          <button onClick={() => window.open('https://www.instagram.com/', '_blank')} className="flex-none w-10 h-10 rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 text-white flex items-center justify-center hover:scale-110 transition-transform">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
          </button>
        </div>

        {/* Real Location Map Card */}
        {activeTab === 'HAIR' && (
          <div onClick={handleFindNearby} className="p-4 bg-gradient-to-r from-stone-800 to-stone-900 rounded-2xl text-white shadow-lg flex justify-between items-center relative overflow-hidden group cursor-pointer transition-transform hover:scale-[1.02]">
            <div className="z-10">
              <h4 className="font-bold text-lg">{isMale ? 'Find Barber Shops' : 'Find Beauty Parlors'}</h4>
              <p className="text-xs text-stone-300">Locate top-rated salons near you</p>
            </div>
            <div className="z-10 bg-white/10 p-2.5 rounded-full backdrop-blur-sm border border-white/20">
              <span className="text-xl">📍</span>
            </div>
            <div className="absolute inset-0 bg-cover bg-center opacity-20 group-hover:opacity-30 transition-opacity" style={{ backgroundImage: 'url(https://maps.googleapis.com/maps/api/staticmap?center=40.714728,-73.998672&zoom=12&size=400x200&sensor=false&key=YOUR_KEY)' }}></div>
            <div className="absolute top-0 -left-full w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 group-hover:animate-[shine_1s_ease-in-out]"></div>
          </div>
        )}

        {sections.map((section, sIdx) => (
          <div key={sIdx}>
            <div className="mb-4">
              <h3 className="text-lg font-bold text-stone-900 px-1 flex items-center gap-2 font-serif">
                {section.title}
              </h3>
              <p className="text-xs text-stone-500 px-1 mt-1">
                {section.type === 'hair' && `Recommended ${profile.gender === 'Male' ? "men's" : "women's"} hairstyles for your ${profile.faceShape} face shape`}
                {section.type === 'beard' && `Beard styles that complement your jawline and facial structure`}
                {section.type === 'makeup' && `Makeup looks that enhance your ${profile.skinTone} skin tone`}
                {section.type === 'accessory' && `Accessories that match your style and face shape`}
                {section.type === 'color' && `Colors and outfits that complement your ${profile.undertone} undertone`}
                {section.type === 'tattoo' && `Tattoo designs curated for your style preferences`}
                {section.type === 'eyebrows' && `Eyebrow shapes that frame your face perfectly`}
                {section.type === 'eyelashes' && `Eyelash styles to enhance your eye shape`}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {section.items.map((item, idx) => (
                <div key={idx} className="bg-white rounded-xl overflow-hidden shadow-sm border border-stone-100 group hover:shadow-md transition-all">
                  {/* Image Placeholder with real IMG tag */}
                  <div className="h-40 relative bg-stone-100 overflow-hidden">
                    <img
                      src={getRealProductImage(item, section.type)}
                      alt={item}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                    <button
                      onClick={() => onApplyStyle(item, section.type)}
                      className="absolute bottom-2 right-2 bg-stone-900 text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-lg hover:bg-purple-600 transition-colors opacity-90 hover:opacity-100 z-10"
                    >
                      TRY ON
                    </button>
                  </div>

                  <div className="p-3">
                    <h5 className="font-bold text-stone-800 text-xs leading-tight mb-3 min-h-[2.5em] line-clamp-2">
                      {item}
                    </h5>
                    <button
                      onClick={() => handleShop(item, section.type)}
                      className="w-full py-1.5 border border-stone-200 rounded-lg text-[10px] font-bold text-stone-500 hover:border-orange-400 hover:text-orange-600 hover:bg-orange-50 flex items-center justify-center gap-1 transition-colors uppercase tracking-wide"
                    >
                      <span>🛒</span> Shop Amazon
                    </button>
                  </div>
                </div>
              ))}
              {section.items.length === 0 && (
                <div className="col-span-2 text-center py-6 text-stone-400 text-sm">
                  No recommendations found.
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Google Branding */}
        <div className="mt-8 pt-6 border-t border-stone-200 flex items-center justify-center gap-2 text-stone-400">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12C5,7.9 8.2,4.73 12.2,4.73C15.29,4.73 17.1,6.7 17.1,6.7L19,4.72C19,4.72 16.56,2 12.1,2C6.42,2 2.03,6.8 2.03,12C2.03,17.05 6.16,22 12.25,22C17.6,22 21.5,18.33 21.5,12.91C21.5,11.76 21.35,11.1 21.35,11.1V11.1Z" />
          </svg>
          <span className="text-xs font-medium">Powered by Google Gemini AI</span>
        </div>

        <style>{`
          @keyframes shine {
            100% { left: 125%; }
          }
        `}</style>
      </div>
    );
  };

  return (
    <div className="relative h-full flex flex-col">
      <div className="flex-1">
        {renderContent()}
      </div>
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur border-t border-stone-200 pb-safe z-50 lg:sticky lg:bottom-4 lg:rounded-2xl lg:shadow-xl lg:mx-4 lg:mb-4 lg:border-none">
        <div className="overflow-x-auto no-scrollbar">
          <div className="flex justify-between items-center min-w-max px-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabCategory)}
                className={`flex flex-col items-center justify-center w-16 py-3 transition-all relative ${activeTab === tab.id ? 'text-purple-600' : 'text-stone-400 hover:text-stone-600'
                  }`}
              >
                <span className={`text-xl mb-1 filter transition-transform duration-200 ${activeTab === tab.id ? '-translate-y-1' : ''}`}>
                  {tab.icon}
                </span>
                <span className="text-[9px] font-bold uppercase tracking-wider">{tab.label}</span>
                {activeTab === tab.id && (
                  <div className="absolute bottom-1 w-1 h-1 bg-purple-600 rounded-full"></div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};