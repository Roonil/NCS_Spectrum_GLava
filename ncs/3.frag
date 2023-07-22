in vec4 gl_FragCoord;

#request uniform "screen" screen
uniform ivec2 screen;

#request uniform "time" time
uniform float time;
#request timecycle 0

out vec4 fragment;

#request uniform "prev" prev
uniform sampler2D prev;

vec4 bloom(vec2 uv, float opacity, vec4 baseColor) {
    
    const float blurSize = 1.0 / 200.0;
    vec4 sum = vec4(0);
    float consts[] = {0.05, 0.09, 0.12, 0.15, 0.16};
    
    for(int i =- 4; i <= 4; i ++ ) {
        vec4 temp = texture(prev, vec2(uv.x + i * blurSize, uv.y)) * consts[abs(abs(i) - 4)];
        sum += sign(temp.w) * temp;
        temp = texture(prev, vec2(uv.x, uv.y + i * blurSize)) * consts[abs(abs(i) - 4)];
        sum += sign(temp.w) * temp;
    }
    
    const float intensity = 0.4;
    
    if ((sum.w) <= opacity / 9)return vec4(0);
    
    else return baseColor * sign(baseColor.w) + sum * intensity;
    
}

float glow(float value, float strength, float dist) {
    return dist + dist / pow(value, strength);
}

void main()
{
    vec2 uv = gl_FragCoord.xy / screen.xy;
    vec4 prevColor = texture(prev, uv);
    
    fragment = bloom(uv, (1 - sign(prevColor.w)) * prevColor.r, prevColor);
    
    fragment.xyz *= ((glow(length(fragment.xyz), 0.5, 0.92)));
}

