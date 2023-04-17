import * as THREE from 'three';
import { MindARThree } from 'mind-ar/dist/mindar-image-three.prod.js';
import { loadVideo } from "./libs/loader.js";

document.addEventListener('DOMContentLoaded', () => {
    let video = null;
    const init = async() => {
        video = await loadVideo("./videos/viking-ar.mp4");
        video.play();
        video.pause();
        start();
        confirm.style.display = 'none';
    }
    const start = async() => {
        const mindarThree = new MindARThree({
            container: document.querySelector('#app'),
            imageTargetSrc: './targets/viking-target.mind',
        });

        const {renderer, scene, camera} = mindarThree;

        const video = await loadVideo('./videos/viking-ar.mp4');

        const texture = new THREE.VideoTexture(video);

        const geometry = new THREE.PlaneGeometry(1, 1080/1920);
        const material = new THREE.MeshBasicMaterial({map: texture});
        const plane = new THREE.Mesh(geometry, material);

        const anchor = mindarThree.addAnchor(0);
        anchor.group.add(plane);

        anchor.onTargetFound = () => {
            video.play();
        }
        anchor.onTargetLost = () => {
            video.pause();
        }
        video.addEventListener( 'play', () => {
            video.currentTime = 6;
        });

        await mindarThree.start();
        renderer.setAnimationLoop(() => {
            renderer.render(scene, camera);
        });
    }
    //start();
    const confirm = document.createElement('div');
    const confirmButton = document.createElement('button');
    confirm.textContent = 'Click to allow camera';
    confirmButton.textContent = 'OK';
    confirm.appendChild(confirmButton);
    document.body.appendChild(confirm);
    confirmButton.addEventListener('click', init);

});