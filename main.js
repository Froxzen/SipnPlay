  import './style.css';
  import * as THREE from 'three';
  import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
  import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

  let coffeeScene, bobaScene,SandwichScene, coffeeCamera, bobaCamera, SandwichCamera, coffeeRenderer, bobaRenderer,  SandwichRenderer, coffee, boba, Sandwich, coffeeControls, bobaControls, SandwichControls;

  function init() {
      // Create scenes
      coffeeScene = new THREE.Scene();
      bobaScene = new THREE.Scene(); 
      SandwichScene = new THREE.Scene();

      // Set up coffee renderer
      const coffeeContainer = document.getElementById('coffee-container');
      coffeeRenderer = new THREE.WebGLRenderer({ antialias: true });
      coffeeRenderer.setClearColor(0xffffff); // Set background color to white
      coffeeRenderer.setSize(coffeeContainer.clientWidth, coffeeContainer.clientHeight);
      coffeeContainer.appendChild(coffeeRenderer.domElement);


      const SandwichContainer = document.getElementById('Sandwich-container');
      SandwichRenderer = new THREE.WebGLRenderer({ antialias: true });
      SandwichRenderer.setClearColor(0xffffff); // Set background color to white
      SandwichRenderer.setSize(SandwichContainer.clientWidth, SandwichContainer.clientHeight);
      SandwichContainer.appendChild(SandwichRenderer.domElement);


      // Set up boba renderer
      const bobaContainer = document.getElementById('boba-container');
      bobaRenderer = new THREE.WebGLRenderer({ antialias: true });
      bobaRenderer.setClearColor(0xffffff); // Set background color to white
      bobaRenderer.setSize(bobaContainer.clientWidth, bobaContainer.clientHeight);
      bobaContainer.appendChild(bobaRenderer.domElement);

      // Create coffee perspective camera
      coffeeCamera = new THREE.PerspectiveCamera(100, coffeeContainer.clientWidth / coffeeContainer.clientHeight, 0.1, 1000);
      coffeeCamera.position.z = -10;

      // Create boba perspective camera
      bobaCamera = new THREE.PerspectiveCamera(80, bobaContainer.clientWidth / bobaContainer.clientHeight, 0.1, 1000);
      bobaCamera.position.z = -20; 

      SandwichCamera = new THREE.PerspectiveCamera(80, SandwichContainer.clientWidth / SandwichContainer.clientHeight, 0.1, 1000);
      SandwichCamera.position.z = -20;

      // Add point lights to coffee scene
      const coffeePoint1 = new THREE.PointLight(0xff0000, 100, 100);
      coffeePoint1.position.set(5, 5, 5);
      coffeeScene.add(coffeePoint1);

      const coffeePoint2 = new THREE.PointLight(0xff0000, 100, 100);
      coffeePoint2.position.set(-5, -5, -5);
      coffeeScene.add(coffeePoint2);

      // Add ambient light to coffee scene
      const coffeeLight = new THREE.AmbientLight(0x404040, 10); // soft white light
      coffeeScene.add(coffeeLight);

      // Add point lights to boba scene
      const bobaPoint1 = new THREE.PointLight(0xff0000, 100, 100);
      bobaPoint1.position.set(5, 5, 5);
      bobaScene.add(bobaPoint1);

      const bobaPoint2 = new THREE.PointLight(0xff0000, 100, 100);
      bobaPoint2.position.set(-5, -5, -5);
      bobaScene.add(bobaPoint2);

      // Add ambient light to boba scene
      const bobaLight = new THREE.AmbientLight(0x404040, 10); // soft white light
      bobaScene.add(bobaLight);

      const SandwichPoint1 = new THREE.PointLight(0xff0000, 100, 100);
      SandwichPoint1.position.set(5, 5, 5);
      bobaScene.add(SandwichPoint1);

      const SandwichPoint2 = new THREE.PointLight(0xff0000, 100, 100);
      SandwichPoint2.position.set(-5, -5, -5);
      SandwichScene.add(SandwichPoint2);

      // Add ambient light to boba scene
      const SandwichLight = new THREE.AmbientLight(0x404040, 10); // soft white light
      SandwichScene.add(SandwichLight);




      // Load the first GLTF model (coffee shop cup)
      const loader = new GLTFLoader();
      loader.load(
          '/coffee_shop_cup.glb',
          function (gltf) {
              console.log('Coffee model loaded successfully');
              coffee = gltf.scene;
              coffee.scale.set(3, 3, 3);
              coffeeScene.add(coffee);
          },
          undefined,
          function (error) {
              console.error('An error occurred loading the coffee model:', error);
          }
      );

      // Load the second GLTF model (boba tea cup)
      loader.load(
          '/boba_tea_cup.glb',
          function (gltf) {
              console.log('Boba model loaded successfully');
              boba = gltf.scene;
              boba.scale.set(2, 2, 2);
              bobaScene.add(boba);
          },
          undefined,
          function (error) {
              console.error('An error occurred loading the boba model:', error);
          }
      );

    
      loader.load(
        '/sandwich_hand-painted.glb',
        function (gltf) {
            console.log('Sandwich model loaded successfully');
            Sandwich = gltf.scene;  // Correct variable name to sandwich
            Sandwich.scale.set(3, 3, 3);  // Adjust scale as needed
            SandwichScene.add(Sandwich);  // Add to SandwichScene, not coffeeScene
        },
        undefined,
        function (error) {
            console.error('An error occurred loading the sandwich model:', error);
        }
    );
    


      // Initialize OrbitControls for coffee
      coffeeControls = new OrbitControls(coffeeCamera, coffeeRenderer.domElement);
      coffeeControls.enableDamping = true; // Smoothly animates controls

      // Initialize OrbitControls for boba
      bobaControls = new OrbitControls(bobaCamera, bobaRenderer.domElement);
      bobaControls.enableDamping = true; // Smoothly animates controls 

      SandwichControls = new OrbitControls(bobaCamera, bobaRenderer.domElement);
      SandwichControls.enableDamping = true; // Smoothly animates controls 

      SandwichControls = new OrbitControls(SandwichCamera, SandwichRenderer.domElement);
SandwichControls.enableDamping = true; // Smoothly animates controls


      // Animate function
      function animate() {
          requestAnimationFrame(animate);
          if (coffee) {
              coffee.rotation.y += 0.01; // Rotate coffee model
          }
          if (boba) {
              boba.rotation.y += 0.01; // Rotate boba model
          }
          coffeeControls.update(); // Update coffee controls within animation loop
          bobaControls.update(); // Update boba controls within animation loop
          SandwichControls.update(); 
          coffeeRenderer.render(coffeeScene, coffeeCamera);
          bobaRenderer.render(bobaScene, bobaCamera); 
          SandwichRenderer.render(SandwichScene, SandwichCamera); 

      }

      // Call animate function
      animate();

      // Resize handling for coffee
      window.addEventListener('resize', () => {
          coffeeCamera.aspect = coffeeContainer.clientWidth / coffeeContainer.clientHeight;
          coffeeCamera.updateProjectionMatrix();
          coffeeRenderer.setSize(coffeeContainer.clientWidth, coffeeContainer.clientHeight);
      });

      // Resize handling for boba
      window.addEventListener('resize', () => {
          bobaCamera.aspect = bobaContainer.clientWidth / bobaContainer.clientHeight;
          bobaCamera.updateProjectionMatrix();
          bobaRenderer.setSize(bobaContainer.clientWidth, bobaContainer.clientHeight);
      }); 

      window.addEventListener('resize', () => {
        SandwichCamera.aspect = SandwichContainer.clientWidth / SandwichContainer.clientHeight;
        SandwichCamera.updateProjectionMatrix();
        SandwichRenderer.setSize(SandwichContainer.clientWidth, SandwichContainer.clientHeight);
    });
  }

  // Initialize the scene
  init(); 