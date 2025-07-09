// your-script.js
// This script sets up a Three.js scene inside the DOM element with ID "threejs-container"

(function () {
  // 1. Get the container DOM element
  const container = document.getElementById('threejs-container');

  // Get the actual width and height of the container in pixels
  const width = container.clientWidth;
  const height = container.clientHeight;

  // 2. Create the Three.js scene
  const scene = new THREE.Scene();

  // 3. Set up the camera
  // PerspectiveCamera(FOV, aspect ratio, near clip, far clip)
  const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);

  // 4. Create the renderer
  const renderer = new THREE.WebGLRenderer({ antialias: true }); // antialias smooths edges
  renderer.setSize(width, height);            // Match canvas size to container
  renderer.setClearColor(0xf0f0f0);           // Light grey background
  container.appendChild(renderer.domElement); // Add the renderer canvas to the DOM

  // 5. Handle window resize to keep canvas responsive
  window.addEventListener('resize', () => {
    const newWidth = container.clientWidth;
    const newHeight = container.clientHeight;

    // Update camera settings
    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();

    // Resize renderer to match new container size
    renderer.setSize(newWidth, newHeight);
  });

  // 6. Add a grid helper to the scene
  // GridHelper(size, divisions, colorCenterLine, colorGrid)
  const grid = new THREE.GridHelper(16, 32, 0xcccccc, 0xcccccc);
  scene.add(grid);

  // 7. Lighting
  const ambient = new THREE.AmbientLight(0xffffff, 0.7); // Soft light everywhere
  scene.add(ambient);

  const dirLight = new THREE.DirectionalLight(0xffffff, 0.7); // Directional light like the sun
  dirLight.position.set(5, 10, 7); // Set position above the scene
  scene.add(dirLight);

  // 8. Create and position 3D shapes

  // Box
  const box = new THREE.Mesh(
    new THREE.BoxGeometry(2, 2, 2), // width, height, depth
    new THREE.MeshPhongMaterial({ color: 0x3264a8 }) // blue material
  );
  box.position.set(-5, 1, 0); // move left
  scene.add(box);

  // Sphere
  const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(1.2, 32, 32), // radius, width/height segments
    new THREE.MeshPhongMaterial({ color: 0xffa500 }) // orange
  );
  sphere.position.set(0, 1.2, 0); // center
  scene.add(sphere);

  // Cylinder
  const cylinder = new THREE.Mesh(
    new THREE.CylinderGeometry(1, 1, 2, 32), // top rad, bottom rad, height, segments
    new THREE.MeshPhongMaterial({ color: 0x4caf50 }) // green
  );
  cylinder.position.set(5, 1, 0); // move right
  scene.add(cylinder);

  // Cone
  const cone = new THREE.Mesh(
    new THREE.ConeGeometry(1, 2, 32), // radius, height, segments
    new THREE.MeshPhongMaterial({ color: 0xe91e63 }) // pink
  );
  cone.position.set(2.5, 1, -4); // behind the cylinder
  scene.add(cone);

  // 9. Position the camera to look at the scene
  camera.position.set(8, 8, 8); // pull back and up
  camera.lookAt(0, 0, 0);       // center the view on the origin

  // 10. Add orbit controls for user interaction
  const controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;        // Smooth camera motion
  controls.dampingFactor = 0.1;         // Strength of damping
  controls.screenSpacePanning = false;  // Only allow panning vertically and horizontally
  controls.minDistance = 4;             // Zoom limits
  controls.maxDistance = 40;
  controls.target.set(0, 1, 0);         // Camera looks slightly above the ground

  // 11. Animation loop to keep rendering
  function animate() {
    requestAnimationFrame(animate); // Call animate again on next frame
    controls.update();              // Update camera controls
    renderer.render(scene, camera); // Draw the scene
  }

  animate(); // Start animation
})();
