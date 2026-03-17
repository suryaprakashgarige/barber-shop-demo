// src/components/features/FaceScanner.tsx
"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { FilesetResolver, FaceLandmarker, FaceLandmarkerResult } from "@mediapipe/tasks-vision";
import * as faceapi from 'face-api.js';
import { Button } from "@/components/ui/button";
import { Camera, Check, Copy, ScanFace, Sparkles, RefreshCcw } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type FaceShape = "Oval" | "Round" | "Square" | "Heart" | "Oblong" | null;

interface Hairstyle {
  id: string;
  name: string;
  image: string;
  shapes: FaceShape[];
  promptTemplate: string;
}

const HAIRSTYLES: Hairstyle[] = [
  // OVAL
  { 
    id: "oval-buzz", name: "The Classic Buzz Cut", 
    image: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=400&h=400&fit=crop", shapes: ["Oval"],
    promptTemplate: "Use the uploaded face image as reference. Keep the exact same face and identity. Photorealistic portrait of a [age-range] [gender] with an oval face shape, featuring a crisp, uniform Buzz Cut haircut. Professional barbershop lighting, sharp detail, front-facing, neutral background."
  },
  { 
    id: "oval-pomp", name: "The Modern Pompadour", 
    image: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=400&h=400&fit=crop", shapes: ["Oval"],
    promptTemplate: "Use the uploaded face image as reference. Keep the exact same face and identity. Photorealistic portrait of a [age-range] [gender] with an oval face shape, featuring a voluminous Modern Pompadour haircut with faded sides. Professional barbershop lighting, sharp detail, front-facing, neutral background."
  },
  { 
    id: "oval-side", name: "The Classic Side Part", 
    image: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=400&h=400&fit=crop", shapes: ["Oval"],
    promptTemplate: "Use the uploaded face image as reference. Keep the exact same face and identity. Photorealistic portrait of a [age-range] [gender] with an oval face shape, featuring a sharp Classic Side Part haircut with a sleek finish. Professional barbershop lighting, sharp detail, front-facing, neutral background."
  },
  // ROUND
  { 
    id: "round-quiff", name: "Textured Quiff with High Fade", 
    image: "https://images.unsplash.com/photo-1593726853403-f2cc6df5b974?w=400&h=400&fit=crop", shapes: ["Round"],
    promptTemplate: "Use the uploaded face image as reference. Keep the exact same face and identity. Photorealistic portrait of a [age-range] [gender] with a round face shape, featuring a Textured Quiff haircut with a high skin fade on the sides. Professional barbershop lighting, sharp detail, front-facing, neutral background."
  },
  { 
    id: "round-faux", name: "The Faux Hawk", 
    image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=400&h=400&fit=crop", shapes: ["Round"],
    promptTemplate: "Use the uploaded face image as reference. Keep the exact same face and identity. Photorealistic portrait of a [age-range] [gender] with a round face shape, featuring an edgy Faux Hawk haircut to add vertical volume. Professional barbershop lighting, sharp detail, front-facing, neutral background."
  },
  { 
    id: "round-crop", name: "French Crop with Skin Fade", 
    image: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=400&h=400&fit=crop", shapes: ["Round"],
    promptTemplate: "Use the uploaded face image as reference. Keep the exact same face and identity. Photorealistic portrait of a [age-range] [gender] with a round face shape, featuring a blunt French Crop haircut with a tight skin fade. Professional barbershop lighting, sharp detail, front-facing, neutral background."
  },
  // SQUARE
  { 
    id: "square-crew", name: "The Clean Crew Cut", 
    image: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=400&h=400&fit=crop", shapes: ["Square"],
    promptTemplate: "Use the uploaded face image as reference. Keep the exact same face and identity. Photorealistic portrait of a [age-range] [gender] with a square face shape, featuring a short, clean Crew Cut haircut. Professional barbershop lighting, sharp detail, front-facing, neutral background."
  },
  { 
    id: "square-slick", name: "Slicked Back Undercut", 
    image: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=400&h=400&fit=crop", shapes: ["Square"],
    promptTemplate: "Use the uploaded face image as reference. Keep the exact same face and identity. Photorealistic portrait of a [age-range] [gender] with a square face shape, featuring a Slicked Back Undercut haircut with disconnected sides. Professional barbershop lighting, sharp detail, front-facing, neutral background."
  },
  { 
    id: "square-fringe", name: "Short Textured Fringe", 
    image: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=400&h=400&fit=crop", shapes: ["Square"],
    promptTemplate: "Use the uploaded face image as reference. Keep the exact same face and identity. Photorealistic portrait of a [age-range] [gender] with a square face shape, featuring a Short Textured Fringe haircut to soften the jawline. Professional barbershop lighting, sharp detail, front-facing, neutral background."
  },
  // HEART
  { 
    id: "heart-flow", name: "Mid-Length Flow / Bro Flow", 
    image: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=400&h=400&fit=crop", shapes: ["Heart"],
    promptTemplate: "Use the uploaded face image as reference. Keep the exact same face and identity. Photorealistic portrait of a [age-range] [gender] with a heart face shape, featuring a relaxed Mid-Length Flow haircut pushed back naturally. Professional barbershop lighting, sharp detail, front-facing, neutral background."
  },
  { 
    id: "heart-taper", name: "Classic Taper with Swept Back Hair", 
    image: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=400&h=400&fit=crop", shapes: ["Heart"],
    promptTemplate: "Use the uploaded face image as reference. Keep the exact same face and identity. Photorealistic portrait of a [age-range] [gender] with a heart face shape, featuring a Classic Taper haircut with medium-length swept-back top hair. Professional barbershop lighting, sharp detail, front-facing, neutral background."
  },
  { 
    id: "heart-wavy", name: "Wavy Shag", 
    image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=400&h=400&fit=crop", shapes: ["Heart"],
    promptTemplate: "Use the uploaded face image as reference. Keep the exact same face and identity. Photorealistic portrait of a [age-range] [gender] with a heart face shape, featuring a messy, layered Wavy Shag haircut. Professional barbershop lighting, sharp detail, front-facing, neutral background."
  },
  // OBLONG
  { 
    id: "oblong-taper", name: "Classic Taper Fade with Side Sweep", 
    image: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=400&h=400&fit=crop", shapes: ["Oblong"],
    promptTemplate: "Use the uploaded face image as reference. Keep the exact same face and identity. Photorealistic portrait of a [age-range] [gender] with an oblong face shape, featuring a Classic Taper Fade with a neat side-swept top. Professional barbershop lighting, sharp detail, front-facing, neutral background."
  },
  { 
    id: "oblong-crop", name: "Textured Crop (Low Fade)", 
    image: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=400&h=400&fit=crop", shapes: ["Oblong"],
    promptTemplate: "Use the uploaded face image as reference. Keep the exact same face and identity. Photorealistic portrait of a [age-range] [gender] with an oblong face shape, featuring a forward-laying Textured Crop haircut with a low, conservative fade. Professional barbershop lighting, sharp detail, front-facing, neutral background."
  },
  { 
    id: "oblong-buzz", name: "Buzz Cut with Line Up", 
    image: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=400&h=400&fit=crop", shapes: ["Oblong"],
    promptTemplate: "Use the uploaded face image as reference. Keep the exact same face and identity. Photorealistic portrait of a [age-range] [gender] with an oblong face shape, featuring an even length Buzz Cut with a sharp, geometric front line up. Professional barbershop lighting, sharp detail, front-facing, neutral background."
  },
  // UNIVERSAL
  { 
    id: "univ-mullet", name: "The Burst Fade Mullet", 
    image: "https://images.unsplash.com/photo-1593726853403-f2cc6df5b974?w=400&h=400&fit=crop", shapes: ["Oval", "Round", "Square", "Heart", "Oblong"],
    promptTemplate: "Use the uploaded face image as reference. Keep the exact same face and identity. Photorealistic portrait of a [age-range] [gender] with a [face-shape] face shape, featuring a modern Burst Fade Mullet haircut with textured length in the back. Professional barbershop lighting, sharp detail, front-facing, neutral background."
  },
  { 
    id: "univ-braids", name: "Tight Cornrows / Braids", 
    image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=400&h=400&fit=crop", shapes: ["Oval", "Round", "Square", "Heart", "Oblong"],
    promptTemplate: "Use the uploaded face image as reference. Keep the exact same face and identity. Photorealistic portrait of a [age-range] [gender] with a [face-shape] face shape, featuring clean, tight Cornrow braids. Professional barbershop lighting, sharp detail, front-facing, neutral background."
  },
  { 
    id: "univ-afro", name: "Sponge Twist / Rounded Afro", 
    image: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=400&h=400&fit=crop", shapes: ["Oval", "Round", "Square", "Heart", "Oblong"],
    promptTemplate: "Use the uploaded face image as reference. Keep the exact same face and identity. Photorealistic portrait of a [age-range] [gender] with a [face-shape] face shape, featuring a perfectly shaped natural Afro with sponge twists. Professional barbershop lighting, sharp detail, front-facing, neutral background."
  },
];

interface ScanResult {
  faceShape: FaceShape;
  ageRange: string;
  gender: string;
}

export function FaceScanner() {
  const containerRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [isReady, setIsReady] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [hasDimensions, setHasDimensions] = useState(false);
  const [hasFace, setHasFace] = useState(false);

  const hasDimensionsRef = useRef(false);
  const hasFaceRef = useRef(false);
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<Hairstyle | null>(null);
  const [copied, setCopied] = useState(false);
  const [landmarker, setLandmarker] = useState<FaceLandmarker | null>(null);

  const reqAnimRef = useRef<number | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Suppress MediaPipe's TFLite Info logs to console.error that interrupt Next.js dev overlays
  useEffect(() => {
    const originalError = console.error;
    console.error = (...args: any[]) => {
      const msg = args[0];
      if (typeof msg === 'string' && msg.includes('INFO: Created TensorFlow Lite XNNPACK delegate')) {
        return; // ignore
      }
      originalError(...args);
    };
    return () => {
      console.error = originalError;
    };
  }, []);

  // Load Models
  useEffect(() => {
    const initModels = async () => {
      // 1. MediaPipe
      const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/wasm"
      );
      const faceLandmarker = await FaceLandmarker.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath: "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task",
          delegate: "GPU"
        },
        outputFaceBlendshapes: true,
        runningMode: "VIDEO",
        numFaces: 1
      });
      setLandmarker(faceLandmarker);

      // 2. face-api.js
      await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
      await faceapi.nets.ageGenderNet.loadFromUri('/models');

      setIsReady(true);
    };
    initModels();

    gsap.registerPlugin(ScrollTrigger);
    gsap.from(".scanner-header", {
      scrollTrigger: {
        trigger: ".scanner-section",
        start: "top 80%",
      },
      y: 30, opacity: 0, duration: 0.8, ease: "power2.out"
    });
  }, []);

  const calculateFaceShape = (landmarks: any[]): FaceShape => {
    const dist = (idx1: number, idx2: number) => {
      const p1 = landmarks[idx1];
      const p2 = landmarks[idx2];
      if (!p1 || !p2) return 0;
      const width = videoRef.current?.videoWidth || 1;
      const height = videoRef.current?.videoHeight || 1;
      return Math.hypot((p1.x - p2.x) * width, (p1.y - p2.y) * height);
    };

    const faceWidth = dist(234, 454);   // cheek to cheek
    const faceHeight = dist(10, 152);    // forehead to chin
    const jawWidth = dist(172, 397);     // jaw corners
    const foreheadWidth = dist(70, 300);  // forehead width

    if (faceWidth === 0) return "Oval";

    const lwRatio = faceHeight / faceWidth;
    const foreheadToJaw = foreheadWidth / (jawWidth || 1);
    const foreheadToFace = foreheadWidth / faceWidth;
    const jawToFace = jawWidth / faceWidth;

    // Estimate Jaw Angle (approximate for Round vs Square)
    const estimateJawAngle = () => {
      const lj = landmarks[172];
      const ch = landmarks[152];
      const rj = landmarks[397];
      if (!lj || !ch || !rj) return 130;
      
      const width = videoRef.current?.videoWidth || 1;
      const height = videoRef.current?.videoHeight || 1;
      
      const v1x = (lj.x - ch.x) * width;
      const v1y = (lj.y - ch.y) * height;
      const v2x = (rj.x - ch.x) * width;
      const v2y = (rj.y - ch.y) * height;
      
      const dot = v1x * v2x + v1y * v2y;
      const mag1 = Math.hypot(v1x, v1y);
      const mag2 = Math.hypot(v2x, v2y);
      if (mag1 === 0 || mag2 === 0) return 130;
      const cosAngle = Math.max(-1, Math.min(1, dot / (mag1 * mag2)));
      return Math.acos(cosAngle) * (180 / Math.PI);
    };

    const jawAngle = estimateJawAngle();

    // 1. OBLONG
    if (lwRatio >= 1.6) return "Oblong";

    // 2. SQUARE vs ROUND
    if (lwRatio < 1.15) {
      if (jawAngle < 130) return "Square";
      return "Round";
    }

    // 3. HEART
    if (lwRatio >= 1.15 && lwRatio < 1.45 && foreheadToJaw > 1.15) return "Heart";

    return "Oval"; // fallback
  };

  const getAgeRangeBracket = (age: number) => {
    if (age <= 22) return "15-20";
    if (age <= 30) return "20-30";
    if (age <= 40) return "30-40";
    if (age <= 50) return "40-50";
    return "50+";
  };

  const drawLandmarks = (result: FaceLandmarkerResult) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx || !videoRef.current) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    if (result.faceLandmarks.length > 0) {
      ctx.fillStyle = "#DC2626"; // Primary red for dots
      for (const landmarks of result.faceLandmarks) {
        const keyIndices = [10, 152, 234, 454, 132, 361];
        for (const idx of keyIndices) {
          const point = landmarks[idx];
          if (point) {
            const x = point.x * canvas.width;
            const y = point.y * canvas.height;
            ctx.beginPath();
            ctx.arc(x, y, 4, 0, 2 * Math.PI);
            ctx.fill();
          }
        }
      }
    }
  };

  const predictLoop = async () => {
    if (videoRef.current && landmarker && isScanning) {
      const startTimeMs = performance.now();
      if (
        videoRef.current.readyState >= 2 && 
        videoRef.current.videoWidth > 0 && 
        videoRef.current.videoHeight > 0
      ) {
        if (!hasDimensionsRef.current) {
          hasDimensionsRef.current = true;
          if (canvasRef.current && videoRef.current) {
            canvasRef.current.width = videoRef.current.videoWidth;
            canvasRef.current.height = videoRef.current.videoHeight;
          }
          setHasDimensions(true);
        }
        try {
          // 1. MediaPipe for Shape
          const results = landmarker.detectForVideo(videoRef.current, startTimeMs);
          
          const isFaceVisible = results.faceLandmarks.length > 0;
          if (hasFaceRef.current !== isFaceVisible) {
            hasFaceRef.current = isFaceVisible;
            setHasFace(isFaceVisible);
          }

          drawLandmarks(results);
        } catch (err) {
          // Suppress frame sizing race errors
        }
      }
      reqAnimRef.current = requestAnimationFrame(predictLoop);
    }
  };

  useEffect(() => {
    if (isScanning) {
      if (videoRef.current && streamRef.current) {
        videoRef.current.srcObject = streamRef.current;
        videoRef.current.play().catch(e => console.error("Video play failed:", e));
      }
      reqAnimRef.current = requestAnimationFrame(predictLoop);
    }
    return () => {
      if (reqAnimRef.current) cancelAnimationFrame(reqAnimRef.current);
    };
  }, [isScanning, landmarker]);

  const startScan = async () => {
    if (!landmarker || !isReady) return;
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      streamRef.current = stream;
      setIsScanning(true);
      setScanResult(null);
      setSelectedStyle(null);
    } catch (err) {
      console.error("Camera access denied:", err);
    }
  };

  const analyzeFace = async () => {
    if (!videoRef.current || !landmarker) return;
    setIsAnalyzing(true);
    
    try {
      if (videoRef.current.videoWidth === 0 || videoRef.current.videoHeight === 0) {
        throw new Error("Video Dimensions not ready.");
      }

      const mpResults = landmarker.detectForVideo(videoRef.current, performance.now());
      if (mpResults.faceLandmarks.length === 0) {
        alert("No face detected! Please look directly at the camera.");
        setIsAnalyzing(false);
        return;
      }
      
      let calcShape: FaceShape = "Oval";
      calcShape = calculateFaceShape(mpResults.faceLandmarks[0]);

      let calcAge = "20-30";
      let calcGender = "male";
      try {
        const detection = await faceapi.detectSingleFace(
          videoRef.current, 
          new faceapi.TinyFaceDetectorOptions()
        ).withAgeAndGender();
        
        if (detection) {
          calcAge = getAgeRangeBracket(detection.age);
          calcGender = detection.gender;
        }
      } catch (e) {
        console.error("face-api failed:", e);
      }

      stopScan();
      setScanResult({
        faceShape: calcShape,
        ageRange: calcAge,
        gender: calcGender as "male" | "female"
      });
    } catch (err) {
      console.error("Scan calculation failed:", err);
      stopScan();
      setScanResult({ faceShape: "Oval", ageRange: "20-30", gender: "male" });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const stopScan = () => {
    setIsScanning(false);
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    hasDimensionsRef.current = false;
    setHasDimensions(false);
  };

  const fillPrompt = (template: string, result: ScanResult) => {
    return template
      .replace("[age-range]", `${result.ageRange}-year-old`)
      .replace("[gender]", result.gender)
      .replace("[face-shape]", result.faceShape?.toLowerCase() || "oval");
  };

  const copyPrompt = () => {
    if (!scanResult || !selectedStyle) return;
    const finalPrompt = fillPrompt(selectedStyle.promptTemplate, scanResult);
    navigator.clipboard.writeText(finalPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getRecommendations = () => {
    if (!scanResult?.faceShape) return [];
    // Prioritize shape-specific styles, followed by universal ones
    const specific = HAIRSTYLES.filter(h => h.shapes.includes(scanResult.faceShape) && !h.id.startsWith('univ')).slice(0, 3);
    const universal = HAIRSTYLES.filter(h => h.id.startsWith('univ')).slice(0, 1); // Mix in 1 universal style
    return [...specific, ...universal].slice(0, 3); // Max 3 options
  };

  return (
    <section ref={containerRef} className="py-24 bg-card scanner-section" id="feature">
      <div className="container mx-auto px-4 max-w-5xl">
        
        <div className="text-center mb-16 scanner-header">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">Find Your Perfect Cut</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Not sure what suits you? Use our AI Face Shape Scanner. We'll map your facial structure and recommend the exact cuts that will look best on you.
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-border overflow-hidden">
          <div className="grid md:grid-cols-2">
            
            {/* Camera / Feed Area */}
            <div className="relative bg-black min-h-[400px] flex flex-col items-center justify-center p-6 border-b md:border-b-0 md:border-r border-border">
              {!isScanning && !scanResult && (
                <div className="text-center">
                  <ScanFace className="w-20 h-20 text-muted-foreground mx-auto mb-6 opacity-50" />
                  <Button 
                    onClick={startScan} 
                    disabled={!isReady}
                    size="lg" 
                    className="bg-primary hover:bg-primary/90 text-white font-bold h-14 px-8 rounded-full disabled:opacity-50"
                  >
                    <Camera className="w-5 h-5 mr-2" />
                    {isReady ? "Scan My Face" : "Loading AI Models..."}
                  </Button>
                </div>
              )}

              {isScanning && (
                <>
                  <video 
                    ref={videoRef} 
                    className="absolute inset-0 w-full h-full object-cover opacity-80 [transform:scaleX(-1)]" 
                    playsInline 
                    muted 
                  />
                  <canvas 
                    ref={canvasRef} 
                    className="absolute inset-0 w-full h-full [transform:scaleX(-1)]"
                    width={400} 
                    height={400} 
                  />
                  <div className="absolute inset-x-0 bottom-8 flex justify-center z-20">
                    <Button 
                      onClick={analyzeFace} 
                      disabled={isAnalyzing || !hasDimensions || !hasFace}
                      size="lg" 
                      className={`bg-primary hover:bg-primary/90 text-white font-bold h-12 px-6 rounded-full shadow-lg ${(!hasDimensions || !hasFace || isAnalyzing) ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                      <Sparkles className="w-5 h-5 mr-2" />
                      {!hasDimensions ? "Initializing Video..." : !hasFace ? "No Face Detected" : isAnalyzing ? "Analyzing..." : "Capture & Analyze"}
                    </Button>
                  </div>
                </>
              )}

              {scanResult && !isScanning && (
                <div className="text-center animate-in zoom-in duration-500 w-full px-4">
                  <div className="w-24 h-24 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-primary/30">
                    <Sparkles className="w-10 h-10" />
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur border border-white/20 rounded-xl p-4 mb-6 text-white text-left">
                     <p className="font-semibold text-gray-400 text-xs tracking-wider uppercase mb-2">Detected Profile</p>
                     <div className="grid grid-cols-2 gap-4">
                       <div>
                         <p className="text-sm text-gray-400">Shape</p>
                         <p className="font-bold text-lg">{scanResult.faceShape}</p>
                       </div>
                       <div>
                         <p className="text-sm text-gray-400">Demographics</p>
                         <p className="font-bold text-lg capitalize">{scanResult.gender}, {scanResult.ageRange}</p>
                       </div>
                     </div>
                  </div>

                  <Button onClick={startScan} variant="outline" className="border-gray-600 text-white hover:bg-white hover:text-black rounded-full">
                    <RefreshCcw className="w-4 h-4 mr-2" /> Rescan
                  </Button>
                </div>
              )}
            </div>

            {/* Results Area */}
            <div className="p-8 md:p-12 bg-gray-50 flex flex-col justify-center">
              {!scanResult ? (
                <div className="text-center text-muted-foreground">
                  <p className="text-lg">Scan your face to see your AI-tailored recommendations here.</p>
                </div>
              ) : (
                <div className="animate-in fade-in slide-in-from-right-8 duration-700">
                  <h4 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                    Top Recommendations
                  </h4>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                    {getRecommendations().map(style => (
                      <div 
                        key={style.id}
                        onClick={() => setSelectedStyle(style)}
                        className={`cursor-pointer rounded-xl overflow-hidden border-2 transition-all ${
                          selectedStyle?.id === style.id ? 'border-primary ring-4 ring-primary/20 scale-105 shadow-md' : 'border-border hover:border-primary/50 bg-white'
                        }`}
                      >
                        <div className="relative h-32 w-full">
                          <Image src={style.image} alt={style.name} fill className="object-cover" />
                        </div>
                        <div className="p-3 text-center bg-white">
                          <p className="font-semibold text-foreground text-sm">{style.name}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {selectedStyle && (
                    <div className="animate-in slide-in-from-bottom-4 duration-500 space-y-4">
                      <div className="bg-white p-6 rounded-xl border border-primary/20 shadow-sm relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-2 h-full bg-primary" />
                        <h5 className="font-bold text-foreground mb-2">Show this prompt to an AI Generator</h5>
                        <p className="text-sm text-muted-foreground mb-6 font-mono bg-muted p-4 rounded-md">
                          "{fillPrompt(selectedStyle.promptTemplate, scanResult)}"
                        </p>
                        <Button 
                          onClick={copyPrompt} 
                          className="w-full bg-primary hover:bg-primary/90 text-white font-bold h-12 rounded-sm"
                        >
                          {copied ? <Check className="w-5 h-5 mr-2" /> : <Copy className="w-5 h-5 mr-2" />}
                          {copied ? "Copied!" : "Copy Prompt for ChatGPT"}
                        </Button>
                      </div>
                      <p className="text-xs text-center text-muted-foreground w-full">
                        Paste this into ChatGPT or Bing Image Creator (free) to visualize it on a similar face before you sit in the chair.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
