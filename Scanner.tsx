import React, { useState, useEffect } from 'react';

interface ScannerProps {
  image: string;
}

export const Scanner: React.FC<ScannerProps> = ({ image }) => {
  const [scanProgress, setScanProgress] = useState(0);
  const [detectedPoints, setDetectedPoints] = useState<{ x: number, y: number, label: string }[]>([]);
  const [isScanning, setIsScanning] = useState(true);

  useEffect(() => {
    // Simulate progressive scanning
    const interval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          setIsScanning(false);
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 60);

    // Add facial landmark points progressively
    const pointsTimeout = setTimeout(() => {
      setDetectedPoints([
        { x: 50, y: 30, label: 'Forehead' },
        { x: 35, y: 45, label: 'Left Eye' },
        { x: 65, y: 45, label: 'Right Eye' },
        { x: 50, y: 55, label: 'Nose' },
        { x: 50, y: 70, label: 'Mouth' },
        { x: 30, y: 60, label: 'Left Cheek' },
        { x: 70, y: 60, label: 'Right Cheek' },
        { x: 50, y: 85, label: 'Chin' },
      ]);
    }, 1500);

    return () => {
      clearInterval(interval);
      clearTimeout(pointsTimeout);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-40 bg-black flex flex-col items-center justify-center overflow-hidden">
      <div className="relative w-full max-w-md aspect-[3/4] md:rounded-3xl overflow-hidden shadow-2xl border-2 border-cyan-500/50">
        <img src={image} alt="Scanning" className={`w-full h-full object-cover transition-all duration-1000 ${isScanning ? 'opacity-60 filter grayscale contrast-125' : 'opacity-80'}`} />

        {/* Enhanced Holographic Grid Background */}
        <div className={`absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.2)_2px,transparent_2px),linear-gradient(90deg,rgba(0,255,255,0.2)_2px,transparent_2px)] bg-[size:30px_30px] opacity-40 transition-opacity duration-1000 ${isScanning ? 'animate-[gridMove_3s_linear_infinite]' : 'opacity-20'}`}></div>

        {/* Enhanced 3D Scanning Beam (Laser) - More Visible */}
        {isScanning && (
          <>
            <div className="absolute inset-x-0 h-1 bg-cyan-400 shadow-[0_0_30px_10px_rgba(34,211,238,1),0_0_60px_20px_rgba(34,211,238,0.5)] z-20 animate-[scan_3s_ease-in-out_infinite]">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-300 to-transparent"></div>
            </div>
            {/* Secondary scan line for depth */}
            <div className="absolute inset-x-0 h-0.5 bg-purple-400 shadow-[0_0_20px_8px_rgba(168,85,247,0.8)] z-19 animate-[scan_3s_ease-in-out_infinite_0.5s]"></div>
          </>
        )}

        {/* Enhanced 3D Wireframe Face Overlay */}
        <div className={`absolute inset-0 flex items-center justify-center z-10 transition-opacity duration-1000 ${isScanning ? 'opacity-100' : 'opacity-30'}`}>
          <div className={`w-64 h-80 border-2 border-cyan-400/60 rounded-[50%] relative ${isScanning ? 'animate-[spin3D_6s_linear_infinite]' : ''} [transform-style:preserve-3d] shadow-[0_0_40px_rgba(34,211,238,0.6)]`}>
            <div className="absolute inset-0 border-2 border-purple-400/50 rounded-[50%] [transform:rotateY(60deg)]"></div>
            <div className="absolute inset-0 border-2 border-pink-400/50 rounded-[50%] [transform:rotateY(-60deg)]"></div>
            <div className="absolute inset-0 border-t-2 border-b-2 border-cyan-300/60 rounded-[50%] [transform:scale(0.8)]"></div>
            <div className="absolute inset-0 border-t-2 border-b-2 border-cyan-300/40 rounded-[50%] [transform:scale(0.6)]"></div>

            {/* Enhanced Floating nodes */}
            <div className="absolute top-0 left-1/2 w-3 h-3 bg-cyan-400 rounded-full shadow-[0_0_15px_5px_#22d3ee] animate-pulse"></div>
            <div className="absolute bottom-0 left-1/2 w-3 h-3 bg-cyan-400 rounded-full shadow-[0_0_15px_5px_#22d3ee] animate-pulse"></div>
            <div className="absolute top-1/2 left-0 w-3 h-3 bg-purple-400 rounded-full shadow-[0_0_15px_5px_#a855f7] animate-pulse delay-300"></div>
            <div className="absolute top-1/2 right-0 w-3 h-3 bg-purple-400 rounded-full shadow-[0_0_15px_5px_#a855f7] animate-pulse delay-300"></div>
          </div>
        </div>

        {/* Facial Landmark Detection Points */}
        {detectedPoints.map((point, idx) => (
          <div
            key={idx}
            className={`absolute z-30 transition-all duration-500 ${!isScanning ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}
            style={{
              left: `${point.x}%`,
              top: `${point.y}%`,
              transform: 'translate(-50%, -50%)',
              animationDelay: `${idx * 0.1}s`
            }}
          >
            {/* Crosshair */}
            <div className="relative w-8 h-8">
              <div className="absolute inset-0 border-2 border-green-400 rounded-full animate-ping"></div>
              <div className="absolute inset-2 border-2 border-green-400 rounded-full bg-green-400/20"></div>
              <div className="absolute left-1/2 top-0 w-0.5 h-full bg-green-400 -translate-x-1/2"></div>
              <div className="absolute top-1/2 left-0 h-0.5 w-full bg-green-400 -translate-y-1/2"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-1 h-1 bg-green-400 rounded-full shadow-[0_0_10px_#4ade80]"></div>
              </div>
            </div>
            {/* Label */}
            {!isScanning && (
              <div className="absolute top-10 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black/80 backdrop-blur px-2 py-1 rounded text-green-400 text-[8px] font-mono font-bold border border-green-400/30">
                {point.label}
              </div>
            )}
          </div>
        ))}

        {/* Digital Noise / Glitch Effect */}
        {isScanning && (
          <div className="absolute inset-0 bg-repeat opacity-10 animate-[noise_0.2s_steps(2)_infinite]" style={{ backgroundImage: 'url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48ZmlsdGVyIGlkPSJuIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iMC42NSIgLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWx0ZXI9InVybCgjbikiIG9wYWNpdHk9IjAuNSIvPjwvc3ZnPg==")' }}></div>
        )}

        {/* HUD Data Overlay */}
        <div className="absolute inset-0 p-6 flex flex-col justify-between z-30 pointer-events-none">
          <div className="flex justify-between font-mono text-[10px] text-cyan-300 tracking-widest">
            <span className={isScanning ? 'animate-pulse' : ''}>AI_ANALYSIS_PROTOCOL_V3.0</span>
            <span>ID: {Math.random().toString(36).substr(2, 6).toUpperCase()}</span>
          </div>

          <div className="space-y-3">
            {/* Dynamic Analysis Lines */}
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${scanProgress > 30 ? 'bg-green-500' : 'bg-cyan-500 animate-ping'}`}></div>
              <span className={`font-mono text-xs ${scanProgress > 30 ? 'text-green-400' : 'text-cyan-400'}`}>
                {scanProgress > 30 ? '✓ FACIAL LANDMARKS MAPPED' : 'MAPPING FACIAL LANDMARKS...'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${scanProgress > 60 ? 'bg-green-500' : scanProgress > 30 ? 'bg-pink-500 animate-ping' : 'bg-stone-600'}`}></div>
              <span className={`font-mono text-xs ${scanProgress > 60 ? 'text-green-400' : scanProgress > 30 ? 'text-pink-400' : 'text-stone-500'}`}>
                {scanProgress > 60 ? '✓ SKIN ANALYSIS COMPLETE' : scanProgress > 30 ? 'ANALYZING SKIN PIGMENTATION...' : 'PENDING...'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${scanProgress >= 100 ? 'bg-green-500' : scanProgress > 60 ? 'bg-purple-500 animate-ping' : 'bg-stone-600'}`}></div>
              <span className={`font-mono text-xs ${scanProgress >= 100 ? 'text-green-400' : scanProgress > 60 ? 'text-purple-400' : 'text-stone-500'}`}>
                {scanProgress >= 100 ? '✓ PROFILE GENERATED' : scanProgress > 60 ? 'GENERATING PROFILE...' : 'PENDING...'}
              </span>
            </div>

            {/* Progress Bar */}
            <div className="h-1.5 w-full bg-stone-800 rounded-full overflow-hidden mt-4 border border-cyan-500/30">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 transition-all duration-300 shadow-[0_0_10px_rgba(34,211,238,0.8)]"
                style={{ width: `${scanProgress}%` }}
              ></div>
            </div>
            <div className="text-right font-mono text-xs text-cyan-300">{scanProgress}%</div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scan {
          0%, 100% { top: -2%; opacity: 1; }
          50% { top: 102%; opacity: 1; }
        }
        @keyframes spin3D {
          0% { transform: rotateY(0deg) rotateX(10deg); }
          100% { transform: rotateY(360deg) rotateX(10deg); }
        }
        @keyframes gridMove {
          0% { transform: translateY(0); }
          100% { transform: translateY(30px); }
        }
        @keyframes noise {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.15; }
        }
      `}</style>
    </div>
  );
};