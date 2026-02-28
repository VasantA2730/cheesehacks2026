/**
 * @file VideoFeed.tsx
 * @description Simulated endoscopic camera view for the surgical console.
 *
 * Displays a dark surgical field with:
 *  - Center crosshair reticle for instrument alignment
 *  - Animated instrument tracking indicator (yellow circle)
 *  - Pulsing REC indicator when recording is active
 *  - Network latency badge (top-left)
 *
 * @project  CheeseHacks 2026 — Remote Surgery Interface
 * @version  0.0.1
 * @since    2026-02-28
 */

import { useState } from "react";
import { VideoOff, Circle } from "lucide-react";
import { motion } from "motion/react";

/** Live camera feed panel with overlay HUD elements. */
export function VideoFeed() {
  const [isRecording, setIsRecording] = useState(true);
  const [cameraActive, setCameraActive] = useState(true);

  return (
    <div className="relative w-full h-full overflow-hidden bg-zinc-950">
      {/* Full-bleed video area */}
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 to-zinc-950 flex items-center justify-center">
        {cameraActive ? (
          <>
            {/* Subtle color overlay simulating surgical field illumination */}
            <div className="absolute inset-0 bg-gradient-to-br from-red-950/20 to-blue-950/20" />

            {/* Center crosshair — four lines + center dot */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-24 h-24">
                <div className="absolute top-0 left-1/2 w-px h-3 bg-blue-400/40" />
                <div className="absolute bottom-0 left-1/2 w-px h-3 bg-blue-400/40" />
                <div className="absolute left-0 top-1/2 w-3 h-px bg-blue-400/40" />
                <div className="absolute right-0 top-1/2 w-3 h-px bg-blue-400/40" />
                <div className="absolute top-1/2 left-1/2 w-1.5 h-1.5 border border-blue-400/40 rounded-full -translate-x-1/2 -translate-y-1/2" />
              </div>
            </div>

            {/* Animated instrument tracker — slow figure-8 drift */}
            <motion.div
              className="absolute top-1/2 left-1/2 w-12 h-12"
              animate={{
                x: [0, 10, -10, 0],
                y: [0, -5, 5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <div className="w-full h-full border border-yellow-400/30 rounded-full" />
            </motion.div>
          </>
        ) : (
          <VideoOff className="w-16 h-16 text-zinc-800" />
        )}

        {/* Recording indicator — pulsing red dot + "REC" label */}
        {isRecording && (
          <motion.div
            className="absolute top-4 right-4 flex items-center gap-2 bg-red-500/10 backdrop-blur-sm px-3 py-1.5 rounded-full border border-red-500/20"
            animate={{ opacity: [1, 0.6, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <Circle className="w-2 h-2 fill-red-500 text-red-500" />
            <span className="text-xs text-red-400 font-medium">REC</span>
          </motion.div>
        )}

        {/* Network latency badge */}
        <div className="absolute top-4 left-4">
          <div className="text-xs bg-green-500/10 text-green-400 px-3 py-1.5 rounded backdrop-blur-sm font-mono border border-green-500/20">
            <span className="inline-block w-1.5 h-1.5 bg-green-400 rounded-full mr-2" />
            12ms
          </div>
        </div>
      </div>
    </div>
  );
}