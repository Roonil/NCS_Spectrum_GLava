//1. Particle size and number
#define numParticles ivec2(screen.xy)//Higher is slower. Leave it as is to render maximum number of particles (screen.x*screen.y)
#define particleSize 3 //Higher is slower. Radius of the individual particles. Minimum 1

//2. Particle Color, Opacity and Glow
#define color vec3(0.0118, 0.1412, 0.3412)//Color of the particles  //vec3(.0431,.1882,.8314); vec3(.2039,.051,.4941) vec3(.349,0.,1.) vec3(0.0, 0.3176, 1.0)(opacity=.03, cAS=0,op=.05,cAS=.04) vec3(1.0, 0.0, 0.298) (opacity=.2) vec3(0.1961, 0.0, 0.4549)(opacity=.05,cAS=.1) vec3(0.4196, 0.0314, 0.149)(op=.53,cAS=.13) vec3(0.0078, 0.0235, 0.0549),(op=.02,cAS=.6) vec3(0.6667, 0.0784, 0.0784) (op=0.03,cAS=.47), vec3(0.0118, 0.0196, 0.0157)(op=0.18,cAS=.6) vec3(0.0118, 0.1412, 0.3412)(op=.05,cAS=.2)
#define opacity 0.05 //Opacity of individual particles. Between 0 and 1
#define colorIntensityAddStrength 0.2 //Uses Add Color Blend mode to mix colors when particles overlap. Between 0 and 1
#define antiAlias 5.0 //Change this value in case some color combination produces jagged spherical edges. Greater than 0.

#define glowSize 10.0 //Determines the size of the glow.
#define glowIntensity 0.5 //Determines the additive strength when adding glow to the visualiser
#define glowDirections 16.0 //Higher is slower. The number of directions to look for while applying glow. The actual direction is then calculated by dividing 2*Pi by this number which specifies the angles around a point the glow shader looks at to apply the effect.
#define glowQuality 6.0 //Higher is slower. The quality of the glow. If using lower glow intensity or lower glow size, then keeping it to a lower value would not produce much visual difference and thus would be recommended.
#define glowColor color //The color to use to apply glow. Leave it to color to use the original color for glow, else specify as a vec3. For Example, vec3(0,1,0) would use a green color for glow

//3. Audio Influence
#define radiusAudioMultiplier 200 //Determines the sphere's size change by the audio's lower frequencies
#define fractalAudioMixing 0.50 //Between 0 and 1. Greater value means stronger reaction to beats or tonal changes in audio
#define fractalAudioMultiplier 9.0 //Determines the strength by which the audio stream affects the inner Fractal Field displacements

//4. Fractal Field Controls
#define octaveMultiplier 0.25 //Same as Trapcode Form
#define octaveScale 01.0 //Same as Trapcode Form
#define complexity 3 //Higher is slower. Same as Trapcode Form
#define fScale 4.6 //Same as Trapcode Form
#define gamma 1.0 //Same as Trapcode Form
#define minVal - 5.0 //Same as Trapcode Form
#define maxVal 5.0 //Same as Trapcode Form

#define offset 0.0 //Add offset to overall noise produced
#define noiseMultiplier 1.0 //Multiplier for generated noise

//5. Displacement and Flow Controls
#define isRadialDisplacement false //If set to true, uses radial displacement mode. Strength is determined by displaceX.
#define displaceX 110 //Same as Trapcode Form, Determines Displacement in X Axis
#define displaceY 95 //Same as Trapcode Form, Determines Displacement in Y Axis
#define displaceZ 115 //Same as Trapcode Form, Determines Displacement in Z Axis

#define flowX 0.0 //Same as Trapcode Form, Determines Flow of the Fractal Field in X Axis
#define flowY 0.033 //Same as Trapcode Form, Determines Flow of the Fractal Field in Y Axis
#define flowZ 0.0 //Same as Trapcode Form, Determines Flow of the Fractal Field in Z Axis
#define flowEvolution 0.015 //Same as Trapcode Form, Determines Flow Evolution of the Fractal Field in time

//6. Sphere Controls
#define sphereRadius 275 //Same as Trapcode Form, The radius of the Sphere
#define feather 0.45 //Between 0 and 1. Same as Trapcode Form, determines the size of the "band" around the Sphere
