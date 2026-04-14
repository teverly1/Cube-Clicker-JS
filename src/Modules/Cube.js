import * as THREE from 'three';
export default function createCube(myCanvas) {
    const { scene, camera, renderer, el } = myCanvas;
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    scene.add(cube);

    el.addEventListener("click", (event) => {
        // Convert mouse position to normalized device coordinates (-1 to +1)
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        // Update raycaster
        raycaster.setFromCamera(mouse, camera);

        // Check intersections
        const intersects = raycaster.intersectObjects([cube]);

        if (intersects.length > 0) {
            const event = new CustomEvent('onCubeClicked', { detail: { color: intersects[0].object.material.color.getHexString() } });

            // Next, we dispatch the event.
            document.dispatchEvent(event);

            // Change color on click
            cube.material.color.set(Math.random() * 0xffffff);
        }
    });

    el.addEventListener('mousemove', (event) => {
        // Normalize mouse coordinates
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        // Update the ray with camera and mouse position
        raycaster.setFromCamera(mouse, camera);

        // Check intersections against specific objects (e.g., scene.children)
        const intersects = raycaster.intersectObjects([cube]);

        if (intersects.length > 0) {
            document.body.style.cursor = 'pointer';
        } else {
            document.body.style.cursor = 'default';
        }
    });

    camera.position.z = 5;
    renderer.render(scene, camera);

    renderer.setAnimationLoop((time) => {
        cube.rotation.y = time / 1000;
        cube.rotation.x = time / 2000;
        renderer.render(scene, camera);
    });
}