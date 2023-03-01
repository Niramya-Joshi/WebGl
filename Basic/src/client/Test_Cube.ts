import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import Stats from 'three/examples/jsm/libs/stats.module'
import { GUI } from 'dat.gui'
       let scene = new THREE.Scene();
       const light = new THREE.DirectionalLight( 0xffa500, 6)

scene.add(light)
       let  camera = new THREE.PerspectiveCamera(55,window.innerWidth/window.innerHeight,45,30000);
        camera.position.set(1500,500,2000);

        let renderer = new THREE.WebGLRenderer()
        function init(){
        renderer.setSize(window.innerWidth, window.innerHeight)
        document.body.appendChild(renderer.domElement)

        let controls = new OrbitControls(camera, renderer.domElement);
        controls.addEventListener('change',render)
        controls.minDistance = 500;
        controls.maxDistance = 5000;

// create a global audio source
// load a sound and set it as the Audio object's buffer
        let materialArray = [];
        let texture_ft = new THREE.TextureLoader().load('img/divine_ft.jpg');
        let texture_bk = new THREE.TextureLoader().load('img/divine_bk.jpg');
        let texture_up = new THREE.TextureLoader().load('img/divine_up.jpg');
        let texture_dn = new THREE.TextureLoader().load('img/divine_dn.jpg');
        let texture_rt = new THREE.TextureLoader().load('img/divine_rt.jpg');
        let texture_lf = new THREE.TextureLoader().load('img/divine_lf.jpg');
          
        materialArray.push(new THREE.MeshBasicMaterial( {map: texture_ft}));
        materialArray.push(new THREE.MeshBasicMaterial( {map: texture_bk}));
        materialArray.push(new THREE.MeshBasicMaterial( {map: texture_up}));
        materialArray.push(new THREE.MeshBasicMaterial( {map: texture_dn}));
        materialArray.push(new THREE.MeshBasicMaterial( {map: texture_rt}));
        materialArray.push(new THREE.MeshBasicMaterial( {map: texture_lf}));
   
        for (let i = 0; i < 6; i++){
         //  materialArray[i].side = THREE.BackSide;
        let skyboxGeo = new THREE.BoxGeometry( 1000, 1000, 1000);
        let skybox = new THREE.Mesh( skyboxGeo, materialArray );
        scene.add( skybox );  
        
        animate();
    }
    }
    function animate() {
      requestAnimationFrame(animate);
      
      render()
    }
    function render() {
        renderer.render(scene, camera)
    }
    init();
      