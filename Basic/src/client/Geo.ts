import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import Stats from 'three/examples/jsm/libs/stats.module'
import { GUI } from 'dat.gui'
import { GreaterDepth } from 'three'
       let scene = new THREE.Scene();
       const light = new THREE.DirectionalLight( 0xffa500, 6)

scene.add(light)
       let  camera = new THREE.PerspectiveCamera(55,window.innerWidth/window.innerHeight,45,30000);
        camera.position.set(200,200,200);

        let renderer = new THREE.WebGLRenderer()

        function init(){
        renderer.setSize(window.innerWidth, window.innerHeight)
        document.body.appendChild(renderer.domElement)

        let controls = new OrbitControls(camera, renderer.domElement);
        controls.addEventListener('change',render)
        controls.minDistance = 200;
        controls.maxDistance = 800;
        animate();

        const gui = new GUI()
const lightFolder = gui.addFolder('THREE.Light')
lightFolder.add(light, 'intensity', 0, 10, 0.01)
const directionalLightFolder = gui.addFolder('THREE.DirectionalLight')
directionalLightFolder.add(light.position, "x", -100, 100, 0.01)
directionalLightFolder.add(light.position, "y", -100, 100, 0.01)
directionalLightFolder.add(light.position, "z", -100, 100, 0.01)
directionalLightFolder.open()

const material1 = new THREE.MeshPhongMaterial( {color: 0x00ffff} );
const material2 = new THREE.MeshPhongMaterial( {color: 0xffa500} );
const geo1 = new THREE.ConeGeometry(100,200)
const geo3 = new THREE.CylinderGeometry(20,20,300)
const c1 = new THREE.Mesh( geo1, material1 );
const c2 = new THREE.Mesh( geo1, material1 );
const cl = new THREE.Mesh( geo3, material2 );
c1.translateY(200)
c2.translateY(100)
cl.translateY(10)  
scene.add(c1 );
scene.add(c2 );
scene.add(cl );
}
    function animate() {
      requestAnimationFrame(animate);
    
      render()
    }
    function render() {
        renderer.render(scene, camera)
    }
    init();
      