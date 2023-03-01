import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import Stats from 'three/examples/jsm/libs/stats.module'
import { GUI } from 'dat.gui'
import { GreaterDepth, Group } from 'three'
const can = document.getElementById("MyCan")
const can1: HTMLCanvasElement = can as HTMLCanvasElement
var grp = new THREE.Group();
const canx = document.getElementById("MyCan1")
const can2: HTMLCanvasElement = canx as HTMLCanvasElement

       let scene = new THREE.Scene();

       const renderer = new THREE.WebGLRenderer({
        canvas: can1,
        antialias: true
    });
    const renderer2 = new THREE.WebGLRenderer({
        canvas: can2,
        antialias: true
    });

const light = new THREE.DirectionalLight( 0xffeedd, 6)
const ambient = new THREE.AmbientLight(0x555555,3);

scene.add(ambient);

let cloudParticles: THREE.Mesh<THREE.BoxGeometry, THREE.MeshPhysicalMaterial>[] = []
light.position.set(0,0,1);
scene.add(light);

       let  camera = new THREE.PerspectiveCamera(55,window.innerWidth/window.innerHeight,45,30000);
        camera.position.set(1500,500,2000);


let camera2= new THREE.PerspectiveCamera(55,window.innerWidth/window.innerHeight,45,30000);
camera2.position.set(100,500,-900)
grp.add(camera2)
      //  let renderer = new THREE.WebGLRenderer()

        const canva = document.querySelector('.webgl');
        const canvas2 = document.querySelector('.webgl2');

        function init(){
           // scene.fog = new THREE.FogExp2(0x11111f, 0.0001);
            //renderer.setClearColor(scene.fog.color);
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.shadowMap.enabled = true
           
           // renderer2.setClearColor(scene.fog.color);
            renderer2.setSize(window.innerWidth / 3, window.innerHeight / 3);
            // renderer2.setPixelRatio(window.devicePixelRatio);
            renderer2.shadowMap.enabled = true

        document.body.appendChild(renderer.domElement)

        let controls = new OrbitControls(camera, renderer.domElement);
        controls.addEventListener('change',render)
        controls.minDistance = 500;
        controls.maxDistance = 1500;
        
        const listener = new THREE.AudioListener();
camera.add( listener );


let l1 = new THREE.TextureLoader();
l1.load("img/cloud.png", function(text){

let  cloudGeo = new THREE.BoxGeometry(3000,3000);
  let cloudMaterial = new THREE.MeshPhysicalMaterial({
    map: text,
    transparent: true
  });

  for(let p=0; p<50; p++) {
    let cloud = new THREE.Mesh(cloudGeo,cloudMaterial);
    cloud.position.set(
      Math.random()*9000-5000,4000,Math.random()*9000-5000
    );

    cloud.rotation.x = 1.16;
    cloud.rotation.y = -0.12;
    cloud.rotation.z = Math.random()*360;
    cloud.material.opacity = 0.6;
    cloudParticles.push(cloud);
    scene.add(cloud);
  }
});

// create a global audio source
const sound = new THREE.Audio( listener );

// load a sound and set it as the Audio object's buffer
const audioLoader = new THREE.AudioLoader();
audioLoader.load( 'audio/turbine-plane-sfx-26791.mp3', function( buffer ) {
	sound.setBuffer( buffer );
	sound.setLoop( true );
	sound.setVolume( 0.5 );
	sound.play();
});
        let materialArray = [];
        let texture_ft = new THREE.TextureLoader().load('img/desertdawn_ft.jpg');
        let texture_bk = new THREE.TextureLoader().load('img/desertdawn_bk.jpg');
        let texture_up = new THREE.TextureLoader().load('img/desertdawn_up.jpg');
        let texture_dn = new THREE.TextureLoader().load('img/desertdawn_dn.jpg');
        let texture_rt = new THREE.TextureLoader().load('img/desertdawn_rt.jpg');
        let texture_lf = new THREE.TextureLoader().load('img/desertdawn_lf.jpg');
          
        materialArray.push(new THREE.MeshBasicMaterial( {map: texture_ft}));
        materialArray.push(new THREE.MeshBasicMaterial( {map: texture_bk}));
        materialArray.push(new THREE.MeshBasicMaterial( {map: texture_up}));
        materialArray.push(new THREE.MeshBasicMaterial( {map: texture_dn}));
        materialArray.push(new THREE.MeshBasicMaterial( {map: texture_rt}));
        materialArray.push(new THREE.MeshBasicMaterial( {map: texture_lf}));
   
        for (let i = 0; i < 6; i++)
           materialArray[i].side = THREE.BackSide;
        let skyboxGeo = new THREE.BoxGeometry( 10000, 10000, 10000);
        let skybox = new THREE.Mesh( skyboxGeo, materialArray );
        scene.add( skybox );  

        animate();

        const gui = new GUI()
const lightFolder = gui.addFolder('THREE.Light')
lightFolder.add(light, 'intensity', 0, 10, 0.01)
const directionalLightFolder = gui.addFolder('THREE.DirectionalLight')
directionalLightFolder.add(light.position, "x", -100, 100, 0.01)
directionalLightFolder.add(light.position, "y", -100, 100, 0.01)
directionalLightFolder.add(light.position, "z", -100, 100, 0.01)
directionalLightFolder.open()


 let loaded;
        const loader = new GLTFLoader()
        loader.load('models/Plane.glb',function (glb) {
loaded=glb.scene;
loaded.scale.set(70,70,70);

                 glb.scene.traverse(function (child) {
                    if ((child as THREE.Mesh).isMesh) {
                        const m = (child as THREE.Mesh)
                         m.receiveShadow = true
                         m.castShadow = true
                    }
                     if (((child as THREE.Light)).isLight) {
                         const l = (child as THREE.Light)
                        l.castShadow = true
                        l.shadow.bias = -.003
                        l.shadow.mapSize.width = 2048
                         l.shadow.mapSize.height = 2048
                     }
                 })
                grp.add(loaded);
                // scene.add(loaded)
            },
            (xhr) => {
                console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
            },
            (error) => {
                console.log(error)
            }
        )
            var aud=new AudioContext();
            aud.resume();
        scene.add(grp);
        window.addEventListener("mousedown",function(event){
        });
        window.addEventListener("keydown", function(event) {
            if (event.defaultPrevented) {
              return;
            }
            if (event.code === "ArrowUp"){
                // Handle "down"
                grp.position.z+=10
    
            } else if (event.code === "ArrowDown"){
                // Handle "up"
                grp.position.z-=10
                        } else if (event.code === "ArrowLeft"){
                // Handle "left"
                grp.position.x+=10
                
            } else if (event.code === "ArrowRight"){
                // Handle "right"
                grp.position.x-=10
                
            }
            event.preventDefault();
          }, true);
          grp.add(sound)
    }
    camera2.lookAt(grp.position)
    function animate() {
        cloudParticles.forEach(p => {
            p.rotation.z -=0.0002;
          });
      requestAnimationFrame(animate);
    
      render()
    }
    function render() {
        renderer.render(scene, camera)
        renderer2.render(scene,camera2)
    }
    init();
      