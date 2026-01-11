17:06:06.067 Running build in Washington, D.C., USA (East) – iad1
17:06:06.068 Build machine configuration: 2 cores, 8 GB
17:06:06.206 Cloning github.com/53S-razim/53-studios-website (Branch: v2.0, Commit: ef703a6)
17:06:09.285 Cloning completed: 3.078s
17:06:09.382 Restored build cache from previous deployment (J96ho1BtWCPAJoy4iVnw8xpiERwL)
17:06:10.027 Running "vercel build"
17:06:10.469 Vercel CLI 50.1.6
17:06:10.814 Installing dependencies...
17:06:26.076
17:06:26.077 up to date in 15s
17:06:26.077
17:06:26.078 148 packages are looking for funding
17:06:26.078   run `npm fund` for details
17:06:26.115 Detected Next.js version: 16.1.1
17:06:26.116 Running "npm run build"
17:06:26.218
17:06:26.218 > 53-studios-website@2.0.0 build
17:06:26.219 > next build
17:06:26.219
17:06:27.235 ▲ Next.js 16.1.1 (Turbopack)
17:06:27.235
17:06:27.267   Creating an optimized production build ...
17:06:38.448 ✓ Compiled successfully in 10.6s
17:06:38.454   Running TypeScript ...
17:06:43.818 Failed to compile.
17:06:43.819
17:06:43.821 ./src/components/ui/GlassPanel.tsx:34:9
17:06:43.821 Type error: Type 'ReactNode | MotionValueNumber | MotionValueString' is not assignable to type 'ReactNode'.
17:06:43.821   Type 'MotionValueNumber' is not assignable to type 'ReactNode'.
17:06:43.822
17:06:43.822 [0m [90m 32 |[39m       [33m>[39m
17:06:43.822  [90m 33 |[39m         {[90m/* Specular Highlight - Apple-style top shine */[39m}
17:06:43.822 [31m[1m>[22m[39m[90m 34 |[39m         [33m<[39m[33mdiv[39m
17:06:43.822  [90m    |[39m         [31m[1m^[22m[39m
17:06:43.822  [90m 35 |[39m           className[33m=[39m[32m"absolute inset-x-0 top-0 h-[1px] rounded-t-2xl pointer-events-none"[39m
17:06:43.822  [90m 36 |[39m           style[33m=[39m{{
17:06:43.822  [90m 37 |[39m             background[33m:[39m [32m"linear-gradient(90deg, transparent 0%, var(--glass-specular) 50%, transparent 100%)"[39m[33m,[39m[0m
17:06:43.856 Next.js build worker exited with code: 1 and signal: null
17:06:43.892 Error: Command "npm run build" exited with 1
