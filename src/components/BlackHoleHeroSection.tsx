import * as React from 'react'
import { useEffect, useRef } from 'react'

export interface BlackHoleHeroSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  distance?: number
  elevation?: number
  roll?: number
  fov?: number
  spinSpeed?: number
  brightness?: number
  hotColor?: string
  midColor?: string
  coolColor?: string
  glow?: number
  exposure?: number
  vignette?: number
  steps?: number
  resolution?: number
  maxDpr?: number
  focus?: [number, number]
  paused?: boolean
}

const VERT = `
attribute vec2 aPos;
varying vec2 vUv;
void main() {
  vUv = aPos * 0.5 + 0.5;
  gl_Position = vec4(aPos, 0.0, 1.0);
}`

const FRAG = `
precision highp float;
#define MAX_STEPS 360
varying vec2 vUv;
uniform vec2 uRes;
uniform float uTime;
uniform vec3 uCamPos;
uniform vec3 uRight;
uniform vec3 uUp;
uniform vec3 uFwd;
uniform float uTanHalf;
uniform vec2 uFocus;
uniform float uSteps;
uniform float uSpin;
uniform float uBright;
uniform vec3 uHot;
uniform vec3 uMid;
uniform vec3 uCool;
uniform float uGlow;
uniform float uExposure;
uniform float uVignette;
uniform vec2 uJitter;
uniform float uSeed;

float hash13(vec3 p) {
  p = fract(p * 0.3183099 + vec3(0.1, 0.2, 0.3));
  p *= 17.0;
  return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
}

float vnoise(vec3 x) {
  vec3 i = floor(x);
  vec3 f = fract(x);
  f = f * f * (3.0 - 2.0 * f);
  float n000 = hash13(i + vec3(0,0,0));
  float n100 = hash13(i + vec3(1,0,0));
  float n010 = hash13(i + vec3(0,1,0));
  float n110 = hash13(i + vec3(1,1,0));
  float n001 = hash13(i + vec3(0,0,1));
  float n101 = hash13(i + vec3(1,0,1));
  float n011 = hash13(i + vec3(0,1,1));
  float n111 = hash13(i + vec3(1,1,1));
  return mix(mix(mix(n000,n100,f.x),mix(n010,n110,f.x),f.y),mix(mix(n001,n101,f.x),mix(n011,n111,f.x),f.y),f.z);
}

float fbm(vec3 p) {
  float a = .5;
  float s = 0.;
  for (int i=0;i<4;i++) {
    s += a * vnoise(p);
    p = p * 2.03 + vec3(11.3,7.1,3.7);
    a *= .5;
  }
  return s;
}

void gasAt(vec3 p, float rd, out float dens, out vec3 tint, out float heat) {
  float rn = clamp((rd - 3.0) / 12.0, 0.0, 1.0);
  float tk = 0.26 * (0.35 + 1.25 * rn);
  float sheet = exp(-pow(p.y / tk, 2.0));
  float phi = atan(p.z, p.x);
  float omega = uSpin * pow(3.0 / rd, 1.5);
  float lr = log(rd) * 1.1 + uSpin * uTime * 0.05;
  float cycle = 46.0;
  float u = uTime / cycle;
  float fA = fract(u);
  float fB = fract(u + 0.5);
  float w = abs(2.0 * fA - 1.0);
  float cA = fbm(vec3(vec2(cos(phi + omega*fA*cycle), sin(phi + omega*fA*cycle)) * (rd*.48), lr));
  float cB = fbm(vec3(vec2(cos(phi + omega*fB*cycle), sin(phi + omega*fB*cycle)) * (rd*.48), lr+40.0));
  float clouds = mix(cA,cB,w);
  float filaments = clouds * clouds * 1.75;
  float inner = smoothstep(0.0,0.07,rn);
  float outer = 1.0 - smoothstep(0.45,1.0,rn);
  float prof = inner * outer * pow(3.0/rd,2.0);
  dens = max(0.0, filaments*1.5-.30) * sheet * prof * 4.6;
  heat = pow(3.0/rd,.8) * (.72 + .55*clouds);
  tint = mix(uCool,uMid,smoothstep(.10,.52,heat));
  tint = mix(tint,uHot,smoothstep(.52,1.05,heat));
}

vec3 aces(vec3 x) {
  return clamp((x*(2.51*x+.03))/(x*(2.43*x+.59)+.14),0.0,1.0);
}

void main() {
  vec2 uv = (gl_FragCoord.xy + uJitter - uFocus*uRes) / uRes.y;
  vec3 dir = normalize(uFwd + (uv.x*uRight + uv.y*uUp) * 2.0*uTanHalf);
  vec3 pos = uCamPos;
  vec3 vel = dir;
  vec3 hv = cross(pos,vel);
  float h2 = dot(hv,hv);
  float h = sqrt(h2);
  float swept = 0.0;
  float transmit = 1.0;
  vec3 col = vec3(0.0);
  float jitter = fract(sin(dot(gl_FragCoord.xy+uSeed,vec2(12.9898,78.233)))*43758.5453);

  for (int i=0;i<MAX_STEPS;i++) {
    if (float(i) >= uSteps) break;
    float r2 = dot(pos,pos);
    float r = sqrt(r2);
    if (r < 1.0) break;
    if (r > 36.0 && dot(pos,vel) > 0.0) break;
    if (transmit < .004) break;
    float dt = clamp(.14*(r-1.0),.025,1.1);
    if (r < 18.75) {
      float rn = clamp((r-3.0)/12.0,0.0,1.0);
      float tk = .26*(.35+1.25*rn);
      dt = min(dt,max(tk*.38,abs(pos.y)*.5));
    }
    swept += h*dt/r2;
    float deep = exp(-1.3*max(0.0,swept-4.6));
    jitter = fract(jitter + .6180339887);
    vec3 mid = pos + vel*(dt*jitter);
    float rd = length(mid.xz);
    if (rd > 3.0 && rd < 15.0 && abs(mid.y) < 1.3) {
      float dens; float heat; vec3 tint;
      gasAt(mid,rd,dens,tint,heat);
      if (dens > .001) {
        vec3 tang = normalize(cross(vec3(0,1,0),vec3(mid.x,0,mid.z)));
        float beta = min(.85,sqrt(.5/max(rd,1.5)));
        float gam = inversesqrt(max(1e-4,1.0-beta*beta));
        float g = 1.0/(gam*(1.0-beta*dot(tang,-normalize(vel))));
        g *= sqrt(max(.05,1.0-1.0/rd));
        float boost = pow(max(g,.02),1.05);
        vec3 shift = mix(vec3(1.0),g>1.0?vec3(.86,.94,1.14):vec3(1.15,.82,.62),clamp(abs(g-1.0)*.55,0.0,1.0));
        float emit = uBright*(.26+2.0*heat*heat);
        col += tint*shift*(emit*boost*dens*transmit*dt*deep);
        transmit *= exp(-dens*.30*dt);
      }
    }
    vec3 acc = -1.5*h2*pos/(r2*r2*r);
    vel += acc*dt;
    pos += vel*dt;
  }

  vec3 base = aces(col*uExposure);
  float lum = max(base.r,max(base.g,base.b));
  base += base * smoothstep(.45,1.0,lum) * uGlow * .22;
  base = pow(max(base,0.0),vec3(.4545));
  vec2 d = vUv-.5;
  base *= 1.0-uVignette*dot(d,d)*1.9;
  float n = fract(sin(dot(gl_FragCoord.xy+uSeed,vec2(12.9898,78.233)))*43758.5453);
  base += (n-.5)/255.0;
  gl_FragColor = vec4(base,1.0);
}`

const RAD = Math.PI / 180
const HALTON: Array<[number, number]> = [[.5,.333],[.25,.667],[.75,.111],[.125,.444],[.625,.778],[.375,.222],[.875,.556],[.0625,.889]]

function hexToLinear(hex: string): [number, number, number] {
  const h = hex.trim().replace('#','')
  const full = h.length === 3 ? h[0]+h[0]+h[1]+h[1]+h[2]+h[2] : h.slice(0,6)
  const n = parseInt(full,16)
  return [((n>>16)&255)/255,((n>>8)&255)/255,(n&255)/255].map(v => v <= .04045 ? v/12.92 : Math.pow((v+.055)/1.055,2.4)) as [number,number,number]
}

export function BlackHoleHeroSection({
  distance=24,
  elevation=-5.5,
  roll=-20,
  fov=42,
  spinSpeed=.06,
  brightness=1,
  hotColor='#FFF3DE',
  midColor='#FF9838',
  coolColor='#8E3A0B',
  glow=1,
  exposure=.9,
  vignette=.28,
  steps=260,
  resolution=.68,
  maxDpr=1.5,
  focus=[.72,.46],
  paused=false,
  className='',
  children,
  ...rest
}: BlackHoleHeroSectionProps) {
  const hostRef = useRef<HTMLDivElement|null>(null)
  const canvasRef = useRef<HTMLCanvasElement|null>(null)
  const props = useRef({distance,elevation,roll,fov,spinSpeed,brightness,hotColor,midColor,coolColor,glow,exposure,vignette,steps,resolution,maxDpr,focus,paused})
  props.current = {distance,elevation,roll,fov,spinSpeed,brightness,hotColor,midColor,coolColor,glow,exposure,vignette,steps,resolution,maxDpr,focus,paused}

  useEffect(() => {
    const host = hostRef.current
    const canvas = canvasRef.current
    if (!host || !canvas) return
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false
    const gl = canvas.getContext('webgl',{alpha:false,antialias:false,depth:false,stencil:false,powerPreference:'high-performance'})
    if (!gl) { canvas.style.display='none'; return }

    const compile = (type:number,src:string) => {
      const sh=gl.createShader(type); if(!sh) return null
      gl.shaderSource(sh,src); gl.compileShader(sh)
      if(!gl.getShaderParameter(sh,gl.COMPILE_STATUS)){ console.error(gl.getShaderInfoLog(sh)); gl.deleteShader(sh); return null }
      return sh
    }
    const vs=compile(gl.VERTEX_SHADER,VERT), fs=compile(gl.FRAGMENT_SHADER,FRAG)
    if(!vs||!fs) return
    const program=gl.createProgram(); if(!program) return
    gl.attachShader(program,vs); gl.attachShader(program,fs); gl.bindAttribLocation(program,0,'aPos'); gl.linkProgram(program)
    gl.deleteShader(vs); gl.deleteShader(fs)
    if(!gl.getProgramParameter(program,gl.LINK_STATUS)){ console.error(gl.getProgramInfoLog(program)); return }
    const U:Record<string,WebGLUniformLocation|null>={}
    const names=['uRes','uTime','uCamPos','uRight','uUp','uFwd','uTanHalf','uFocus','uSteps','uSpin','uBright','uHot','uMid','uCool','uGlow','uExposure','uVignette','uJitter','uSeed']
    names.forEach(n=>U[n]=gl.getUniformLocation(program,n))
    const vbo=gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER,vbo); gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),gl.STATIC_DRAW)
    gl.enableVertexAttribArray(0); gl.vertexAttribPointer(0,2,gl.FLOAT,false,0,0)
    let width=0,height=0,clock=reduced?6:0,last=0,raf=0,running=true,visible=true,frame=0

    const resize=()=>{
      const r=host.getBoundingClientRect(); const C=props.current
      const dpr=Math.min(window.devicePixelRatio||1,Math.max(1,C.maxDpr)); const scale=Math.min(1,Math.max(.42,C.resolution))
      const w=Math.max(2,Math.round(r.width*dpr*scale)), h=Math.max(2,Math.round(r.height*dpr*scale))
      if(w===width&&h===height)return; width=w;height=h;canvas.width=w;canvas.height=h;canvas.style.width=r.width+'px';canvas.style.height=r.height+'px'
    }
    const render=(t:number)=>{
      const C=props.current; resize(); gl.useProgram(program); gl.viewport(0,0,width,height)
      const el=Math.max(-88,Math.min(88,C.elevation))*RAD, dist=Math.max(2.2,C.distance), ce=Math.cos(el)
      const camX=dist*ce, camY=dist*Math.sin(el), camZ=0
      const fx=-camX/dist, fy=-camY/dist, fz=0
      let rx=fz, ry=0, rz=-fx; const rl=Math.hypot(rx,ry,rz)||1; rx/=rl;ry/=rl;rz/=rl
      const ux=ry*fz-rz*fy, uy=rz*fx-rx*fz, uz=rx*fy-ry*fx
      const cr=Math.cos(C.roll*RAD),sr=Math.sin(C.roll*RAD)
      const RX=rx*cr+ux*sr,RY=ry*cr+uy*sr,RZ=rz*cr+uz*sr,UX=-rx*sr+ux*cr,UY=-ry*sr+uy*cr,UZ=-rz*sr+uz*cr
      const hot=hexToLinear(C.hotColor),mid=hexToLinear(C.midColor),cool=hexToLinear(C.coolColor),j=HALTON[frame%HALTON.length]
      gl.uniform2f(U.uRes,width,height);gl.uniform1f(U.uTime,t);gl.uniform3f(U.uCamPos,camX,camY,camZ);gl.uniform3f(U.uRight,RX,RY,RZ);gl.uniform3f(U.uUp,UX,UY,UZ);gl.uniform3f(U.uFwd,fx,fy,fz)
      gl.uniform1f(U.uTanHalf,Math.tan(Math.max(8,Math.min(110,C.fov))*.5*RAD));gl.uniform2f(U.uFocus,C.focus[0],1-C.focus[1]);gl.uniform1f(U.uSteps,Math.max(80,Math.min(360,Math.round(C.steps))))
      gl.uniform1f(U.uSpin,C.spinSpeed*6.2831853);gl.uniform1f(U.uBright,C.brightness);gl.uniform3f(U.uHot,...hot);gl.uniform3f(U.uMid,...mid);gl.uniform3f(U.uCool,...cool);gl.uniform1f(U.uGlow,C.glow);gl.uniform1f(U.uExposure,C.exposure);gl.uniform1f(U.uVignette,C.vignette);gl.uniform2f(U.uJitter,j[0]-.5,j[1]-.5);gl.uniform1f(U.uSeed,(frame%64)*17.13)
      gl.drawArrays(gl.TRIANGLES,0,3);frame++
    }
    const tick=(now:number)=>{ if(!running)return; raf=requestAnimationFrame(tick); if(!visible){last=now;return}; const dt=last?Math.min(.05,(now-last)/1000):0;last=now;if(!props.current.paused&&!reduced)clock+=dt;render(clock) }
    const ro=new ResizeObserver(()=>render(clock));ro.observe(host)
    const io=new IntersectionObserver(e=>visible=e[0]?.isIntersecting??true,{threshold:0});io.observe(host)
    render(clock); if(!reduced)raf=requestAnimationFrame(tick)
    return()=>{running=false;cancelAnimationFrame(raf);ro.disconnect();io.disconnect();if(vbo)gl.deleteBuffer(vbo);gl.deleteProgram(program)}
  },[])

  return <div ref={hostRef} className={`relative isolate h-full w-full overflow-hidden bg-black ${className}`} {...rest}>
    <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 h-full w-full" />
    {children ? <div className="relative z-10 h-full w-full">{children}</div> : null}
  </div>
}

export default BlackHoleHeroSection
