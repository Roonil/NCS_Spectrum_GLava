in vec4 gl_FragCoord;

#request uniform "screen" screen
uniform ivec2 screen;
precision highp float;

#request uniform "time" time
uniform float time;

#request timecycle 0

out vec4 fragment;

layout(binding = 5, r32ui)uniform uimage2D depthImage;

#request uniform "prev" prev
uniform sampler2D prev;

#include ":ncs.glsl"

void main()
{
    uint depth = 0;
    depth = imageAtomicExchange(depthImage, ivec2(gl_FragCoord.xy), depth);
    
    if (depth != 0)
    {
        fragment.w = 1;
        
        fragment.xyz = color.xyz;
        fragment *= (pow(float(depth) / particleSize , colorIntensityAddStrength) - (colorIntensityAddStrength)) * (1 - pow(1 - opacity, float(depth) / particleSize));
        
    }
    else fragment = vec4(0);
}

