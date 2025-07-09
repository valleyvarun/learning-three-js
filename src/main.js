// import all code from the library and in this file we will refer to it as THREE
import * as THREE from 'three';
import gsap from 'gsap';

//Create a scene
const scene = new THREE.Scene();


//Create geometry
const geometry = new THREE.SphereGeometry(3, 64, 64);
const material = new THREE.MeshStandardMaterial({
    color: "#00ff83",
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

//light
const light = new THREE.PointLight(0xffffff, 80, 100);
light.position.set(5, 10, 20);
scene.add(light);

//camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100);
camera.position.z = 20
scene.add(camera);

//render
const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);
