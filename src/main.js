import * as THREE from "three";
import "./index.css";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";


//Scene and important objects
const scene = new THREE.Scene();
const gltfLoader = new GLTFLoader();
const canvas = document.querySelector(".canvas")


// Model Loading

var skullGeo;
gltfLoader.load(
  // resource URL
  "src/models/Skull/scene.gltf",
  // called when the resource is loaded
  function (gltf) {
    skullGeo = gltf.scene;
		gltf.scene.scale.set(4,4,4);
  },
  // called while loading is progressing
  function (xhr) {
    console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
  },
  // called when loading has errors
  function (error) {
    console.log("An error happened", error);
  }
);


//Sizes
var sizes = {
  width: canvas.clientWidth,
  height: canvas.clientHeight,
};

//Lights
const hemiLight = new THREE.HemisphereLight(0xffeeb1,0x080820, 4);
scene.add(hemiLight)
const spotLight = new THREE.SpotLight(0xffa95c,4);
spotLight.castShadow = true;
scene.add(spotLight);

//camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height);
camera.position.z = 20;
scene.add(camera);

//Renderer
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.toneMapping = THREE.ReinhardToneMapping;
renderer.toneMappingExposure = 2.3
renderer.setPixelRatio(2)
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

//Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enablePan = false;
controls.autoRotate = true;
controls.autoRotateSpeed = 10;


//REsize
window.addEventListener("resize", () => {
  sizes.width = canvas.clientWidth;
  sizes.height = canvas.clientHeight;

  camera.aspect = sizes.width/sizes.height;
  camera.updateProjectionMatrix()
  renderer.setSize(sizes.width,sizes.height);
});


//animation funciton
const loop = () => {
	if(skullGeo){
		const mesh = skullGeo.getObjectByName('Object_2'); 
		const color = new THREE.Color(colorValue);
    //changing the color of the model material 
		mesh.material.color.set(color);
		scene.add(skullGeo);
	}
  renderer.render(scene, camera);
	window.requestAnimationFrame(loop);
};

//calling the animation loop
loop();
