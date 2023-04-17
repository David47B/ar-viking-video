import * as THREE from 'three';
import {MindARThree} from 'mindar-image-three';
import {loadVideo} from "../../libs/loader.js";
console.log(loadVideo)
document.addEventListener('DOMContentLoaded', () => {
    const start = async() => {
        const mindarThree = new MindARThree({
            container: document.body,
            imageTargetSrc: '../targets/viking-target.mind',
        });
        
        const {renderer, scene, camera} = mindarThree;

        const video = await loadVideo('../videos/viking-ar.mp4');
        
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
  start();
});