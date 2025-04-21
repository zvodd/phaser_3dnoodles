export default function CreateDebugButton(scene){
    // Debug Toggle UI (same as before)
    scene.dbg_button = scene.add.text(32, scene.cameras.main.height - 32, 'Toggle Debug', {
        fontSize: '24px', fill: '#ffffff', backgroundColor: '#00000080'
      })
      .setPadding(10, 5).setOrigin(0, 1).setDepth(1).setInteractive();
    scene.dbg_button.on('pointerdown', () => {
      scene.toggledbg = !scene.toggledbg;
      if (scene.toggledbg) scene.third.physics.debug?.disable();
      else scene.third.physics.debug?.enable();
      console.log(`Physics Debug ${scene.toggledbg ? 'Disabled' : 'Enabled'}`);
    });
    if (scene.toggledbg) scene.third.physics.debug?.disable();
    else scene.third.physics.debug?.enable();
}