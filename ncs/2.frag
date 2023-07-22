in vec4 gl_FragCoord;

#request uniform "screen" screen
uniform ivec2 screen;
precision highp float;

#request uniform "time" time
uniform float time;

#request timecycle 0

out vec4 fragment;

layout(binding = 4, rgba32f)coherent uniform image2D image;
layout(binding = 5, r32ui)uniform uimage2D depthImage;

#request uniform "prev" prev
uniform sampler2D prev;

void main()
{
    vec4 img = imageLoad(image, ivec2(gl_FragCoord.xy));
    vec3 color = vec3(0.0, 0.3176, 1.0); //vec3(.0431,.1882,.8314); vec3(.2039,.051,.4941) vec3(.349,0.,1.) vec3(0.0, 0.3176, 1.0)
    
    float opacity = 0.15;
    opacity /= 5;
    
    if ((img.r) != 0)
    {
        fragment.w = 1;
        float particleSize = img.b;
        
        uint depth = 0;
        depth = imageAtomicExchange(depthImage, ivec2(gl_FragCoord.xy), depth);
        
        fragment.xyz = color.xyz;
        fragment *= (1 - pow(1 - opacity, float(depth) / particleSize));
        
        imageStore(image, ivec2(gl_FragCoord.xy), vec4(0));
    }
    else fragment = vec4(opacity * 5, vec3(0));
}

