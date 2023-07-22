in vec4 gl_FragCoord;

#request uniform "screen" screen
uniform ivec2 screen;

#request uniform "time" time
uniform float time;
#request timecycle 0

out vec4 fragment;

#request uniform "prev" prev
uniform sampler2D prev;

vec4 bloom(vec2 uv) {
    
    const float blurSize = 1.0 / 200.0;
    
    vec4 col = texture(prev, uv);
    
    vec4 sum = vec4(0);
    vec2 texcoord = uv;
    
    sum += texture(prev, vec2(texcoord.x - 4.0 * blurSize, texcoord.y)) * 0.05;
    sum += texture(prev, vec2(texcoord.x - 3.0 * blurSize, texcoord.y)) * 0.09;
    sum += texture(prev, vec2(texcoord.x - 2.0 * blurSize, texcoord.y)) * 0.12;
    sum += texture(prev, vec2(texcoord.x - blurSize, texcoord.y)) * 0.15;
    sum += texture(prev, vec2(texcoord.x, texcoord.y)) * 0.16;
    sum += texture(prev, vec2(texcoord.x + blurSize, texcoord.y)) * 0.15;
    sum += texture(prev, vec2(texcoord.x + 2.0 * blurSize, texcoord.y)) * 0.12;
    sum += texture(prev, vec2(texcoord.x + 3.0 * blurSize, texcoord.y)) * 0.09;
    sum += texture(prev, vec2(texcoord.x + 4.0 * blurSize, texcoord.y)) * 0.05;
    sum += texture(prev, vec2(texcoord.x, texcoord.y - 4.0 * blurSize)) * 0.05;
    sum += texture(prev, vec2(texcoord.x, texcoord.y - 3.0 * blurSize)) * 0.09;
    sum += texture(prev, vec2(texcoord.x, texcoord.y - 2.0 * blurSize)) * 0.12;
    sum += texture(prev, vec2(texcoord.x, texcoord.y - blurSize)) * 0.15;
    sum += texture(prev, vec2(texcoord.x, texcoord.y)) * 0.16;
    sum += texture(prev, vec2(texcoord.x, texcoord.y + blurSize)) * 0.15;
    sum += texture(prev, vec2(texcoord.x, texcoord.y + 2.0 * blurSize)) * 0.12;
    sum += texture(prev, vec2(texcoord.x, texcoord.y + 3.0 * blurSize)) * 0.09;
    sum += texture(prev, vec2(texcoord.x, texcoord.y + 4.0 * blurSize)) * 0.05;
    
    const float intensity = 0.4;
    col = sum * intensity + texture(prev, texcoord);
    return col;
}

float glow(float value, float strength, float dist) {
    return dist + dist / pow(value, strength);
}

void main()
{
    vec2 uv = gl_FragCoord.xy / screen.xy;
    
    fragment.xyz = bloom(uv).xyz;
    fragment.xyz *= ((glow(length(fragment.xyz), 0.5, 0.92)));
}

