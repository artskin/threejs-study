import * as THREE from 'three'
import { Loader } from 'three'
import { OrbitControls } from'three/examples/jsm/controls/OrbitControls'

const app = document.querySelector('#app')
const { clientWidth:w,clientHeight:h} = app
console.log(w,h)
//场景
const scene = new THREE.Scene()

const axes = new THREE.AxesHelper(30,30,30)
scene.add(axes)

const BLOOM_LAYER = 1;
const bloomLayer = new THREE.Layers();
bloomLayer.set(BLOOM_LAYER)

//obj
// const geometry = new THREE.BoxGeometry(1) // 圆SphereGeometry
// const meterial = new THREE.MeshNormalMaterial()//MeshBasicMaterial
// const cube = new THREE.Mesh(geometry,meterial)
// scene.add(cube)
const loader = new THREE.TextureLoader()
let iTexture = await loader.loadAsync('../public/sun.jpg')
    //console.log(iTexture)

function creatBall(radius,iTexture){
    //let iTexture = await loader.loadAsync(src)
    const round = new THREE.SphereGeometry(radius)
    const base = new THREE.MeshBasicMaterial({map:iTexture})//MeshBasicMaterial
    return new THREE.Mesh(round,base)
}

const sun = creatBall(54.5/3,await loader.loadAsync('../public/sun.jpg'))
const earth = creatBall(1*2,await loader.loadAsync('../public/earth.jpg'))
const moon = creatBall(3*2/11,await loader.loadAsync('../public/moon.jpg'))
const jinxing = creatBall(3*2/11,await loader.loadAsync('../public/jinxing.jpg'))
jinxing.position.y = 30
const shuixing = creatBall(3*2/11,await loader.loadAsync('../public/mercury.jpg'))
shuixing.position.y = 25

const sunSys = new THREE.Group()
const diyue = new THREE.Group()
const clock = new THREE.Clock()

diyue.add(earth,moon)
sunSys.add(sun)
sunSys.add(diyue)
sunSys.add(jinxing)
sunSys.add(shuixing)
scene.add(sunSys)
diyue.position.y = 40
moon.position.y = 5

function tick(){
    const time = clock.getElapsedTime();
    sun.rotation.z = time
    sunSys.rotation.z = time/4
    diyue.rotation.z = time*4
    earth.rotation.z = time*10
    // moon.position.x = Math.sin(time)*3
    // moon.position.y = Math.cos(time)*3
    requestAnimationFrame(tick)
    renderer.render(scene,camera)
}

//light
const light = new THREE.AmbientLight();
scene.add(light)

//camera 
const camera = new THREE.PerspectiveCamera(75,w/h,0.1,100)
camera.position.set(0,0,100)
camera.lookAt(0,0,0)


const renderer = new THREE.WebGLRenderer()
renderer.setSize(w,h)
tick()
app.append(renderer.domElement)

//const orbControls = new OrbitControls(camera,renderer.domElement)


