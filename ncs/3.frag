in vec4 gl_FragCoord;

#request uniform "screen" screen
uniform ivec2 screen;

#request uniform "time" time
uniform float time;
#request timecycle 0

out vec4 fragment;

#request uniform "prev" prev
uniform sampler2D prev;

#include ":ncs.glsl"

float glow(float value, float strength, float dist) {
    return dist + dist / pow(value, strength);
}

uniform float twoPi = 6.28318530718;

void main()
{
    vec2 radius = glowSize / screen.xy;
    vec2 uv = gl_FragCoord.xy / screen.xy;
    vec4 Color = vec4(0);
    vec4 prevColor = texture(prev, uv);
    
    for(float d = 0.0; d < twoPi; d += twoPi / glowDirections)
    {
        for(float i = 1.0 / glowQuality; i <= 1.0; i += 1.0 / glowQuality)
        {
            vec2 coords = uv + radius * i*vec2(cos(d), sin(d));
            if (coords.x > 0&&coords.x < 1&&coords.y > 0&&coords.y < 1)Color += texture(prev, coords);
        }
    }
    Color /= glowQuality * glowDirections;
    fragment = vec4(glowColor, 1.0) * glowIntensity * dot(vec3(1), Color.xyz);
    
    if (prevColor.w != 0)fragment.xyz += prevColor.xyz;
    
    fragment.xyz *= glow(length(fragment.xyz), 0.5, 0.92);
    fragment.w = prevColor.w;
}

